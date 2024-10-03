import React, { useState } from 'react';
import axios from 'axios';
import '../fotter/fotter.css';
import.meta.env.VITE_API_KEY


function Fotter() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([{text : "Hi  may I tell you about the course details,Type 'YES' or 'NO' "}])
    
    console.log(messages)
    
    console.log(import.meta.env.VITE_API_KEY);
    
 
    const sendMessage = async (e) => {
        e.preventDefault();
        const userMessage = input;
        setMessages([...messages, { sender: 'User', text: userMessage }]);
        setInput('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_KEY}`+"/api/chat", { message: userMessage });
            setMessages(prevMessages => [
                ...prevMessages,
                { sender: 'Bot', text: response.data.response }
            ]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container container">
          <div className=' d-flex align-items-center justify-content-center  gap-3 '>
          <h1 className=' fw-bold text-primary'>Chatbot </h1>
          <img src="https://cdn-icons-png.flaticon.com/512/4712/4712010.png"  style={{width:"100px"}} alt="" />

          </div>
            <div className="messages container">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        <strong >{msg.sender} : </strong>  {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className=' d-flex  gap-2'>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className=' form-control'
                    placeholder="Type your message..."
                    required
                />
                <button type="submit" className=' btn btn-primary'>Send</button>
            </form>
        </div>
    );
}

export default Fotter;

