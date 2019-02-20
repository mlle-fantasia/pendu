import axios from "axios";
import {Component} from "react";

const API = 'http://localhost:5001/';


export function test() {
    console.log('test service : le service fonctionne');
};

export function redemarrer(){
    console.log('test service : methode redemarrer ok');
}

export async function getDictionnaire(){
    const response = await axios.get(API);
    console.log(response.data.mot);
    let Mot = response.data.mot;
    return Mot;
}


class ServicePendu extends Component{

    API = 'http://localhost:5001/';
    mot = '';

    constructor(props) {
        super(props);
    }
    

    computeDisplay(phrase, usedLetters){
        let newPhraseCachee;
        newPhraseCachee = phrase.replace(/\w/g,
            (letter) => (usedLetters.includes(letter) ? letter : ' __ ')
        );
        return newPhraseCachee;
    }

    async getMot(){
        const response = await axios.get(this.API);
        console.log(response.data.mot);
        const Mot = response.data.mot;
        return Mot ;
    }



}
export default ServicePendu;