import React from 'react';
import '../styles/Home.css';
import {Button} from "@mui/material";

function Home() {
    return (
        <div className="Home">
            <header className="App-header">
                <Button variant="contained">Generate file</Button>
            </header>
        </div>
    );
}

export default Home;
