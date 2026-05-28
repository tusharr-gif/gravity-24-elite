import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('🚀 Starting Vercel Build Output API (V3) Compilation...');

// 1. Run local production build
console.log('📦 Running npx vite build...');
execSync('npx vite build', { stdio: 'inherit' });

// 2. Prepare Vercel Output directory structure
const outputDir = path.join(process.cwd(), '.vercel', 'output');
const staticDir = path.join(outputDir, 'static');
const funcDir = path.join(outputDir, 'functions', 'index.func');

console.log('📂 Creating .vercel/output structure...');
fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(staticDir, { recursive: true });
fs.mkdirSync(funcDir, { recursive: true });

// 3. Copy static assets to .vercel/output/static
const clientDist = path.join(process.cwd(), 'dist', 'client');
if (fs.existsSync(clientDist)) {
  console.log('➡️ Copying static assets from dist/client to .vercel/output/static...');
  copyDir(clientDist, staticDir);
} else {
  console.error('❌ dist/client not found!');
  process.exit(1);
}

// 4. Copy server entry and assets to .vercel/output/functions/index.func
const serverDist = path.join(process.cwd(), 'dist', 'server');
if (fs.existsSync(serverDist)) {
  console.log('➡️ Copying server entry and assets...');
  fs.copyFileSync(
    path.join(serverDist, 'server.js'),
    path.join(funcDir, 'server.js')
  );
  
  const serverAssets = path.join(serverDist, 'assets');
  if (fs.existsSync(serverAssets)) {
    copyDir(serverAssets, path.join(funcDir, 'assets'));
  }
} else {
  console.error('❌ dist/server not found!');
  process.exit(1);
}

// 5. Generate Node.js Fetch Wrapper index.js
console.log('📝 Writing Node.js wrapper index.js...');
const nodeWrapperCode = `import { Readable } from 'stream';
import server from './server.js';

export default async function handler(req, res) {
  try {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url, \`\${protocol}://\${host}\`);

    const body = ['GET', 'HEAD'].includes(req.method) ? undefined : await readRequestBody(req);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => headers.append(key, v));
        } else {
          headers.set(key, value);
        }
      }
    }

    const fetchReq = new Request(url.toString(), {
      method: req.method,
      headers,
      body,
    });

    const response = await server.fetch(fetchReq, {}, {});

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (error) {
    console.error('Error in Vercel Node.js Serverless Handler:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', err => reject(err));
  });
}
`;

fs.writeFileSync(path.join(funcDir, 'index.js'), nodeWrapperCode);

// 6. Generate .vc-config.json for Node.js Serverless Function
console.log('📝 Writing .vc-config.json for Node.js Runtime...');
const vcConfig = {
  runtime: 'nodejs20.x',
  handler: 'index.js',
  launcherType: 'Nodejs'
};
fs.writeFileSync(
  path.join(funcDir, '.vc-config.json'),
  JSON.stringify(vcConfig, null, 2)
);


// 7. Generate config.json for Vercel routing
console.log('📝 Writing global config.json...');
const globalConfig = {
  version: 3,
  routes: [
    { handle: 'filesystem' },
    { src: '/assets/(.*)', dest: '/assets/$1' },
    { src: '/(.*)', dest: '/index' }
  ]
};
fs.writeFileSync(
  path.join(outputDir, 'config.json'),
  JSON.stringify(globalConfig, null, 2)
);

console.log('✅ Vercel Build Output API (V3) compilation completed successfully!');
