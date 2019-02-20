import React, { Component } from 'react';
import './css/App.css';
import AlphabetLettre from './components/AlphabetLettre';
import Canvas from './components/Canvas'
import { Stage } from 'react-konva';
import axios from "axios";
import Redemmarer from "./components/Redemmarer";
import Mot from "./components/Mot";
import { test, redemarrer, getDictionnaire } from "./services/ServicePendu";

const API = 'http://localhost:5001/';

const ALPHABET = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
// const service = ServicePendu;

class App extends Component {



    constructor(props) {
        super(props);
        this.redemarrer = this.redemarrer.bind(this);
        this.setPhraseCachee = this.setPhraseCachee.bind(this);
    }

    state = {
        mot: '',
        lettreDejaClickee: ['-'],
        // guesses: 0,
        gagne : false,
        essaisManques: 11,
        perdu : false,
        phraseCachee : '',
    };

 async componentDidMount() {
     this.state.mot = await getDictionnaire();
     console.log(this.state.mot);
  };

 // async getDictionnaire(){
 //     const {mot, lettreDejaClickee} = this.state;
 //     const response = await axios.get(API);
 //     console.log(response.data.mot);
 //     let Mot = response.data.mot;
 //     this.setState({mot: Mot});
 //     // this.formatMot(Mot);
 //     // this.computeDisplay(mot, lettreDejaClickee);
 // }

 //  formatMot(motRecu){
 //
 //      let phraseEnMajuscule = motRecu.toUpperCase();
 //      let phraseSansAccent;
 //      phraseSansAccent = this.removeAccents(phraseEnMajuscule);
 //      this.setState({mot: phraseSansAccent});
 // }
 //
 //    computeDisplay(phrase, usedLetters) {
 //        let newPhraseCachee;
 //        newPhraseCachee = phrase.replace(/\w/g,
 //            (letter) => (usedLetters.includes(letter) ? letter : ' __ ')
 //        );
 //        return newPhraseCachee;
 //    }
 //
 //    removeAccents(str){
 //        let accents    = ['À','Á','Â','Ã','Ä','Å','à','á','â','ã','ä','å','Ò','Ó','Ô','Õ','Õ','Ö','Ø','ò','ó','ô','õ','ö','ø','È','É','Ê','Ë','è','é','ê','ë','ð','Ç','ç','Ð','Ì','Í','Î','Ï','ì','í','î','ï','Ù','Ú','Û','Ü','ù','ú','û','ü','Ñ','ñ','Š','š','Ÿ','ÿ','ý','Ž','ž'];
 //        let accentsOut = ["A","A","A","A","A","A","a","a","a","a","a","a","O","O","O","O","O","O","O","o","o","o","o","o","o","E","E","E","E","e","e","e","e","e","C","c","D","I","I","I","I","i","i","i","i","U","U","U","U","u","u","u","u","N","n","S","s","Y","y","y","Z","z"];
 //        str = str.split('');
 //        let strLen = str.length;
 //        let i, x;
 //        for (i = 0; i < strLen; i++) {
 //            x = accents.indexOf(str[i]);
 //            if (x !== -1) {
 //                str[i] = accentsOut[x];
 //            }
 //        }
 //        return str.join('');
 //    }

    setFromLettre(lettreDejaClickeeRecu, essaisManquesRecu, gagneRecu){
        const state = { ...this.state};
    const newtab = lettreDejaClickeeRecu ;
    const newEssaisManques = essaisManquesRecu;
    this.setState({ lettreDejaClickee:newtab, essaisManques:newEssaisManques, gagne:gagneRecu });
}

    setPhraseCachee(phraseRecu){
     const state = { ...this.state};
     this.setState({ phraseCachee:phraseRecu });
    }

    //recuperer le this
     handleLettreClick = (e, lettre) => {
          const {mot, guesses, lettreDejaClickee, essaisManques} = this.state;
          // const newGuesses = guesses + 1;
          let newtab=lettreDejaClickee;
          newtab.push(lettre);
          const aGagne = this.state.phraseCachee === mot;
          this.setState({ lettreDejaClickee: newtab, gagne: aGagne });
            console.log(lettreDejaClickee);
          let tabPhrase = mot.split('');
          let indexTrouve = tabPhrase.indexOf(lettre);
          if(indexTrouve > -1) {
          }else{
             const newEssaiRestant = essaisManques -1;
             this.setState({ essaisManques: newEssaiRestant });
          }
          this.perdu();

     };


 // getEtat(lettre) {
 //  const {lettreDejaClickee} = this.state;
 //  let indexTrouve = lettreDejaClickee.indexOf(lettre);
 //   return indexTrouve > -1 ? 'dejaClickee' : 'jamaisClickee'
 // }

redemarrer(){
  const newGuesses =0;
  const newtab = [] ;
  const newGagne = false;
  const newPerdu = false;
  const newPhrase = this.getDictionnaire();
  const newEssaisManques = 11;

  this.setState({ lettreDejaClickee : newtab, guesses : newGuesses, gagne : newGagne, phrase : newPhrase, perdu : newPerdu, essaisManques : newEssaisManques});
}

perdu(){
    const {essaisManques} = this.state;
    if (essaisManques<2){
        this.setState({ perdu: true });
    }
}

gagneOuPerdu(){
    const {gagne,perdu} = this.state;

    if(gagne === true ){
        return  <div>
            <h1>Gagné !! </h1>
            <Redemmarer redemarrer={this.redemarer}/>
        </div>
    }else if(perdu === true){
        return  <div>
            <h1>Tu as perdu, retente ta chance ! </h1>
            <Redemmarer redemarrer={this.redemarer}/>
        </div>
    }
    else{
        return  ALPHABET.map((lettre, index) => (
            <AlphabetLettre
                // service = {service}
                onClick = {this.handleLettreClick.bind(this)}
                // modifierState = {this.setFromLettre}
                key={index}
                tabLettreCliquee = {this.state.lettreDejaClickee}
                lettre={lettre}
                // phraseCachee = {this.state.phraseCachee}
                // mot= {this.state.mot}
                // essaisManques= {this.state.essaisManques}
                // gagne = {this.state.gagne}
            />
        ))
    }
}

    rendreOuPas(){
        const {essaisManques} = this.state;
        // if(this.state.mot){
            console.log(this.state.lettreDejaClickee);
            return(
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Welcome to Pendu</h1>
                    </header>

                    <Mot mot={this.state.mot} tabLettre = {this.state.lettreDejaClickee} setPhraseCachee={this.setPhraseCachee} />

                    <div className="alphabet">
                        {this.gagneOuPerdu()}
                    </div>

                    <div className="dessin">
                        <Stage width={window.innerWidth} height={window.innerHeight}>
                            <Canvas essaiRestant = {essaisManques}/>
                        </Stage>
                    </div>
                </div>
            )
        // }
    }

     render() {
       return (
           <div>
                {this.rendreOuPas()}
           </div>
       );
     }


}

export default App;