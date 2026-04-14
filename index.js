// This is your home page that displays the webhook status
import { useState, useEffect } from 'react';

export default function Home() {
  const [webhookUrl, setWebhookUrl] = useState('');

  useEffect(() => {
    // Get the current domain to show the webhook URL
    if (typeof window !== 'undefined') {
      setWebhookUrl(`${window.location.origin}/api/webhook`);
    }
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎯 Writer Playbook Webhook Receiver</h1>
        
        <div style={styles.section}>
          <h2 style={styles.subtitle}>Status: ✅ Active</h2>
          <p style={styles.text}>
            Your webhook endpoint is ready to receive data from Writer playbooks.
          </p>
        </div>

        <div style={styles.urlBox}>
          <h3 style={styles.label}>Your Webhook URL:</h3>
          <code style={styles.code}>
            {webhookUrl || 'Deploy to Vercel to see your URL'}
          </code>
          <button 
            style={styles.button}
            onClick={() => {
              navigator.clipboard.writeText(webhookUrl);
              alert('Copied to clipboard!');
            }}
          >
            📋 Copy URL
          </button>
        </div>

        <div style={styles.instructions}>
          <h3 style={styles.label}>How to use:</h3>
          <ol style={styles.list}>
            <li>Copy the webhook URL above</li>
            <li>Go to your Writer playbook</li>
            <li>Add a webhook action</li>
            <li>Paste this URL</li>
            <li>Set method to POST</li>
            <li>Run your playbook!</li>
          </ol>
        </div>

        <div style={styles.testSection}>
          <h3 style={styles.label}>Test your webhook:</h3>
          <button 
            style={styles.testButton}
            onClick={async () => {
              try {
                const response = await fetch('/api/webhook', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ 
                    test: true, 
                    message: 'Test from browser',
                    timestamp: new Date().toISOString()
                  })
                });
                const data = await response.json();
                alert(`✅ Success! ${JSON.stringify(data, null, 2)}`);
              } catch (error) {
                alert(`❌ Error: ${error.message}`);
              }
            }}
          >
            🧪 Send Test Request
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    maxWidth: '800px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#2d3748',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#48bb78',
    marginBottom: '10px',
  },
  section: {
    marginBottom: '30px',
  },
  text: {
    fontSize: '16px',
    color: '#4a5568',
    lineHeight: '1.6',
  },
  urlBox: {
    background: '#f7fafc',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    border: '2px solid #e2e8f0',
  },
  label: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '10px',
  },
  code: {
    display: 'block',
    background: '#1a202c',
    color: '#48bb78',
    padding: '15px',
    borderRadius: '6px',
    fontSize: '14px',
    overflowX: 'auto',
    marginBottom: '15px',
    fontFamily: 'monospace',
  },
  button: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
  },
  instructions: {
    background: '#edf2f7',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
  },
  list: {
    marginLeft: '20px',
    color: '#4a5568',
    lineHeight: '1.8',
  },
  testSection: {
    textAlign: 'center',
    marginTop: '30px',
  },
  testButton: {
    background: '#48bb78',
    color: 'white',
    border: 'none',
    padding: '15px 40px',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
  },
};