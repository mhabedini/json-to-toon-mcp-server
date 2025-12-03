// Demonstrate token flow with MCP vs traditional approach
import { encode } from '@toon-format/toon';

// Sample user JSON input
const userJSON = {
  products: [
    { id: 1, name: "Laptop", price: 999.99, category: "Electronics", stock: 15 },
    { id: 2, name: "Mouse", price: 29.99, category: "Electronics", stock: 50 },
    { id: 3, name: "Keyboard", price: 79.99, category: "Electronics", stock: 30 }
  ],
  metadata: {
    total_products: 3,
    last_updated: "2025-12-04T16:00:00Z"
  }
};

console.log('=== Token Flow Analysis ===\n');

// Traditional approach: User sends JSON directly to AI
const jsonString = JSON.stringify(userJSON, null, 2);
const jsonTokens = jsonString.length; // Approximate

console.log('🔥 TRADITIONAL APPROACH (Burns Tokens):');
console.log(`User sends JSON to AI: ${jsonTokens} tokens`);
console.log(`AI processes entire JSON: ${jsonTokens} tokens`);
console.log(`Total tokens burned: ${jsonTokens * 2} tokens`);
console.log('');

// MCP approach: AI calls tool, gets TOON back
const toonString = encode(userJSON);
const toonTokens = toonString.length;

console.log('⚡ MCP APPROACH (Saves Tokens):');
console.log(`User sends tool call request: ~50 tokens`);
console.log(`MCP server processes JSON: 0 tokens (server-side)`);
console.log(`AI receives TOON result: ${toonTokens} tokens`);
console.log(`Total tokens used: ${50 + toonTokens} tokens`);
console.log('');

// Calculate savings
const traditionalTotal = jsonTokens * 2;
const mcpTotal = 50 + toonTokens;
const savings = traditionalTotal - mcpTotal;
const savingsPercent = ((savings / traditionalTotal) * 100).toFixed(1);

console.log('💰 SAVINGS BREAKDOWN:');
console.log(`Traditional: ${traditionalTotal} tokens`);
console.log(`MCP Server: ${mcpTotal} tokens`);
console.log(`Tokens saved: ${savings} (${savingsPercent}%)`);
console.log('');

console.log('=== Token Flow Comparison ===');
console.log('\n📝 Traditional Flow:');
console.log('1. User: "Analyze this JSON data" + [JSON blob]');
console.log('2. AI: [Processes entire JSON syntax]');
console.log('3. AI: [Analyzes content]');
console.log('4. → BURNED: Full JSON token count');

console.log('\n🛠️  MCP Server Flow:');
console.log('1. User: "Use json-to-toon tool with this data"');
console.log('2. AI: [Calls MCP tool, gets TOON back]');
console.log('3. AI: [Processes compact TOON data]');
console.log('4. → SAVED: Only TOON token count');

console.log('\n=== Real-World Impact ===');
console.log('\nFor a chatbot handling 1000 requests/day:');
const dailyTraditional = traditionalTotal * 1000;
const dailyMCP = mcpTotal * 1000;
const dailySavings = dailyTraditional - dailyMCP;

console.log(`Traditional approach: ${dailyTraditional.toLocaleString()} tokens/day`);
console.log(`MCP approach: ${dailyMCP.toLocaleString()} tokens/day`);
console.log(`Daily savings: ${dailySavings.toLocaleString()} tokens`);
console.log(`Monthly savings: ${(dailySavings * 30).toLocaleString()} tokens`);
console.log(`Cost savings: $${(dailySavings * 30 * 0.00003).toFixed(2)}/month`);