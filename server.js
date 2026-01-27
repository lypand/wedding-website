import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 8080;
const distPath = join(__dirname, 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

createServer((req, res) => {
  let filePath = join(distPath, req.url === '/' ? 'index.html' : req.url);

  // If file doesn't exist, serve index.html (SPA fallback)
  if (!existsSync(filePath)) {
    filePath = join(distPath, 'index.html');
  }

  const ext = extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  try {
    const content = readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  } catch (error) {
    res.writeHead(500);
    res.end(`Error: ${error.message}`);
  }
}).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
