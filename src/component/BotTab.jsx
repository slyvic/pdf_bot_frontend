import * as React from 'react';
import { Avatar, Typography, Box, Paper } from '@mui/material';

const BotTab = () => {
    const messages = [
      { id: 1, sender: 'Jane', content: 'Hi Bot!' },
      { id: 2, sender: 'Bot', content: 'Hello! How can I assist you today?' },
      { id: 3, sender: 'Jane', content: 'How are you?' },
      { id: 4, sender: 'Bot', content: "As an AI language model, I don’t have feelings or emotions, so I don’t have a personal state of being. However, I’m here to assist you with any questions or tasks you have. How can I help you today?" },
    ];
    return <>
        <div className='bot-content'>
            {messages.map((message) => (
            <Box
                key={message.id}
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
                {message.sender === 'Jane' && (
                <Avatar src="/jane-avatar.png" alt="Jane" sx={{ ml: 1 }} />
                )}
            </Box>
            ))}
        </div>
        <div className='text-box-container'>
            <div>
            Ask here your question about the document, then press "enter" and scroll up for response
            </div>
            <div className='text-box-value'>
                <input className='chat-message' />
            </div>
        </div>
    </>
}

export default BotTab;