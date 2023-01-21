// import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import MyPosts from './pages/MyPosts';

const Main = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/my-posts' element={<MyPosts />} />
            <Route path='/login' />
        </Routes>
    );
}

export default Main;
