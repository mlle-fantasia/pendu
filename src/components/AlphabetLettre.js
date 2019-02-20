import React, {Component} from 'react'
import '../css/AlphabetLettre.css'

class AlphabetLettre extends Component{
    constructor(props) {
        super(props);
        console.log(this.props);

    }

    state = {
        // service : this.props.service,
        mot: this.props.mot,
        lettreDejaClickee: this.props.lettreDejaClickee,
        gagne : this.props.gagne,
        essaisManques:this.props.essaisManques,
        phraseCachee : this.props.phraseCachee,
    };

    // shouldComponentUpdate(){
    // 	this.props.modifierState(this.state.lettreDejaClickee, this.state.essaisManques, this.state.gagne)
	// }

    getEtat(lettre) {
    	if(this.props.lettreDejaClickee){
            let indexTrouve = this.props.lettreDejaClickee.indexOf(lettre);
            return indexTrouve > -1 ? 'dejaClickee' : 'jamaisClickee';
		}
      	return 'jamaisClickee';
    }

    // //recuperer le this
    // handleLettreClick = (e, lettre) => {
    // 	console.log(this.state.lettreDejaClickee);
	//
    //     let newtab = this.props.lettreDejaClickee;
    //     newtab.push(lettre);
	//
    //     const aGagne = this.state.phraseCachee === this.props.mot;
	//
    //     let tabPhrase = this.props.mot.split('');
    //     let indexTrouve = tabPhrase.indexOf(lettre);
    //     // if(indexTrouve === -1) {
    //         let newEssaiRestant = this.props.essaisManques -1;
    //     // }
    //     this.setState({lettreDejaClickee:newtab, essaisManques:newEssaiRestant, gagne:aGagne});
	//
    // };

    onClick=(e,lettre)=>{
    	this.props.onClick(e,lettre);
	};

    render(){
    	return(
            <button className={`lettre ${this.getEtat(this.props.lettre)}`} onClick={(e) => this.onClick(e, this.props.lettre)}>
                {this.props.lettre}
            </button>
		);
	}
}


export default AlphabetLettre