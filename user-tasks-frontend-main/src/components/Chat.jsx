import React, { useEffect, useState } from 'react';
import http from "../../http-common";

const Chat = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        loadMessages();
    }, [senderId, receiverId]);

    const loadMessages = () => {
        http.get(`/api/messages/${senderId}/${receiverId}`)
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error("Error loading messages", error);
            });
    };

    return (
        <div>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <b>{message.sender.id === senderId ? "Вы" : "Другой пользователь"}:</b>
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chat;
