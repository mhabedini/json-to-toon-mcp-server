// Standalone example of using the JSON to TOON conversion
import { encode, decode } from '@toon-format/toon';

// Example JSON data
const sampleData = {
  users: [
    { id: 1, name: "Alice", role: "admin", active: true },
    { id: 2, name: "Bob", role: "user", active: false },
    { id: 3, name: "Charlie", role: "moderator", active: true }
  ],
  metadata: {
    total: 3,
    page: 1,
    per_page: 10
  },
  timestamp: "2025-12-04T10:30:00Z"
};

console.log('=== JSON to TOON Conversion Example ===\n');

// Convert JSON to TOON
console.log('Original JSON:');
console.log(JSON.stringify(sampleData, null, 2));
console.log('\nJSON Token Count:', JSON.stringify(sampleData).length);

const toonData = encode(sampleData);
console.log('\nConverted TOON:');
console.log(toonData);
console.log('\nTOON Character Count:', toonData.length);

// Calculate token savings
const jsonTokens = JSON.stringify(sampleData).length;
const toonTokens = toonData.length;
const savings = jsonTokens - toonTokens;
const savingsPercent = ((savings / jsonTokens) * 100).toFixed(1);

console.log(`\nToken Savings: ${savings} characters (${savingsPercent}%)`);

// Convert TOON back to JSON
console.log('\n=== TOON to JSON Conversion ===\n');
const convertedBack = decode(toonData);
console.log('Converted back to JSON:');
console.log(JSON.stringify(convertedBack, null, 2));

// Verify data integrity
const isEqual = JSON.stringify(sampleData) === JSON.stringify(convertedBack);
console.log(`\nData integrity check: ${isEqual ? 'PASSED' : 'FAILED'}`);

// Example with different options
console.log('\n=== TOON with Custom Options ===\n');
const toonWithOptions = encode(sampleData, {
  delimiter: '|',
  indentation: '    ',
  showLengthMarkers: false
});

console.log('TOON with pipe delimiter and no length markers:');
console.log(toonWithOptions);