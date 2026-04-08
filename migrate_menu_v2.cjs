const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'data', 'menu.json');
const menu = JSON.parse(fs.readFileSync(menuPath, 'utf8'));

// Default cover images mapping based on DigitalMenu.jsx and commons
const categoryCovers = {
  'bocadillos': '/assets/menu_new/bocadillos-2.jpg',
  'hamburguesas': '/assets/bar_tapas/hamburgesas2-2814416.jpg',
  'pizzas': '/assets/menu_new/pizzas.jpg',
  'sandwiches': '/assets/menu_new/sandwiches2.jpg',
  'raciones': '/assets/menu_new/raciones.jpg',
  'tes': '/assets/menu_new/pizzas.jpg' // Fallback
};

const updatedCategories = menu.categories.map(cat => {
  const cover = categoryCovers[cat.id] || '/assets/menu_new/pizzas.jpg';
  
  return {
    ...cat,
    visible: cat.visible !== undefined ? cat.visible : true,
    cover_image: cover,
    cover_images: [cover],
    items: cat.items.map(item => {
      // Create a clean item according to the new schema
      const newItem = {
        id: item.id,
        name_es: item.name_es || item.name || '',
        name_en: item.name_en || item.name || '',
        name_fr: item.name_fr || item.name || '',
        description_es: item.description_es || item.desc || '',
        price: item.price || 'Consultar',
        visible: item.visible !== undefined ? item.visible : true
      };
      
      // Remove old image fields
      delete newItem.images;
      delete newItem.image_url;
      
      return newItem;
    })
  };
});

const updatedMenu = { categories: updatedCategories };

fs.writeFileSync(menuPath, JSON.stringify(updatedMenu, null, 2));
console.log('Migration complete: new menu.json schema applied.');
