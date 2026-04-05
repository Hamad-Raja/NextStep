
// Run: node generate-products.js
// This script writes products.js with 40 mens + 50 womens products using real Unsplash URLs

const fs = require('fs');
const path = require('path');

// Curated Unsplash shoe image IDs (real shoe photos)
const mensImages = [
  ['photo-1542291026-7eec264c27ff','photo-1600185365483-26d7a4cc7519'],
  ['photo-1608231387042-66d1773070a5','photo-1556906781-9a412961c28c'],
  ['photo-1595950653106-6c9ebd614d3a','photo-1539185441755-769473a23570'],
  ['photo-1600185365926-3a2ce3cdb9eb','photo-1491553895911-0055eca6402d'],
  ['photo-1579298245158-33e8f568f7d3','photo-1542291026-7eec264c27ff'],
  ['photo-1518894781321-630e638d0742','photo-1575537302964-96cd47c06b1b'],
  ['photo-1460353581641-37baddab0fa2','photo-1542291026-7eec264c27ff'],
  ['photo-1584735175315-9d5df23be3c4','photo-1605348532760-6753d2c43329'],
  ['photo-1606107557195-0e29a4b5b4aa','photo-1542291026-7eec264c27ff'],
  ['photo-1587563871167-1ee9c731aefb','photo-1518894781321-630e638d0742'],
  ['photo-1600185365483-26d7a4cc7519','photo-1542291026-7eec264c27ff'],
  ['photo-1556906781-9a412961c28c','photo-1608231387042-66d1773070a5'],
  ['photo-1539185441755-769473a23570','photo-1595950653106-6c9ebd614d3a'],
  ['photo-1491553895911-0055eca6402d','photo-1600185365926-3a2ce3cdb9eb'],
  ['photo-1575537302964-96cd47c06b1b','photo-1518894781321-630e638d0742'],
  ['photo-1605348532760-6753d2c43329','photo-1584735175315-9d5df23be3c4'],
  ['photo-1542291026-7eec264c27ff','photo-1579298245158-33e8f568f7d3'],
  ['photo-1518894781321-630e638d0742','photo-1460353581641-37baddab0fa2'],
  ['photo-1606107557195-0e29a4b5b4aa','photo-1587563871167-1ee9c731aefb'],
  ['photo-1460353581641-37baddab0fa2','photo-1606107557195-0e29a4b5b4aa'],
];

const womensImages = [
  ['photo-1579298245158-33e8f568f7d3','photo-1539185441755-769473a23570'],
  ['photo-1603808033192-082d6919d3e1','photo-1542291026-7eec264c27ff'],
  ['photo-1543163521-1bf539c55dd2','photo-1595950653106-6c9ebd614d3a'],
  ['photo-1515347619252-60a4bf4fff4f','photo-1600185365483-26d7a4cc7519'],
  ['photo-1518894781321-630e638d0742','photo-1491553895911-0055eca6402d'],
  ['photo-1512374382149-233c42b6a83b','photo-1608231387042-66d1773070a5'],
  ['photo-1499714608240-22fc6ad53fb2','photo-1556906781-9a412961c28c'],
  ['photo-1548036328-c9fa89d128fa','photo-1600185365926-3a2ce3cdb9eb'],
  ['photo-1586280268958-9483002d016a','photo-1575537302964-96cd47c06b1b'],
  ['photo-1560769629-975ec94e6a86','photo-1584735175315-9d5df23be3c4'],
  ['photo-1542291026-7eec264c27ff','photo-1603808033192-082d6919d3e1'],
  ['photo-1595950653106-6c9ebd614d3a','photo-1543163521-1bf539c55dd2'],
  ['photo-1600185365483-26d7a4cc7519','photo-1515347619252-60a4bf4fff4f'],
  ['photo-1491553895911-0055eca6402d','photo-1518894781321-630e638d0742'],
  ['photo-1608231387042-66d1773070a5','photo-1512374382149-233c42b6a83b'],
  ['photo-1556906781-9a412961c28c','photo-1499714608240-22fc6ad53fb2'],
  ['photo-1600185365926-3a2ce3cdb9eb','photo-1548036328-c9fa89d128fa'],
  ['photo-1575537302964-96cd47c06b1b','photo-1586280268958-9483002d016a'],
  ['photo-1584735175315-9d5df23be3c4','photo-1560769629-975ec94e6a86'],
  ['photo-1579298245158-33e8f568f7d3','photo-1539185441755-769473a23570'],
  ['photo-1605348532760-6753d2c43329','photo-1606107557195-0e29a4b5b4aa'],
  ['photo-1587563871167-1ee9c731aefb','photo-1460353581641-37baddab0fa2'],
  ['photo-1543163521-1bf539c55dd2','photo-1512374382149-233c42b6a83b'],
  ['photo-1515347619252-60a4bf4fff4f','photo-1499714608240-22fc6ad53fb2'],
  ['photo-1548036328-c9fa89d128fa','photo-1586280268958-9483002d016a'],
];

function img(id) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
}

