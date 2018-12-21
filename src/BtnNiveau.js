import React from 'react'
import PropTypes from 'prop-types'


const BtnNiveau = ({ niveau, index, onClick}) => (
    <button  onClick={() => onClick(niveau)}>
        niveau {niveau}
    </button>
);


BtnNiveau.propTypes={
    niveau: PropTypes.number.isRequired,
    index : PropTypes.number,
    onClick: PropTypes.func.isRequired,
};

export default BtnNiveau;