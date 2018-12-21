import React, { Component } from 'react';
import './Difficulte.css';
import NiveauDifficulte from "./NiveauDifficulte";



class Difficulte extends Component {


render(){


    return(
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Welcome to Pendu with React.Js</h1>
            </header>
            <NiveauDifficulte/>
        </div>
    );
}
}

export default Difficulte;