import React from 'react';
import SendMessage from './SendMessage';
import Chat from './Chat';

const MessagePage = ({ senderId, receiverId }) => {
    return (
        <div>
            <Chat senderId={senderId} receiverId={receiverId} />
            <SendMessage senderId={senderId} receiverId={receiverId} />
        </div>
    );
};

export default MessagePage;
