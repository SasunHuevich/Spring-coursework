 import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import http from "../../http-common";

const AdminSuggestedTopics = ({ user }) => {
    const [suggestedTopics, setSuggestedTopics] = useState([]);
    const [selectedTopicId, setSelectedTopicId] = useState(null); 
    const [commentTopicId, setCommentTopicId] = useState(null); 
    const [comment, setComment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'ROLE_ADMIN') {
            navigate('/login'); 
        } else {
            fetchSuggestedTopics(); 
        }
    }, [user, navigate]);

    const fetchSuggestedTopics = async () => {
        try {
            const response = await http.get("/suggested-topics");
            const topics = response.data;
            setSuggestedTopics(topics);
        } catch (error) {
            console.error("Ошибка при получении предложенных тем:", error);
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmitComment = (topicId) => {
        const updatedTopic = {
            comment: comment
        };

        http.post(`/submit-comment/${topicId}`, updatedTopic)
            .then(() => {
                setSuggestedTopics(suggestedTopics.map(topic =>
                    topic.id === topicId ? { ...topic, comment: comment } : topic
                ));
                setComment('');
                setCommentTopicId(null);
            })
            .catch(e => {
                console.error("Ошибка при отправке комментария:", e);
            });
    };

    const toggleDescription = (topicId) => {
        setSelectedTopicId(selectedTopicId === topicId ? null : topicId);
    };

    const toggleComment = (topicId) => {
        setCommentTopicId(commentTopicId === topicId ? null : topicId);
    };

    const handleApprove = (topicId) => {
        http.post(`/approve-topic/${topicId}`)
            .then(() => {
                setSuggestedTopics(suggestedTopics.filter(topic => topic.id !== topicId));
            })
            .catch(error => {
                console.error("Ошибка при одобрении темы:", error);
            });
    };

    return (
        <div className="container-md mt-3">
            <h3>Темы на согласование</h3>
            <table className="table table-bordered mt-2">
                <thead>
                    <tr>
                        <th>Имя студента</th>
                        <th>Название темы</th>
                        <th>Научный руководитель</th>
                        <th>Комментарий</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {suggestedTopics.map((topic) => (
                        <tr key={topic.id}>
                            <td>{topic.username}</td> {}
                            <td>{topic.name}</td>
                            <td>{topic.teacher}</td>
                            <td>{topic.comment || 'Нет комментария'}</td>
                            <td>
                                <button onClick={() => toggleDescription(topic.id)} className="btn btn-info">
                                    {selectedTopicId === topic.id ? "Скрыть описание" : "Подробнее"}
                                </button>
                                <button onClick={() => toggleComment(topic.id)} className="btn btn-warning ms-2">
                                    {commentTopicId === topic.id ? "Отмена" : "Комментировать"}
                                </button>
                                <button onClick={() => handleApprove(topic.id)} className="btn btn-success ms-2">
                                    Одобрить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {commentTopicId && (
                <div className="mt-3">
                    <textarea
                        className="form-control"
                        rows="3"
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Введите комментарий"
                    />
                    <button
                        onClick={() => handleSubmitComment(commentTopicId)}
                        className="btn btn-primary mt-2"
                    >
                        Отправить комментарий
                    </button>
                </div>
            )}

            {suggestedTopics.map((topic) => (
                selectedTopicId === topic.id && (
                    <div className="alert alert-info mt-3" key={topic.id}>
                        <strong>Описание:</strong> {topic.description}
                    </div>
                )
            ))}
        </div>
    );
};

// Функция для подключения к Redux
function mapStateToProps(state) {
    const { user } = state.auth; 
    return {
        user
    };
}

export default connect(mapStateToProps)(AdminSuggestedTopics);
