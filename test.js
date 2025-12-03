import { spawn } from 'child_process';
import { stdin, stdout } from 'process';

// Test data
const testJSON = {
  users: [
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "user" }
  ],
  metadata: {
    total: 2,
    page: 1
  }
};

async function testMCPServer() {
  console.log('Testing JSON to TOON MCP Server...\n');
  
  // Start the MCP server
  const server = spawn('node', ['index.js'], {
    stdio: ['pipe', 'pipe', 'inherit']
  });

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Test 1: List available tools
  console.log('1. Testing tool listing...');
  const listToolsRequest = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list',
    params: {}
  };

  server.stdin.write(JSON.stringify(listToolsRequest) + '\n');
  
  // Test 2: Convert JSON to TOON
  console.log('\n2. Testing JSON to TOON conversion...');
  const convertRequest = {
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/call',
    params: {
      name: 'convert_json_to_toon',
      arguments: {
        json_data: JSON.stringify(testJSON)
      }
    }
  };

  server.stdin.write(JSON.stringify(convertRequest) + '\n');

  // Test 3: Analyze token savings
  console.log('\n3. Testing token savings analysis...');
  const analyzeRequest = {
    jsonrpc: '2.0',
    id: 3,
    method: 'tools/call',
    params: {
      name: 'analyze_token_savings',
      arguments: {
        json_data: JSON.stringify(testJSON)
      }
    }
  };

  server.stdin.write(JSON.stringify(analyzeRequest) + '\n');

  // Collect responses
  let responseData = '';
  server.stdout.on('data', (data) => {
    responseData += data.toString();
    
    // Try to parse complete JSON-RPC responses
    const lines = responseData.split('\n').filter(line => line.trim());
    
    lines.forEach(line => {
      try {
        const response = JSON.parse(line);
        if (response.id === 1) {
          console.log('Available tools:', response.result.tools.map(t => t.name));
        } else if (response.id === 2) {
          console.log('JSON to TOON conversion result:');
          console.log(response.result.content[0].text);
        } else if (response.id === 3) {
          console.log('Token savings analysis:');
          console.log(response.result.content[0].text);
        }
      } catch (e) {
        // Not a complete JSON response yet
      }
    });
  });

  // Clean up after tests
  setTimeout(() => {
    console.log('\nTests completed. Shutting down server...');
    server.kill();
    process.exit(0);
  }, 5000);
}

// Run tests
testMCPServer().catch(console.error);