import React, {Component} from "react";
import services from "../services/services";
import App from '../App';

class Redemmarer extends Component {

    constructor(props) {
        super(props);
    }

    redemarrer(){
        console.log('coucou');
        this.props.redemarrer();
    }

    render() {
        return(
            <button className={`redemarer`} onClick={() => this.redemarrer()}> Commencer une nouvelle partie</button>
        );
    }

}
export default Redemmarer;