const mensBrands = ['Nike','Adidas','New Balance','Puma','Reebok','Converse','Vans','Jordan','Under Armour','Skechers','Asics','Brooks','Hoka','Salomon','Merrell'];
const womensBrands = ['Nike','Adidas','New Balance','Puma','Reebok','Converse','Vans','Steve Madden','Sam Edelman','Cole Haan','Clarks','UGG','Birkenstock','Skechers','Hoka'];

const mensNames = [
  'Nike Air Max 270','Adidas UltraBoost 23','New Balance 574','Puma Suede Classic XXI','Reebok Classic Leather',
  'Converse Chuck Taylor All Star','Vans Old Skool','Jordan 1 Retro High OG','Under Armour HOVR Phantom','Skechers Elite Flex',
  'Asics Gel-Nimbus 25','Brooks Ghost 15','Hoka Clifton 9','Salomon Speedcross 6','Merrell Moab 3',
  'Nike React Infinity Run','Adidas NMD_R1','New Balance Fresh Foam 1080','Puma RS-X³','Reebok Nano X3',
  'Nike Zoom Pegasus 40','Adidas Forum Low','New Balance 990v5','Puma Future Rider','Jordan 4 Retro',
  'Under Armour Curry 11','Nike Metcon 9','Adidas Samba OG','New Balance 327','Puma Clyde Court',
  'Nike Air Force 1 Mid','Adidas Yeezy Foam Runner','New Balance 2002R','Reebok Answer IV','Vans Sk8-Hi',
  'Nike Dunk Low Retro','Adidas Terrex Swift R3','New Balance 550','Puma Cell Viper','Jordan 11 Retro',
];

const womensNames = [
  'Nike Air Force 1 Shadow','Adidas Stan Smith','Nike Free Run 5.0','Adidas Gazelle Bold','New Balance 530',
  'Puma Cali Dream','Reebok Classic Club C 85','Converse Run Star Hike','Vans Authentic','Steve Madden Possession',
  'Sam Edelman Felicia Flat','Cole Haan Zerogrand','Clarks Originals Desert Boot','UGG Classic Short','Birkenstock Arizona',
  'Nike Air Zoom Pegasus','Adidas Ultraboost Light','New Balance 574 Core','Puma Mayze Stack','Reebok Nano X2',
  'Nike React Element 55','Adidas Forum Low W','New Balance Fresh Foam X','Hoka Bondi 8','Skechers Go Walk Joy',
  'Nike Blazer Mid Vintage','Adidas Grand Court SE','New Balance FuelCell SuperComp','Steve Madden Rexy','Sam Edelman Petty',
  'Cole Haan Grand Ambition','Vans Sk8-Hi Reissue','Puma Suede Mayu','Reebok Classic Leather SP','Converse Chuck 70',
  'Nike Dunk High','Adidas Originals Nizza','New Balance 997H','Hoka Speedgoat 5','UGG Tasman',
  'Skechers D\'Lites','Birkenstock Gizeh','Sam Edelman Laguna','Steve Madden Swagger','Clarks Wallabee',
  'Nike Air Max 90 W','Adidas NMD_R1 W','Puma Voltaic Evo','Reebok Floatride Energy','Jordan 1 Low W',
];

const mensDescriptions = [
  'Engineered for all-day comfort with a responsive sole and breathable mesh upper. Perfect for city walks and casual wear.',
  'Premium cushioning technology delivers an unmatched ride. The knit upper adapts to your foot shape for a personalized fit.',
  'A heritage icon reimagined with modern materials. ENCAP midsole technology provides superior support and durability.',
  'Timeless suede upper with a rubber outsole. This streetwear classic pairs effortlessly with any outfit.',
  'Full-grain leather upper meets a legendary silhouette. Built for everyday wear with a memory foam sockliner.',
  'High-top canvas construction with iconic star detailing. The ultimate casual sneaker with unbeatable style.',
  'Waffle sole and canvas upper define this streetwear staple. Durable, versatile, and endlessly cool.',
  'Premium leather and suede panels meet bold colorblocking. A collector\'s favorite with unparalleled street cred.',
  'Charged Cushioning midsole absorbs and returns energy. Breathable mesh upper keeps your feet cool and fresh.',
  'Air-cooled memory foam footbed delivers all-day comfort. Lightweight and flexible for active lifestyles.',
  'FLYTEFOAM technology provides an ultra-lightweight yet cushioned ride. Ideal for long-distance runners.',
  'DNA LOFT v3 cushioning offers a plush, protective feel underfoot. Engineered for neutral runners seeking comfort.',
  'HOKA\'s signature maximalist cushioning in a sleek low-profile design. Smooth ride from heel to toe.',
  'Contagrip outsole delivers reliable traction on any terrain. Gore-Tex lining keeps your feet dry in all conditions.',
  'Air cushioning in the heel provides lightweight impact protection. Ideal for hiking, trail running, and adventure.',
];

