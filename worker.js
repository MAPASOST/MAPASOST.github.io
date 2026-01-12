// Cloudflare Worker - Backend Proxy for Claude API
// This keeps your API key secure on the server side

// IMPORTANT: Set your API key as a secret in Cloudflare Workers:
// wrangler secret put ANTHROPIC_API_KEY
// When prompted, paste your Claude API key (starts with sk-ant-api03-...)

export default {
  async fetch(request, env) {
    // CORS headers for your GitHub Pages site
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // Change to 'https://mapasost.github.io' for production
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', {
        status: 405,
        headers: corsHeaders
      });
    }

    try {
      // Get the request body from the frontend
      const body = await request.json();

      // Call Claude API with the secret API key
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY, // Secret stored in Cloudflare
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(body)
      });

      // Get the response from Claude
      const data = await response.json();

      // Return the response to the frontend
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
  }
};
