const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path=require("path")
const dotenv=require("dotenv")

dotenv.config({path:path.join(__dirname,"config","config.env")})

const app = express();


const PORT = process.env.PORT 

app.use(cors());
app.use(bodyParser.json());

// Simple chatbot logic
app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    let botResponse;

    // Basic response logic
    if (userMessage.includes('hello')) {
        botResponse = 'Hello! How can I assist you today?';
    } else if (userMessage.includes('bye')) {
        botResponse = 'Goodbye! Have a great day!';
    } else {
        botResponse = 'I\'m sorry, I didn\'t understand that.';
    }

    res.json({ response: botResponse });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
