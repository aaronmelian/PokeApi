import React from 'react';
import classes from './PokemonMeasurements.module.css';

const PokemonMeasurements = (props) => {

    let pokeHeight = (props.height * 0.1).toFixed(1)
    let pokeWeight = (props.weight * 0.1).toFixed(1)
    let pokeColor = props.pokeColor
    let pokeHabitat = props.pokeHabitat

    return(

        <div className={classes.PokemonMeasurements}>

            {pokeHabitat?
            <div className={classes.CategoryContainer}>
                <p className={classes.Category}>Habitat</p>
                <p className={classes.Property}>{pokeHabitat.name}</p>
            </div>
            : null}

            {pokeColor ?
            <div className={classes.CategoryContainer}>
                <p className={classes.Category}>Color</p>
                <p className={classes.Property}>{pokeColor.name}</p>
            </div>
            : null}

            {pokeHeight ?
            <div className={classes.CategoryContainer}>
                <p className={classes.Category}>Height</p>
                <p className={classes.Property}>{pokeHeight}<span className={classes.Unit}> m</span></p>
            </div>
            : null}

            {pokeWeight ?
            <div className={classes.CategoryContainer}>
                <p className={classes.Category}>Weight</p>
                <p className={classes.Property}>{pokeWeight}<span className={classes.Unit}> kg</span></p>
            </div>
            : null}

        </div>
    ) 

};

export default PokemonMeasurements;