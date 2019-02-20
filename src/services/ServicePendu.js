import axios from "axios";



class ServicePendu {

    private API = 'http://localhost:5001/';
    public mot : string;

    test() {
        console.log('test service : le service fonctionne');
    };

    redemarrer(){

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