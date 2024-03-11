import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './messages.css';
import DeleteIcon from '@mui/icons-material/Delete';
import url from '../config'



const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            // Send the message to the server using Axios
            axios.post( `${url}/messageTable`, { message })
                .then(response => {
                    console.log('Message sent successfully:', response.data.data);
                    // Update the state to include the new message
                    onSendMessage(response.data.data);
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                    // Handle errors if needed
                });

            setMessage('');
        }
    };

    return (
        <div className='createText'>
            <textarea
                placeholder="הכנס טקסט"
                value={message}
                onChange={handleMessageChange}
            />
            <button className='sendText' onClick={handleSendMessage}>שלח</button>
        </div>
    );
};

const MessageScreen = ({ messages, onDeleteMessage }) => {
    return (
        <div className='messagesScreenCont'>
            <div className='messagesScreen'>
                <h2>הודעות</h2>
                {messages.map((message, index) => (
                    <div className='message' key={message._id}>
                        <div className='messagesTools'>
                            <span className='deleteMessage' onClick={() => onDeleteMessage(message._id)}>
                                <DeleteIcon />
                            </span>
                        </div>
                        {message.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

const Messages = () => {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = (newMessage) => {
        setMessages([...messages, newMessage]);
    };

    const handleDeleteMessage = (index) => {
        const messageId = index;

        axios.delete( `${url}/messageTable/${messageId}`)
            .then(response => {
                console.log('Message deleted successfully:', response.data);
                // Update the state to remove the deleted message
                axios.get( `${url}/messageTable`)
                    .then(response => {
                        setMessages(response.data.data);
                    })
                    .catch(error => {
                        console.error('Error fetching messages:', error);
                    });
            })
            .catch(error => {
                console.error('Error deleting message:', error);
                // Handle errors if needed
            });
    };

    useEffect(() => {
        axios.get( `${url}/messageTable`)
            .then(response => {
                setMessages(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    }, []);

    return (
        <div className='messagesCont'>
            <MessageInput onSendMessage={handleSendMessage} />
            <MessageScreen messages={messages} onDeleteMessage={handleDeleteMessage} />
        </div>
    );
};

export default Messages;
