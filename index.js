import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { encode, decode } from '@toon-format/toon';

class JSONToToonMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'json-to-toon-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  setupToolHandlers() {
    // Handle tool listing
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'convert_json_to_toon',
          description: 'Convert JSON data to TOON (Token-Oriented Object Notation) format for efficient LLM token usage',
          inputSchema: {
            type: 'object',
            properties: {
              json_data: {
                type: 'string',
                description: 'JSON data to convert to TOON format',
              },
              options: {
                type: 'object',
                description: 'Conversion options',
                properties: {
                  delimiter: {
                    type: 'string',
                    enum: [',', '\t', '|'],
                    description: 'Delimiter for tabular arrays (default: ",")',
                  },
                  indentation: {
                    type: 'string',
                    enum: ['  ', '    ', '\t'],
                    description: 'Indentation string (default: "  ")',
                  },
                  show_length_markers: {
                    type: 'boolean',
                    description: 'Show length markers [N] for arrays (default: true)',
                  },
                },
              },
            },
            required: ['json_data'],
          },
        },
        {
          name: 'convert_toon_to_json',
          description: 'Convert TOON format back to JSON data',
          inputSchema: {
            type: 'object',
            properties: {
              toon_data: {
                type: 'string',
                description: 'TOON data to convert to JSON format',
              },
            },
            required: ['toon_data'],
          },
        },
        {
          name: 'analyze_token_savings',
          description: 'Analyze potential token savings when converting JSON to TOON',
          inputSchema: {
            type: 'object',
            properties: {
              json_data: {
                type: 'string',
                description: 'JSON data to analyze for token savings',
              },
            },
            required: ['json_data'],
          },
        },
      ],
    }));

    // Handle tool execution
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'convert_json_to_toon':
            return await this.convertJSONToToon(args);
          
          case 'convert_toon_to_json':
            return await this.convertToonToJSON(args);
          
          case 'analyze_token_savings':
            return await this.analyzeTokenSavings(args);
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
        };
      }
    });
  }

  async convertJSONToToon(args) {
    const { json_data, options = {} } = args;
    
    try {
      // Parse JSON data
      const jsonObj = JSON.parse(json_data);
      
      // Convert to TOON format
      const toonOptions = {
        delimiter: options.delimiter || ',',
        indentation: options.indentation || '  ',
        showLengthMarkers: options.show_length_markers !== false,
      };
      
      const toonData = encode(jsonObj, toonOptions);
      
      return {
        content: [
          {
            type: 'text',
            text: `JSON successfully converted to TOON format:\n\n${toonData}`,
          },
        ],
      };
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Invalid JSON data provided');
      }
      throw new Error(`Conversion failed: ${error.message}`);
    }
  }

  async convertToonToJSON(args) {
    const { toon_data } = args;
    
    try {
      // Convert TOON back to JSON
      const jsonObj = decode(toon_data);
      
      // Pretty print JSON
      const jsonData = JSON.stringify(jsonObj, null, 2);
      
      return {
        content: [
          {
            type: 'text',
            text: `TOON successfully converted to JSON format:\n\n${jsonData}`,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Conversion failed: ${error.message}`);
    }
  }

  async analyzeTokenSavings(args) {
    const { json_data } = args;
    
    try {
      // Parse JSON data
      const jsonObj = JSON.parse(json_data);
      
      // Convert to TOON format
      const toonData = encode(jsonObj);
      
      // Calculate token counts (rough estimation)
      const jsonTokens = this.estimateTokens(json_data);
      const toonTokens = this.estimateTokens(toonData);
      
      const savings = jsonTokens - toonTokens;
      const savingsPercent = ((savings / jsonTokens) * 100).toFixed(1);
      
      return {
        content: [
          {
            type: 'text',
            text: `Token Savings Analysis:\n` +
                  `JSON tokens: ${jsonTokens}\n` +
                  `TOON tokens: ${toonTokens}\n` +
                  `Tokens saved: ${savings} (${savingsPercent}%)\n\n` +
                  `TOON format preview:\n${toonData.slice(0, 200)}${toonData.length > 200 ? '...' : ''}`,
          },
        ],
      };
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Invalid JSON data provided');
      }
      throw new Error(`Analysis failed: ${error.message}`);
    }
  }

  estimateTokens(text) {
    // Rough token estimation: count words and special characters
    const words = text.split(/\s+/).length;
    const specialChars = (text.match(/[{}[\]",:]/g) || []).length;
    return Math.ceil(words * 1.3 + specialChars * 0.5);
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('JSON to TOON MCP server running on stdio');
  }
}

// Run the server
const server = new JSONToToonMCPServer();
server.run().catch(console.error);