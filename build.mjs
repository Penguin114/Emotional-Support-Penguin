import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, 'out');
await mkdir(output, { recursive: true });
for (const entry of ['index.html', 'style.css', 'app.js', 'assets']) {
  await cp(path.join(root, entry), path.join(output, entry), { recursive: true });
}
console.log('Built static site in out/');
