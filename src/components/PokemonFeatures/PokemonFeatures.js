import React, {useState, useEffect} from 'react';
import classes from './PokemonFeatures.module.css';

const PokemonFeatures = (props) => {

    return(
        <div className={classes.FeaturesContainer}>
            <div className={classes.FeatureCards}>
                
                <div className={classes.PokedexCard} onClick={props.pokedexClicked}>
                    <img  className={classes.WhoIsThatPokemonLogo} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Me545FjV4CmwWPe0Fk2OHwi_fcIcbxvpYBZcjNT5RhtUKZL1'}/>
                    <span className={classes.FeatureText}>Enter Pokedex</span>
                </div>
                
                <div onClick={props.playWhoIsThatPokemon} className={classes.WhoIsThatPokemonCard}>
                    <img  className={classes.WhoIsThatPokemonLogo} src={'https://thetrepanier.github.io/word-guess-game/assets/images/pokeball.png'}/>
                    <span className={classes.FeatureText}>Who's that pokemon?</span>
                </div>

            </div>
        </div>
    )
};

export default PokemonFeatures;


