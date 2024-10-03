const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path")
const dotenv = require("dotenv")
const moment = require("moment")

dotenv.config({ path: path.join(__dirname, "config", "config.env") })

const app = express();


const PORT = process.env.PORT

app.use(cors());
app.use(bodyParser.json());


app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    let botResponse;
    if (userMessage.includes('yes')) {
        botResponse = 'whate you kind like course for Example Diploma Courses ,Arts Courses,Engineering Courses?';
    } else if (userMessage.includes('no')) {
        botResponse = 'How can i help you ? For Example (Student details ,Date,Time and etc....)';
    }
    else if (userMessage.includes('diploma')) {
        botResponse = 'Diploma in Medical Laboratory Technology ,Diploma in Physician Assistant,Diploma in Anesthesia Technology, and May I tell you about the Fees details,Type Fees or NO';
    }
    else if (userMessage.includes('arts')) {
        botResponse = 'B.A. Tamil Literature,B.A.English Language & Literature,B.A.English Literature with Computer Applications,B.A.History and May I tell you about the Fees details,Type Fees or NO';
    }
    else if (userMessage.includes('Engineering') || userMessage.includes('Eng') ) {
        botResponse = 'B.E. Civil Engineering,B.E. Mechanical Engineering,B.E. Production Engineering ,May I tell you about the Fees details,Type Fees or NO ';
    }
    else if (userMessage.includes('fees')) {
        botResponse = "https://www.annauniv.edu/"
    }
    else if (userMessage.includes('tank you')) {
        botResponse = "Thanks for Connecting m";
    }
    else if (userMessage.includes('time')) {
        botResponse = moment().format("h:mm:ss: a ");
    }
    else if (userMessage.includes('Student details') || userMessage.includes('details')  ) {
        botResponse = moment().format("h:mm:ss: a ");
    }
    else if (userMessage.includes('date')) {
        botResponse = moment().format("MMM Do YYYY")
    }
    else {
        botResponse = 'How can i help you ? For Example {Student details ,Date,Time and etc....}'
    }

    res.json({ response: botResponse });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
