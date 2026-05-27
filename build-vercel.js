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
    path.join(funcDir, 'index.js')
  );
  
  const serverAssets = path.join(serverDist, 'assets');
  if (fs.existsSync(serverAssets)) {
    copyDir(serverAssets, path.join(funcDir, 'assets'));
  }
} else {
  console.error('❌ dist/server not found!');
  process.exit(1);
}

// 5. Generate .vc-config.json for the Edge function
console.log('📝 Writing .vc-config.json for Edge Runtime...');
const vcConfig = {
  runtime: 'edge',
  entrypoint: 'index.js'
};
fs.writeFileSync(
  path.join(funcDir, '.vc-config.json'),
  JSON.stringify(vcConfig, null, 2)
);

// 6. Generate config.json for Vercel routing
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
