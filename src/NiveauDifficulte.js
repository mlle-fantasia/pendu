import React, { Component } from 'react';
import './Difficulte.css';
import BtnNiveau from "./BtnNiveau";
import App from "./App";


const NIVEAU = [1,2,3,4];

class NiveauDifficulte extends Component {

    state = {
        niveau : null,
    };

    handleNiveauClick=(e,index)=>{

        let newNiveau = index;
        this.setState({niveau : newNiveau})
    };


    render(){
    const{niveau} = this.state;

        const btn = NIVEAU.map((niveau,index)=>(
            <BtnNiveau
                onClick={(e) => this.handleNiveauClick(e,niveau)}
                key={index}
                niveau={niveau}
            />
        ));

        const page = !niveau ? (
            <div className="niveauDifficulte">
            <div className="choisirDificulté" >
                <h1 className="">Choisissez votre difficulté !</h1>
            </div>
            <div className='alphabet'>
                {btn}
            </div>
        </div>
        ) :(
           <App niveau={niveau} />
        );

        return(
            page
        );
    }
}

export default NiveauDifficulte;