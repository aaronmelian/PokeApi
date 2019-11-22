import React from 'react'
import classes from './PokemonTypeLabel.module.css'

const PokemonTypeLabel = (props) => (
    <p onClick={()=>{props.typeClicked(props.type)}} style={{backgroundColor: props.typeColor}}className={classes[props.type] + " " + classes.Text}>{props.type}</p>
);

export default PokemonTypeLabel