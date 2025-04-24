import React, { useState } from 'react';
import http from "../../http-common";

const SendMessage = ({ senderId, receiverId }) => {
    const [content, setContent] = useState('');

    const sendMessage = () => {
        const message = {
            sender: { id: senderId },
            receiver: { id: receiverId },
            content: content
        };

        http.post("/api/messages/send", message)
            .then(response => {
                console.log("Message sent:", response.data);
                setContent('');  // Очистить поле после отправки
            })
            .catch(error => {
                console.error("There was an error sending the message!", error);
            });
    };

    return (
        <div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Введите сообщение"
            />
            <button onClick={sendMessage}>Отправить</button>
        </div>
    );
};

export default SendMessage;
