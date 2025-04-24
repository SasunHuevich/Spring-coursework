import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Header from './layout/Header'


import TopicFreeList from './pages/category/TopicFreeList'
import SuggestTopic from './pages/category/SuggestTopic'
import AdminSuggestedTopics from './pages/category/AdminSuggestedTopics'
import ApprovedTopicsList from './pages/category/ApprovedTopicsList'
import New1 from './pages/category/new'

import Login from "./pages/authorization/Login";
import Register from "./pages/authorization/Register";
import Profile from "./pages/authorization/Profile";
import { connect } from "react-redux";

class App extends React.Component {
    render() {

        return (
            <div>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/New" element={<New1/>}/>
                        <Route path="/TopicFreeList" element={<TopicFreeList/>}/>
                        <Route path="/login" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="/SuggestTopic" element={<SuggestTopic/>} />
                        <Route path="/AdminSuggestedTopics" element={<AdminSuggestedTopics />} />
                        <Route path="/ApprovedTopicsList" element={<ApprovedTopicsList />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

// функциональность Redux: позволяет передать на перенаправляемые страницы данные
function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

// передача данных к другим компонентам
export default connect(mapStateToProps)(App);
