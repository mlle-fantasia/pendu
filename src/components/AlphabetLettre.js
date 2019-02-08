import React, {Component} from 'react'
import '../css/AlphabetLettre.css'

class AlphabetLettre extends Component{
    constructor(props) {
        super(props);
    }

    getEtat(lettre) {
    	if(this.props.lettreDejaClickee){
            let indexTrouve = this.props.lettreDejaClickee.indexOf(lettre);
            return indexTrouve > -1 ? 'dejaClickee' : 'jamaisClickee';
		}
      	return 'jamaisClickee';
    }

    onClick(index){
    	this.props.onClick(index);
	}

    render(){
    	return(
            <button className={`lettre ${this.getEtat(this.props.lettre)}`} onClick={() => this.onClick(this.props.index)}>
                {this.props.lettre}
            </button>
		);
	}
}


export default AlphabetLettre