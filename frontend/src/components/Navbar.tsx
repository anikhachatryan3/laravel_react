import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

function Navbar() {
    let navigate = useNavigate();

    const navToHome = () => {
        let path = `/`;
        navigate(path);
    }

    const navToMyPosts = () => {
        let path = `/my-posts`;
        navigate(path);
    }

    const navToLogin = () => {
        let path = `/login`;
        navigate(path);
    }

    return (
        <React.Fragment>
            <AppBar position="sticky" elevation={0}>
                <Toolbar className="toolbar">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Laravel React</Typography>
                    <Stack direction='row' spacing={2}>
                        <Button onClick={navToHome} color='inherit'>Home</Button>
                        <Button onClick={navToMyPosts} color='inherit'>My Posts</Button>
                        <Button onClick={navToLogin} color="inherit">Log In</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default Navbar;