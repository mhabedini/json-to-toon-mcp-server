import { encode } from '@toon-format/toon';

// Real-world example: E-commerce product catalog
const ecommerceData = {
  products: [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      category: "Electronics",
      in_stock: true,
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      price: 24.99,
      category: "Clothing",
      in_stock: true,
      rating: 4.2,
      reviews: 89
    },
    {
      id: 3,
      name: "Stainless Steel Water Bottle",
      price: 34.99,
      category: "Home & Kitchen",
      in_stock: false,
      rating: 4.8,
      reviews: 256
    }
  ],
  metadata: {
    total_products: 3,
    page: 1,
    per_page: 10,
    last_updated: "2025-12-04T15:30:00Z"
  }
};

// Simulate larger dataset (10x more products)
const largeDataset = {
  ...ecommerceData,
  products: Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.random() * 100 + 10,
    category: ["Electronics", "Clothing", "Home", "Sports", "Books"][Math.floor(Math.random() * 5)],
    in_stock: Math.random() > 0.3,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    reviews: Math.floor(Math.random() * 500)
  }))
};

console.log('=== AI Token Usage Analysis ===\n');

function analyzeData(name, data) {
  const jsonStr = JSON.stringify(data);
  const toonStr = encode(data);
  
  const jsonTokens = jsonStr.length; // Approximate token count
  const toonTokens = toonStr.length;
  const savings = jsonTokens - toonTokens;
  const savingsPercent = ((savings / jsonTokens) * 100).toFixed(1);
  
  console.log(`${name}:`);
  console.log(`  JSON size: ${jsonTokens} characters`);
  console.log(`  TOON size: ${toonTokens} characters`);
  console.log(`  Savings: ${savings} characters (${savingsPercent}%)`);
  console.log(`  Cost savings: ~$${(savings * 0.00003).toFixed(4)} per API call`);
  console.log('');
  
  return { jsonTokens, toonTokens, savings, savingsPercent };
}

// Analyze different scenarios
const small = analyzeData("Small Dataset (3 products)", ecommerceData);
const large = analyzeData("Large Dataset (30 products)", largeDataset);

console.log('=== Real-World Scenarios ===\n');

// Scenario 1: Daily API calls
console.log('Daily API Usage (1000 calls with large dataset):');
const dailySavings = large.savings * 1000;
console.log(`  Token savings: ${dailySavings.toLocaleString()} characters/day`);
console.log(`  Cost savings: $${(dailySavings * 0.00003).toFixed(2)}/day`);
console.log(`  Monthly savings: $${(dailySavings * 0.00003 * 30).toFixed(2)}`);
console.log('');

// Scenario 2: Chatbot with product data
console.log('Chatbot Response (including product catalog):');
const chatbotTokens = large.jsonTokens;
const chatbotToonTokens = large.toonTokens;
console.log(`  JSON approach: ${chatbotTokens} tokens`);
console.log(`  TOON approach: ${chatbotToonTokens} tokens`);
console.log(`  Faster response with ${large.savingsPercent}% less data`);
console.log('');

// Scenario 3: RAG system
console.log('RAG System (Retrieval-Augmented Generation):');
console.log(`  Can fit ${Math.floor(100 / (100 - parseFloat(large.savingsPercent)))}x more data in context`);
console.log(`  Better retrieval with structured TOON format`);
console.log(`  Reduced latency due to smaller payload`);