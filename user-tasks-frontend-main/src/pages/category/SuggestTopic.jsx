import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import http from "../../http-common";
import { Link } from 'react-router-dom';

const SuggestTopic = ({ user }) => {
    const [topicName, setTopicName] = useState('');
    const [topicTeacher, setTopicTeacher] = useState('');
    const [topicDescription, setTopicDescription] = useState('');
    const [suggestedTopics, setSuggestedTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [showDescription, setShowDescription] = useState(false);
    const [confirmReject, setConfirmReject] = useState(false);
    const [activeTopicId, setActiveTopicId] = useState(null); 

    const navigate = useNavigate();
    const currentUser = user;

    useEffect(() => {
        if (!currentUser) {
            navigate('/TopicFreeList');
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        if (currentUser) {
            http.get("/suggested-topics")
                .then(response => {
                    const userTopics = response.data.filter(topic => topic.userId === currentUser.id);
                    setSuggestedTopics(userTopics);
                })
                .catch(e => {
                    console.log(e);
                });

            http.get(`/selected-topic/${currentUser.id}`)
                .then(response => {
                    if (response.data) {
                        setSelectedTopic(response.data);
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }, [currentUser]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTopic = {
            name: topicName,
            teacher: topicTeacher,
            description: topicDescription,
            userId: currentUser.id,
        };

        http.post("/suggest-topic", newTopic)
            .then(response => {
                console.log("Topic suggested:", response.data);
                setSuggestedTopics([...suggestedTopics, response.data]);
                setTopicName('');
                setTopicTeacher('');
                setTopicDescription('');
            })
            .catch(error => {
                console.error("Error while suggesting topic:", error);
            });
    };

    const handleApprove = (topicId) => {
        http.post(`/approve-topic/${topicId}`)
            .then(response => {
                console.log("Topic approved:", response.data);
                setSuggestedTopics(suggestedTopics.map(topic =>
                    topic.id === topicId ? { ...topic, approved: true } : topic
                ));
            })
            .catch(error => {
                console.error("Error while approving topic:", error);
            });
    };

    const handleReject = () => {
        if (confirmReject) {
            if (selectedTopic) {
                http.post(`/reject-topic`, selectedTopic.id)
                    .then(() => {
                        setSelectedTopic(null);
                        console.log("Topic rejected.");
                    })
                    .catch(error => {
                        console.error("Error while rejecting topic:", error);
                    });
            }
        } else {
            setConfirmReject(true);
        }
    };

    const handleDelete = (topicId) => {
        http.delete(`/delete-topic/${topicId}`)
            .then(() => {
                setSuggestedTopics(suggestedTopics.filter(topic => topic.id !== topicId));
                console.log("Topic deleted.");
            })
            .catch(error => {
                console.error("Error while deleting topic:", error);
            });
    };

    const toggleDescription = () => {
        setShowDescription(!showDescription);
    };

    const toggleTeacherComment = (topicId) => {
        setActiveTopicId(activeTopicId === topicId ? null : topicId);
    };

    return (
        <div className="container-md mt-3">
            {selectedTopic ? (
                <>
                    <h3>Ваша выбранная тема</h3>
                    <table className="table table-bordered mt-2">
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Научный руководитель</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedTopic.name}</td>
                                <td>{selectedTopic.teacher}</td>
                                <td>
                                    <button onClick={toggleDescription} className="btn btn-info">
                                        {showDescription ? "Скрыть описание" : "Подробнее"}
                                    </button>
                                    <button onClick={handleReject} className={`btn ${confirmReject ? "btn-danger" : "btn-warning"} ms-2`}>
                                        {confirmReject ? "Подтвердить отказ" : "Отказаться от темы"}
                                    </button>
                                    <button onClick={() => toggleTeacherComment(selectedTopic.id)} className="btn btn-secondary ms-2">
                                        {activeTopicId === selectedTopic.id ? "Скрыть комментарий" : "Комментарий учителя"}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {showDescription && (
                        <div className="alert alert-info mt-3">
                            <strong>Описание:</strong> {selectedTopic.description}
                        </div>
                    )}
                    {activeTopicId === selectedTopic.id && (
                        <div className="alert alert-secondary mt-3">
                            <strong>Комментарий учителя:</strong> {selectedTopic.comment || 'Нет комментария'}
                        </div>
                    )}
                </>
            ) : (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="topicName" className="form-label">Название темы</label>
                            <input
                                type="text"
                                className="form-control"
                                id="topicName"
                                value={topicName}
                                onChange={(e) => setTopicName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="topicTeacher" className="form-label">Научный руководитель</label>
                            <input
                                type="text"
                                className="form-control"
                                id="topicTeacher"
                                value={topicTeacher}
                                onChange={(e) => setTopicTeacher(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="topicDescription" className="form-label">Описание</label>
                            <input
                                type="text"
                                className="form-control"
                                id="topicDescription"
                                value={topicDescription}
                                onChange={(e) => setTopicDescription(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Предложить</button>
                    </form>
                </>
            )}

            {!selectedTopic && (
                <>
                    <h3 className="mt-4">Ваши предложенные темы</h3>
                    <table className="table table-bordered mt-2">
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Научный руководитель</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suggestedTopics.map((topic, i) => (
                                <tr key={i}>
                                    <td>{topic.name}</td>
                                    <td>{topic.teacher}</td>
                                    <td>
                                        <button onClick={() => toggleTeacherComment(topic.id)} className="btn btn-secondary ms-2">
                                            {activeTopicId === topic.id ? "Скрыть комментарий" : "Комментарий учителя"}
                                        </button>
                                        {currentUser?.role === "ROLE_ADMIN" && (
                                            <>
                                                <button onClick={() => handleApprove(topic.id)} className="btn btn-success ms-2">
                                                    Одобрить
                                                </button>
                                                <button onClick={() => handleDelete(topic.id)} className="btn btn-danger ms-2">
                                                    Удалить
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {activeTopicId && suggestedTopics.find(topic => topic.id === activeTopicId)?.comment && (
                        <div className="alert alert-secondary mt-3">
                            <strong>Комментарий учителя:</strong> {suggestedTopics.find(topic => topic.id === activeTopicId).comment}
                        </div>
                    )}
                </>
            )}

            {currentUser?.role === "ROLE_USER" && (
                <Link to="/TopicFreeList" className="btn btn-secondary mt-3">Назад к свободным темам</Link>
            )}
        </div>
    );
};

// Redux
function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(SuggestTopic);
