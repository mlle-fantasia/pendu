import React, { Component } from 'react';
import './App.css';
import AlphabetLettre from './AlphabetLettre';
import GuessCount from './GuessCount'
import dictionnaire from './dictionnaire.json';

const ALPHABET = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

class App extends Component {

  state = {
    phrase : this.generatePhrase(),
    lettreDejaClickee: [],
    guesses: 0,
    gagne : false,
 }

 generatePhrase(){
   function randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

  let phrase = dictionnaire[randomIntFromInterval(0, dictionnaire.length)];
  let phraseEnMajuscule = phrase.toUpperCase();
  let phraseSansAccent;
     phraseSansAccent = this.removeAccents(phraseEnMajuscule);
  return phraseSansAccent;
 }



 //recuperer le this
 handleLettreClick = (e, kettre) => {
  const {phrase, guesses, lettreDejaClickee} = this.state
  const newGuesses = guesses + 1
  let newtab=lettreDejaClickee;
  newtab.push(kettre);
  const aGagne = this.computeDisplay(phrase, newtab) === phrase;
  this.setState({ lettreDejaClickee: newtab, guesses: newGuesses, gagne: aGagne });
  
  if(aGagne) {
    console.log('ouaaaaais');
    return;
  }
    console.log('non');
  
 }


 getEtat(lettre) {
  const {lettreDejaClickee} = this.state
    
  let indexTrouve = lettreDejaClickee.indexOf(lettre)

   return indexTrouve > -1 ? 'dejaClickee' : 'jamaisClickee'
  
 }

redemarer(){
  const {} = this.state
  const newGuesses =0;
  const newtab = [] ;
  const newGagne = false;
  const newPhrase = this.generatePhrase();

  this.setState({ lettreDejaClickee : newtab, guesses : newGuesses, gagne : newGagne, phrase : newPhrase });
}

 render() {
   const {gagne, guesses,  phrase, lettreDejaClickee} = this.state
   const aGagne = !gagne ? (
      ALPHABET.map((lettre, index, etat) => (
          <AlphabetLettre 
          gagne={false}
          onClick={(e) => this.handleLettreClick(e, lettre)}
          etat = {this.getEtat(lettre)}
          key={index}
          lettre={lettre}/>

        ))
    ):(
    <div>
      <h1>Gagné !! </h1>
      <button className={`redemarer`} onClick={() => this.redemarer()}> Commencer une nouvelle partie</button>
    </div>
    )
   return (
  <div className="App">
   <header className="App-header">
    <h1 className="App-title">Welcome to Pendu</h1>
   </header>
   <div className="phrase" >
    {this.computeDisplay(phrase, lettreDejaClickee)}
   </div>
   <GuessCount guesses={guesses} />

       <div className="alphabet">
        {aGagne}
       </div>

  </div>
   );
 }

 computeDisplay(phrase, usedLetters) {
  let newPhraseCachee;
  newPhraseCachee = phrase.replace(/\w/g,
    (letter) => (usedLetters.includes(letter) ? letter : ' __ ')
  );
    return newPhraseCachee;
 }

  removeAccents(str){
        let accents    = ['À','Á','Â','Ã','Ä','Å','à','á','â','ã','ä','å','Ò','Ó','Ô','Õ','Õ','Ö','Ø','ò','ó','ô','õ','ö','ø','È','É','Ê','Ë','è','é','ê','ë','ð','Ç','ç','Ð','Ì','Í','Î','Ï','ì','í','î','ï','Ù','Ú','Û','Ü','ù','ú','û','ü','Ñ','ñ','Š','š','Ÿ','ÿ','ý','Ž','ž'];
        let accentsOut = ["A","A","A","A","A","A","a","a","a","a","a","a","O","O","O","O","O","O","O","o","o","o","o","o","o","E","E","E","E","e","e","e","e","e","C","c","D","I","I","I","I","i","i","i","i","U","U","U","U","u","u","u","u","N","n","S","s","Y","y","y","Z","z"];
        str = str.split('');
        let strLen = str.length;
        let i, x;
        for (i = 0; i < strLen; i++) {
            x = accents.indexOf(str[i]);
            if (x != -1) {
                str[i] = accentsOut[x];
            }
        }
        return str.join('');
    }

}

export default App;