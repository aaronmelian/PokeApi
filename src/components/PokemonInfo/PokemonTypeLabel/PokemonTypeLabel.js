import React from 'react'
import classes from './PokemonTypeLabel.module.css'

const PokemonTypeLabel = (props) => (
    <p onClick={()=>{props.typeClicked(props.type)}} className={classes[props.type] + " " + classes.Text}>{props.type}</p>
);

export default PokemonTypeLabel