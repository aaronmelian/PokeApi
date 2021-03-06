import React from 'react';
import classes from './PokemonSprite.module.css'
import ProgressiveImage from '../../UI/ProgressiveImage/ProgressiveImage'


const PokemonSprites = (props) => {

        let spriteId = '' + props.pokemonId;
        while (spriteId.length < 3) {
            spriteId = '0' + spriteId;
        }

        let borderStyle = null;

        // linear-gradient(to right bottom, rgb(238, 129, 48), black);

    return (
        <div className={classes.SpritesContainerBorder} style={borderStyle} onClick={props.evolutionClicked}>
            <div className={classes.SpritesContainer} onClick={props.evolutionClicked}>
                <ProgressiveImage
                    image={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${spriteId}.png`}
                    alt={`Pokemon number ${props.pokemonId}`}
                    preview={'https://via.placeholder.com/215'}
                />
            </div>
        </div>
    )

};

export default PokemonSprites;