import React, { Component } from 'react';
import './App.css';
import AlphabetLettre from './AlphabetLettre';
import GuessCount from './GuessCount'
import dictionnaire from './dictionnaire.json';

const ALPHABET = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

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

  return dictionnaire[randomIntFromInterval(0, dictionnaire.length)];
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
      <h1>Gagné !! </h1>
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
  let newPhraseCachee = phrase.replace(/\w/g,
    (letter) => (usedLetters.includes(letter) ? letter : ' __ ')
  )
  return newPhraseCachee;
 }


}

export default App;