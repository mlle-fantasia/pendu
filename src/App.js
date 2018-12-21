import React, {Component} from 'react';
import './App.css';
import AlphabetLettre from './AlphabetLettre';
import BtnIndice from './BtnIndice'
// import GuessCount from './GuessCount';
import Canvas from './Canvas'
import {Stage} from 'react-konva';
import dictionnaire from './dictionnaire.json';


const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class App extends Component {


    state = {
        phrase: this.generatePhrase(),
        lettreDejaClickee: [],
        guesses: 0,
        gagne: false,
        essaisManques: 11,
        perdu: false,
    };

    genererParametresDifficulte() {
        let listeDifficultes = [
            {niveau: 1, min: 1, max: 8, malusParCoup: 1},
            {niveau: 2, min: 8, max: 250, malusParCoup: 1},
            {niveau: 3, min: 12, max: 250, malusParCoup: 1},
            {niveau: 4, min: 12, max: 250, malusParCoup: 2},
        ];

        let difficulte = {min: 0, max: 250, malusParCoup: 1};
        for (let i = 0; i < listeDifficultes.length; i++) {
            if (listeDifficultes[i].niveau === this.props.niveau) {
                difficulte = listeDifficultes[i];
                break;
            }
        }

        return difficulte;
    }

    generatePhrase() {
        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        const difficulte = this.genererParametresDifficulte();
        let phrase = dictionnaire[randomIntFromInterval(0, dictionnaire.length)];
        if (difficulte.min < phrase.length && phrase.length <= difficulte.max) {
            return phrase;
        }

        return this.generatePhrase();
    }


    //recuperer le this
    handleLettreClick = (e, kettre) => {
        const {phrase, guesses, lettreDejaClickee, essaisManques} = this.state;
        const difficulte = this.genererParametresDifficulte();
        const newGuesses = guesses + 1;
        let newtab = lettreDejaClickee;
        newtab.push(kettre);
        const aGagne = this.computeDisplay(phrase, newtab) === phrase;
        this.setState({lettreDejaClickee: newtab, guesses: newGuesses, gagne: aGagne});

        let tabPhrase = phrase.split('');
        let indexTrouve = tabPhrase.indexOf(kettre);
        if (indexTrouve > -1) {
        } else {
            const newEssaiRestant = essaisManques - difficulte.malusParCoup;
            this.setState({essaisManques: newEssaiRestant});
        }
        this.perdu();

    };


    getEtat(lettre) {
        const {lettreDejaClickee} = this.state;

        let indexTrouve = lettreDejaClickee.indexOf(lettre);

        if (this.props.niveau < 3) {
            return indexTrouve > -1 ? 'dejaClickee' : 'jamaisClickee'
        } else {
            return indexTrouve > -1 ? 'jamaisClickee' : 'jamaisClickee'
        }

    }

    handleIndiceClick = (e) => {
        const {phrase, lettreDejaClickee} = this.state;
        let tabPhrase = phrase.split('');

        tabPhrase.forEach(function (lettre) {
            console.log(lettre);
            if (lettreDejaClickee.indexOf(lettre) > -1) {
                let newtablettreDejaClickee = lettreDejaClickee.push(lettre);
                this.setState({lettreDejaClickee: newtablettreDejaClickee});
            }
        });
    };

    redemarer() {
        const newGuesses = 0;
        const newtab = [];
        const newGagne = false;
        const newPerdu = false;
        const newPhrase = this.generatePhrase();
        const newEssaisManques = 11;

        this.setState({lettreDejaClickee: newtab, guesses: newGuesses, gagne: newGagne, phrase: newPhrase, perdu: newPerdu, essaisManques: newEssaisManques});
    }

    perdu() {
        const {essaisManques} = this.state;
        if (essaisManques < 2) {
            this.setState({perdu: true});
        }
    }

    gagneOuPerdu() {
        const {gagne, perdu} = this.state;

        if (gagne === true) {
            return <div>
                <h1>Gagné !! </h1>
                <button className={`redemarer`} onClick={() => this.redemarer()}> Commencer une nouvelle partie</button>
            </div>
        } else if (perdu === true) {
            return <div>
                <h1>Tu as perdu, retente ta chance ! </h1>
                <button className={`redemarer`} onClick={() => this.redemarer()}> Commencer une nouvelle partie</button>
            </div>
        }
        else {
            const btnAlphabet = ALPHABET.map((lettre, index) => (
                <AlphabetLettre
                    gagne={false}
                    onClick={(e) => this.handleLettreClick(e, lettre)}
                    etat={this.getEtat(lettre)}
                    key={index}
                    lettre={lettre}/>
            ));
            if (this.props.niveau < 3) {
                return <div>
                    {btnAlphabet}
                    <BtnIndice
                        onClick={(e) => this.handleIndiceClick(e)}
                    />
                </div>
            } else {
                return <div>
                    {btnAlphabet}

                </div>
            }


        }
    }


    render() {
        const {phrase, lettreDejaClickee, essaisManques} = this.state;


        return (
            <div className="App">
                <div className="niveauChoisi">
                    Vous avez choisi le niveau de difficulté {this.props.niveau}
                </div>
                <div className="phrase">
                    {this.computeDisplay(phrase, lettreDejaClickee)}
                </div>

                {/*<GuessCount guesses={guesses} />*/}

                <div className="alphabet">
                    {this.gagneOuPerdu()}
                </div>

                <div className="dessin">
                    <Stage width={window.innerWidth} height={window.innerHeight}>
                        <Canvas essaiRestant={essaisManques}/>
                    </Stage>
                </div>

            </div>
        );
    }


    refactorPrsase(phrase) {

        let phraseEnMajuscule = phrase.toUpperCase();
        let phraseSansAccent;
        phraseSansAccent = this.removeAccents(phraseEnMajuscule);
        console.log(phraseSansAccent);
        return phraseSansAccent;
    }


    computeDisplay(phrase, usedLetters) {

        let phraserafactorisee = this.refactorPrsase(phrase);

        let newPhraseCachee;
        newPhraseCachee = phraserafactorisee.replace(/\w/g,
            (letter) => (usedLetters.includes(letter) ? letter : ' __ ')
        );
        console.log(newPhraseCachee);
        return newPhraseCachee;
    }

    removeAccents(str) {
        let accents = ['À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'à', 'á', 'â', 'ã', 'ä', 'å', 'Ò', 'Ó', 'Ô', 'Õ', 'Õ', 'Ö', 'Ø', 'ò', 'ó', 'ô', 'õ', 'ö', 'ø', 'È', 'É', 'Ê', 'Ë', 'è', 'é', 'ê', 'ë', 'ð', 'Ç', 'ç', 'Ð', 'Ì', 'Í', 'Î', 'Ï', 'ì', 'í', 'î', 'ï', 'Ù', 'Ú', 'Û', 'Ü', 'ù', 'ú', 'û', 'ü', 'Ñ', 'ñ', 'Š', 'š', 'Ÿ', 'ÿ', 'ý', 'Ž', 'ž'];
        let accentsOut = ["A", "A", "A", "A", "A", "A", "a", "a", "a", "a", "a", "a", "O", "O", "O", "O", "O", "O", "O", "o", "o", "o", "o", "o", "o", "E", "E", "E", "E", "e", "e", "e", "e", "e", "C", "c", "D", "I", "I", "I", "I", "i", "i", "i", "i", "U", "U", "U", "U", "u", "u", "u", "u", "N", "n", "S", "s", "Y", "y", "y", "Z", "z"];
        str = str.split('');
        let strLen = str.length;
        let i, x;
        for (i = 0; i < strLen; i++) {
            x = accents.indexOf(str[i]);
            if (x !== -1) {
                str[i] = accentsOut[x];
            }
        }
        return str.join('');
    }


}

export default App;

// if(this.props.niveau ===1 ){
//
// }else if(this.props.niveau === 2 ){
//
// }else if(this.props.niveau === 3 ){
//
// }else{
//
// }