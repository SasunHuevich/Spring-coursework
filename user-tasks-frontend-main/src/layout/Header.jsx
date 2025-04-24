import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import authActions from "../actions/auth";
import { connect, useDispatch } from "react-redux";

function Header({ user }) {
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
        }
    }, [user]);

    const logOut = () => {
        dispatch(authActions.logout());
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-project navbar-expand-lg navbar-light" style={{ background: '#72beda' }}>
            <div className="ms-3">
                <Link className="navbar-brand" to="/TopicFreeList">Свободные темы</Link>
            </div>

            {currentUser && currentUser.role === "ROLE_USER" && (
                <div className="ms-3">
                    <Link className="navbar-brand" to="/SuggestTopic">Выбранная тема</Link>
                </div>
            )}

            {currentUser && currentUser.role === "ROLE_ADMIN" && (
                <>
                    <div className="ms-3">
                        <Link className="navbar-brand" to="/AdminSuggestedTopics">Темы на согласование</Link>
                    </div>
                    <div className="ms-3">
                        <Link className="navbar-brand" to="/ApprovedTopicsList">Утвержденные темы</Link>
                    </div>
                </>
            )}

            {currentUser ? (
                <div className="ml-auto">
                    <Link className="navbar-brand btn" to="/profile">{currentUser.username}</Link>
                    <button className="navbar-brand btn" onClick={logOut}>Выйти</button>
                </div>
            ) : (
                <div className="ml-auto">
                    <Link to="/register" className="nav-link navbar-brand btn navbar-brand-button">Регистрация</Link>
                    <Link to="/login" className="nav-link navbar-brand btn navbar-brand-button">Вход в систему</Link>
                </div>
            )}
        </nav>
    );
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(Header);
