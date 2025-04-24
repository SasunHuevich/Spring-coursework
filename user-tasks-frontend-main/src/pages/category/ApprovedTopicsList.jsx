// src/components/ApprovedTopicsList.js

import React, { useEffect, useState } from 'react';
import http from "../../http-common";

const ApprovedTopicsList = ({ user }) => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedTopic, setExpandedTopic] = useState(null);
    const [pendingDelete, setPendingDelete] = useState(null);
    const [pendingMakeFree, setPendingMakeFree] = useState(null); 
    const [usernames, setUsernames] = useState({});

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await http.get("/approved-topics");
                setTopics(response.data);
            } catch (err) {
                setError("Не удалось загрузить темы.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, []);

     // Функция для получения username по userId
     const fetchUsername = async (userId) => {
        try {
            const response = await http.get(`/username`, userId);
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении имени пользователя:", error);
            return "Неизвестный пользователь"; 
        }
    };

    const handleDelete = async (topicId) => {
        if (pendingDelete === topicId) {
            try {
                await http.delete(`/delete-topic/${topicId}`);
                setTopics(topics.filter(topic => topic.id !== topicId));
                setPendingDelete(null);
            } catch (error) {
                console.error("Ошибка при удалении темы:", error);
            }
        } else {
            setPendingDelete(topicId);
        }
    };

    const handleMakeFree = async (topicId) => {
        if (pendingMakeFree === topicId) {
            try {
                await http.post(`/make-free/${topicId}`);
                setTopics(topics.filter(topic => topic.id !== topicId)); 
                setPendingMakeFree(null); 
            } catch (error) {
                console.error("Ошибка при изменении статуса темы:", error);
            }
        } else {
            setPendingMakeFree(topicId);
        }
    };

    const toggleDescription = (id) => {
        setExpandedTopic(expandedTopic === id ? null : id);
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container-md mt-3">
            <h2>Утвержденные темы</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Имя студента</th>
                        <th>Название</th>
                        <th>Преподаватель</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {topics.map((topic) => (
                        <React.Fragment key={topic.id}>
                            <tr>
                                <td>{topic.username}</td> {}
                                <td>{topic.name}</td>
                                <td>{topic.teacher}</td>
                                <td>
                                    <button 
                                        className="btn btn-info" 
                                        onClick={() => toggleDescription(topic.id)}
                                    >
                                        Просмотреть
                                    </button>
                                    <button 
                                        className={`btn ${pendingDelete === topic.id ? 'btn-warning' : 'btn-danger'} ms-2`} 
                                        onClick={() => handleDelete(topic.id)}
                                    >
                                        {pendingDelete === topic.id ? 'Подтвердить удаление' : 'Удалить'}
                                    </button>

                                    {pendingMakeFree === topic.id ? (
                                        <button 
                                            className="btn btn-success ms-2"
                                            onClick={() => handleMakeFree(topic.id)}
                                        >
                                            Подтвердить
                                        </button>
                                    ) : (
                                        <button 
                                            className="btn btn-secondary ms-2" 
                                            onClick={() => handleMakeFree(topic.id)}
                                        >
                                            Сделать свободной
                                        </button>
                                    )}
                                </td>
                            </tr>
                            {expandedTopic === topic.id && (
                                <tr>
                                    <td colSpan="4">
                                        <div className="p-3 border rounded">
                                            <p>{topic.description || 'Описание отсутствует.'}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApprovedTopicsList;
