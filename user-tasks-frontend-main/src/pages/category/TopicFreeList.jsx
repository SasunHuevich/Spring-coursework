import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import http from "../../http-common";

const TopicFreeList = ({ user }) => {
    const [topicfreeall, setCategories] = useState([]);
    const [expandedTopic, setExpandedTopic] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    
    const [newTopic, setNewTopic] = useState({
        name: '',
        teacher: '',
        description: ''
    });

    const [isFormVisible, setIsFormVisible] = useState(false);
    

    const [pendingDelete, setPendingDelete] = useState(null);

    useEffect(() => {
        http.get("/topicfree")
            .then(response => {
                setCategories(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    const toggleDescription = (id) => {
        setExpandedTopic(expandedTopic === id ? null : id);
    };

    const handleSelectTopic = (topicId) => {
        if (selectedTopic === topicId) {
            setSelectedTopic(null); 
        } else {
            setSelectedTopic(topicId); 
        }
    };

    const handleConfirmTopic = () => {
        if (!selectedTopic) return;

        const requestBody = {
            topicId: selectedTopic,
            userId: user.id
        };

        http.post(`/select`, requestBody)
        .then((response) => {
            alert(response.data); 
            setCategories(topicfreeall.filter(t => t.id !== selectedTopic)); 
            setSelectedTopic(null); 
        })
        .catch((error) => {
            if (error.response && error.response.status === 409) {
                alert("Невозможно выбрать больше одной темы!"); 
            } else {
                console.error('Error selecting topic:', error);
                alert("Ошибка при выборе темы");
            }
        });
    };

    const handleDeleteTopic = (topicId) => {
        if (pendingDelete === topicId) {
            http.delete(`/delete/${topicId}`)
                .then(() => {
                    setCategories(topicfreeall.filter(t => t.id !== topicId));
                    setPendingDelete(null); 
                })
                .catch((e) => {
                    console.error('Error deleting topic:', e);
                });
        } else {
            setPendingDelete(topicId);
        }
    };

    const handleAddTopic = () => {
        http.post("/add", newTopic)
            .then(response => {
                setCategories([...topicfreeall, response.data]);
                setNewTopic({ name: '', teacher: '', description: '' });
                setIsFormVisible(false);
            })
            .catch(e => {
                console.error('Error adding topic:', e);
            });
    };

    return (
        <div className="container-md mt-3">
            {user && user.role === 'ROLE_ADMIN' && (
                <div className="mb-4">
                    <button 
                        className="btn btn-primary" 
                        onClick={() => setIsFormVisible(!isFormVisible)}
                    >
                        {isFormVisible ? 'Скрыть форму' : 'Добавить новую тему'}
                    </button>
                    {isFormVisible && (
                        <div className="mt-3">
                            <h4>Добавить новую тему</h4>
                            <div className="mb-2">
                                <input 
                                    type="text" 
                                    placeholder="Название темы" 
                                    value={newTopic.name} 
                                    onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })} 
                                    className="form-control" 
                                />
                            </div>
                            <div className="mb-2">
                                <input 
                                    type="text" 
                                    placeholder="Имя учителя" 
                                    value={newTopic.teacher} 
                                    onChange={(e) => setNewTopic({ ...newTopic, teacher: e.target.value })} 
                                    className="form-control" 
                                />
                            </div>
                            <div className="mb-2">
                                <textarea 
                                    placeholder="Описание" 
                                    value={newTopic.description} 
                                    onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })} 
                                    className="form-control" 
                                />
                            </div>
                            <button 
                                className="btn btn-primary" 
                                onClick={handleAddTopic}
                            >
                                Отправить
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="col-sm-12 mt-2">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Научный руководитель</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topicfreeall.map((topicfree, i) => (
                            <React.Fragment key={i}>
                                <tr>
                                    <td>{topicfree.name}</td>
                                    <td>{topicfree.teacher}</td>
                                    <td>
                                        {}
                                        <button 
                                            className="btn btn-info" 
                                            onClick={() => toggleDescription(topicfree.id)}
                                        >
                                            Просмотреть
                                        </button>

                                        {user && user.role === 'ROLE_USER' && (
                                            <>
                                                <button 
                                                    className="btn btn-primary ms-2"
                                                    onClick={() => handleSelectTopic(topicfree.id)}
                                                >
                                                    {selectedTopic === topicfree.id ? 'Выбрана' : 'Выбрать'}
                                                </button>

                                                {}
                                                {selectedTopic === topicfree.id && (
                                                    <button 
                                                        className="btn btn-success ms-2"
                                                        onClick={handleConfirmTopic}
                                                    >
                                                        Подтвердить
                                                    </button>
                                                )}
                                            </>
                                        )}
                                        {user && user.role === 'ROLE_ADMIN' && (
                                            <button 
                                                className={`btn ${pendingDelete === topicfree.id ? 'btn-warning' : 'btn-danger'} ms-2`} 
                                                onClick={() => handleDeleteTopic(topicfree.id)}
                                            >
                                                {pendingDelete === topicfree.id ? 'Подтвердить удаление' : 'Удалить'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                                {expandedTopic === topicfree.id && (
                                    <tr>
                                        <td colSpan="3">
                                            <div className="p-3 border rounded">
                                                <p>{topicfree.description || 'Описание отсутствует.'}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {user && user.role === 'ROLE_USER' && (
                <div className="row">
                    <div className="col">
                        <Link to="/SuggestTopic" className="btn btn-success mb-3">Предложить свою тему</Link>
                    </div>
                </div>
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

export default connect(mapStateToProps)(TopicFreeList);
