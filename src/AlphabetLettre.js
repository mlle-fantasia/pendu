import React from 'react'
import PropTypes from 'prop-types'
import './AlphabetLettre.css'

const AlphabetLettre = ({ lettre, etat, index, onClick }) => ( 
   <button className={`lettre ${etat}`} onClick={() => onClick(index)}>
   		{lettre}
   </button>
);

AlphabetLettre.defaultProps = {
  etat: 'jamaisClickee'
};

AlphabetLettre.propTypes={
	lettre: PropTypes.string.isRequired,
	etat: PropTypes.oneOf([
		'dejaClickee',
		'jamaisClickee',
	]).isRequired,
	index : PropTypes.number,
	onClick: PropTypes.func.isRequired,
};

export default AlphabetLettre;