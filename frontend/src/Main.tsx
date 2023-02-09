// import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import MyPosts from './pages/MyPosts';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/my-posts' element={<MyPosts />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create-account' element={<CreateAccount />} />
        </Routes>
    );
}

export default Main;
