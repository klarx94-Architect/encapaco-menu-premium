import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const menuPath = path.join(__dirname, 'data', 'menu.json');
const menu = JSON.parse(fs.readFileSync(menuPath, 'utf8'));

menu.categories.forEach(cat => {
  cat.items.forEach(item => {
    if (!item.images) item.images = [];
    if (!item.image_url) item.image_url = "";
  });
});

fs.writeFileSync(menuPath, JSON.stringify(menu, null, 2), 'utf8');
console.log('Migration complete: All items updated with images/image_url.');
