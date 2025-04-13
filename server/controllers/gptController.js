
// import fetch from 'node-fetch';
const fetch = require('node-fetch');

const chat = async (req, res) => {
    try {
        const { message } = req.body;
        const response = await fetch('http://localhost:5001/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const subtasks = async (req, res) => {
    try {
        const { message } = req.body;
        const task = message
        const response = await fetch('http://localhost:5001/subtasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
        });
        console.log("this is the message: "+message)
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const categorize = async (req, res) => {
    try {
        const { message } = req.body;
        const task = message
        const response = await fetch('http://localhost:5001/categorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { chat, subtasks, categorize }