const womensDescriptions = [
  'A bold new take on an icon. Platform sole and layered design make this a statement piece for any wardrobe.',
  'Clean minimalist design with full-grain leather upper. The signature heel tab makes it an everyday essential.',
  'Ultralight breathable upper with a flexible outsole. Designed to feel like a second skin on your feet.',
  'Suede silhouette with a bold platformed sole. A retro-inspired look for the modern woman.',
  'Dad shoe silhouette reimagined with premium materials. Mesh and synthetic overlays in retro-inspired colorways.',
  'Platform sole adds height without sacrificing comfort. Premium leather upper with logo detailing.',
  'Classic court shoe with a premium leather upper. The timeless design complements any casual ensemble.',
  'Stacked lugged outsole meets heritage canvas upper. Bold, high-fashion meets streetwear utility.',
  'Low-profile canvas silhouette with iconic side stripe. Effortless slip-on style for everyday wear.',
  'Sleek upper with elasticized laces and padded collar. The perfect blend of comfort and elevated style.',
  'Italian leather upper with a pointed toe and kitten heel. Elegant enough for the office, comfortable for all day.',
  'GRANDFOAM footbed provides all-day cushioning. Waterproof suede upper defies the elements in style.',
  'Crepe sole and suede upper define this British icon. A timeless silhouette that works year-round.',
  'Twin-faced sheepskin lining keeps feet warm and cozy. The quintessential cold-weather boot.',
  'Contoured cork footbed molds to your foot over time. Adjustable buckle straps for a perfect fit.',
];

const mensSizes = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12];
const womensSizes = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];

const mensColors = [
  ['Black/White','Triple White','Hyper Blue'],
  ['Core Black','Cloud White','Carbon'],
  ['Navy/Grey','Forest Green','Burgundy'],
  ['Black/White','Navy','Forest Night'],
  ['Chalk/Classic White','Utility Green'],
  ['Black','Converse Black','Egret'],
  ['Black','White','Navy'],
  ['Chicago Red','Royal Blue','Bred'],
  ['Black','White','Gray'],
  ['Navy','Charcoal','Black'],
];

const womensColors = [
  ['Triple White','Sail','Black'],
  ['White/Green','White/Navy','White/Pink'],
  ['Black','White','Coral'],
  ['Core Black','Wonder Taupe','Better Scarlet'],
  ['Sea Salt','Cloud Pink','Black'],
  ['White/Silver','Black/Gold','Pink'],
  ['White/Green','White/Vector Red'],
  ['Black','White','Natural Ivory'],
  ['Black','White','Navy'],
  ['White/Gold','Black/Silver'],
];

const mensBrandList = ['Nike','Adidas','New Balance','Puma','Reebok','Converse','Vans','Jordan','Under Armour','Skechers'];
const womensBrandList = ['Nike','Adidas','New Balance','Puma','Reebok','Converse','Vans','Steve Madden','Sam Edelman','Cole Haan'];

const products = [];

// --- 40 Mens Products ---
for (let i = 0; i < 40; i++) {
  const imgPair = mensImages[i % mensImages.length];
  const desc = mensDescriptions[i % mensDescriptions.length];
  const colors = mensColors[i % mensColors.length];
  const brand = mensBrandList[i % mensBrandList.length];
  const price = parseFloat((79.99 + (i * 7.5) % 200).toFixed(2));
  const stock = 5 + (i * 3 % 25);
  const rating = parseFloat((3.8 + (i * 0.07 % 1.2)).toFixed(1));
  const reviews = 10 + (i * 11 % 90);

  products.push({
    name: mensNames[i] || `${brand} Men's Style ${i + 1}`,
    images: [img(imgPair[0]), img(imgPair[1])],
    description: desc,
    brand,
    category: 'Mens Sneakers',
    price,
    countInStock: stock,
    rating: Math.min(5, rating),
    numReviews: reviews,
    sizes: mensSizes,
    colors,
  });
}

// --- 40 Womens Products ---
for (let i = 0; i < 40; i++) {
  const imgPair = womensImages[i % womensImages.length];
  const desc = womensDescriptions[i % womensDescriptions.length];
  const colors = womensColors[i % womensColors.length];
  const brand = womensBrandList[i % womensBrandList.length];
  const price = parseFloat((69.99 + (i * 6.5) % 180).toFixed(2));
  const stock = 4 + (i * 4 % 30);
  const rating = parseFloat((3.9 + (i * 0.06 % 1.1)).toFixed(1));
  const reviews = 12 + (i * 9 % 85);

  products.push({
    name: womensNames[i] || `${brand} Women's Style ${i + 1}`,
    images: [img(imgPair[0]), img(imgPair[1])],
    description: desc,
    brand,
    category: 'Womens Sneakers',
    price,
    countInStock: stock,
    rating: Math.min(5, rating),
    numReviews: reviews,
    sizes: womensSizes,
    colors,
  });
}

const output = `const products = ${JSON.stringify(products, null, 2)};\n\nmodule.exports = products;\n`;
fs.writeFileSync(path.join(__dirname, 'products.js'), output);

console.log(`✅ Generated ${products.length} products (${products.filter(p=>p.category==='Mens Sneakers').length} mens, ${products.filter(p=>p.category==='Womens Sneakers').length} womens)`);
console.log('products.js has been updated!');
