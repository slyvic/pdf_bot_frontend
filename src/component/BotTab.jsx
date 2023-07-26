import * as React from 'react';
import { Avatar, Typography, Box, Paper } from '@mui/material';

const BotTab = (props) => {
    const [msg, setMsg] = React.useState("");

    const submitMsg = async () => {
        const temp = [...props.chatHistory];
        temp.push({
            sender: "Me",
            content: msg
        });
        await fetch("http://127.0.0.1:8000/bot/chat", {
            method: 'post',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'text': msg })
        }).then(response => response.json())
            .then(data => {
                // Process the response data
                console.log('Response:', data.msg);
                if(data.msg !== "") {
                    temp.push({
                        sender: "Bot",
                        content: data.msg
                    });
                    props.setChatHistory(temp);
                    console.log(temp)
                } else {
                    console.log(data)
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    return <>
        <div className='bot-content'>
            {props.chatHistory.map((message, idx) => (
                <Box
                    key={idx}
                    display="flex"
                    alignItems="center"
                    paddingTop={1}
                    justifyContent={message.sender === 'Bot' ? 'flex-start' : 'flex-end'}
                >
                    {message.sender === 'Bot' && (
                        <Avatar src="/Bot-avatar.png" alt="Bot" sx={{ mr: 1 }} />
                    )}
                    <Paper
                        elevation={1}
                        sx={{
                            maxWidth: '80%',
                            backgroundColor: message.sender === 'Bot' ? '#e0e0e0' : '#1976d2',
                            color: message.sender === 'Bot' ? '#000' : '#fff',
                            padding: '10px',
                            borderRadius: '10px',
                        }}
                    >
                        <Typography variant="body1">{message.content}</Typography>
                    </Paper>
                    {message.sender === 'Me' && (
                        <Avatar src="/jane-avatar.png" alt="Me" sx={{ ml: 1 }} />
                    )}
                </Box>
            ))}
        </div>
        <div className='text-box-container'>
            <div>
                Ask here your question about the document, then press "enter" and scroll up for response
            </div>
            <div className='text-box-value'>
                <input value={msg} onKeyDown={e => { if (e.key === "Enter") submitMsg() }} onChange={e => setMsg(e.target.value)} className='chat-message' />
            </div>
        </div>
    </>
}

export default BotTab;