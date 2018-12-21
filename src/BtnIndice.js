import React from 'react'
import PropTypes from 'prop-types'


const BtnIndice = ({ onClick}) => (
    <button  onClick={() => onClick()}>
        Indice
    </button>
);


BtnIndice.propTypes={
    onClick: PropTypes.func.isRequired,
};

export default BtnIndice;