const sendToZapier = async (task) => {
  try {
    const res = await fetch(process.env.ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });

    if (!res.ok) {
      throw new Error(`Zapier Webhook failed: ${res.statusText}`);
    }

    console.log('✅ Task sent to Zapier successfully');
  } catch (error) {
    console.error('❌ Error sending to Zapier:', error.message);
  }
};

module.exports = sendToZapier;