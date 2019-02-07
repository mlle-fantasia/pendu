import React, {Component} from "react";
import services from "../services/services";
import App from '../App';

class Redemmarer extends Component {

    constructor(props) {
        super(props);
    }

    redemmarer(){
        console.log('coucou');
        this.props.redemmarer();
    }

    render() {
        return(
            <button className={`redemarer`} onClick={() => this.redemmarer()}> Commencer une nouvelle partie</button>
        );
    }

}
export default Redemmarer;