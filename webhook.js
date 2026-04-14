// This file receives data from your Writer playbook
// It will be available at: https://your-site.vercel.app/api/webhook

export default async function handler(req, res) {
  // Only accept POST requests (this is how Writer sends data)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    // Get the data sent from Writer playbook
    const playbookData = req.body;
    
    console.log('✅ Received data from Writer Playbook:', playbookData);
    
    // OPTION 1: Save to a JSON file (simple, no database needed)
    // Note: On Vercel, files are read-only. Use a database for production.
    // For now, we'll just log it and return success.
    
    // OPTION 2: You can send this data to:
    // - A database (Vercel Postgres, MongoDB, etc.)
    // - Another API
    // - Email service
    // - Notion, Airtable, etc.
    
    // Example: Save to Vercel KV (key-value store)
    // const { kv } = require('@vercel/kv');
    // await kv.lpush('playbook-results', JSON.stringify(playbookData));
    
    // Respond to Writer that we successfully received the data
    res.status(200).json({ 
      success: true, 
      message: 'Data received successfully',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process webhook' 
    });
  }
}

// Important: This tells Vercel the max size of data you can receive
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // Adjust if you expect larger data
    },
  },
};