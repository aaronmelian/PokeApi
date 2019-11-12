import React from 'react';
import classes from './PokemonCard.module.css'
import ProgressiveImage from '../UI/ProgressiveImage/ProgressiveImage'

const PokemonCard = (props) => {
    
    let dexNumber = props.dexNumber
    let spriteId = '' + props.dexNumber;
    while (spriteId.length < 3) {
        spriteId = '0' + spriteId;
    }

    let typeIconSrc;
    if (props.showingType) {
        switch (props.showingType) {
            case 'bug':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/7/7d/Bug.png/revision/latest/scale-to-width-down/62?cb=20161013132753'
            break;

            case 'dark':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/0/0e/Dark.png/revision/latest/scale-to-width-down/62?cb=20161013132800'
            break;

            case 'dragon':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/c/c7/Dragon.png/revision/latest/scale-to-width-down/62?cb=20161013132807'
            break;

            case 'electric':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/2/2f/Electric.png/revision/latest/scale-to-width-down/62?cb=20161013132813'
            break;

            case 'fairy':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/4/43/Fairy.png/revision/latest/scale-to-width-down/62?cb=20161013132820'
            break;

            case 'fighting':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/3/30/Fighting.png/revision/latest/scale-to-width-down/62?cb=20161013132827'
            break;

            case 'fire':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/3/30/Fire.png/revision/latest/scale-to-width-down/62?cb=20161013132833'
            break;

            case 'flying':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/7/7f/Flying.png/revision/latest/scale-to-width-down/62?cb=20161013132839'
            break;

            case 'ghost':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/a/ab/Ghost.png/revision/latest/scale-to-width-down/62?cb=20161013132847'
            break;

            case 'grass':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/c/c5/Grass.png/revision/latest/scale-to-width-down/62?cb=20161013132855'
            break;

            case 'ground':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/8/8f/Ground.png/revision/latest/scale-to-width-down/62?cb=20161013132902'
            break;

            case 'ice':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/7/77/Ice.png/revision/latest/scale-to-width-down/62?cb=20161013132908'
            break;

            case 'normal':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/f/fb/Normal.png/revision/latest/scale-to-width-down/62?cb=20161013132914'
            break;

            case 'poison':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/0/05/Poison.png/revision/latest/scale-to-width-down/62?cb=20161013133014'
            break;

            case 'psychic':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/2/21/Psychic.png/revision/latest/scale-to-width-down/62?cb=20161013133006'
            break;

            case 'rock':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/0/0b/Rock.png/revision/latest/scale-to-width-down/62?cb=20161013133022'
            break;

            case 'steel':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/c/c9/Steel.png/revision/latest/scale-to-width-down/62?cb=20161013133029'
            break;

            case 'water':
                typeIconSrc = 'https://vignette.wikia.nocookie.net/pokemongo/images/9/9d/Water.png/revision/latest/scale-to-width-down/62?cb=20161013133222'
            break;

        }
    }




    return (

        dexNumber <= 807 ?

        <div className={classes.PokemonCard} onClick={props.clicked} style={props.showCursor ? {cursor: 'pointer'} : null}>


            <div className={classes.PokeSpriteContainer}>
                <div className={classes.PokeSprite}>
                    <ProgressiveImage
                        image={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${spriteId}.png`}
                        alt={props.name}
                    />
                </div>

                {/* <img alt={props.name} className={classes.PokeSprite} src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${spriteId}.png`} /> */}
            </div>




            <div className={classes.IdAndTypeContainer}>
                <span className={classes.PokemonNumber}>{'N.º' + spriteId} </span>
                <img className={classes.TypeIcon} src={typeIconSrc}/>
            </div>
            


            <div className={classes.PokeNameAndSprite}>
                
                {/* <img alt={props.name} className={classes.PokeSmallSprite} src={`https://www.pkparaiso.com/imagenes/pokedex/sm-icons/${spriteId}.png`}/> */}
                <div className={classes.PokeSmallSprite}>
                    <ProgressiveImage
                        image={`https://www.pkparaiso.com/imagenes/pokedex/sm-icons/${spriteId}.png`}
                        alt={props.name}
                    />
                </div>
                <p className={classes.PokeName}>{props.name}</p>

            </div>
            
        </div>

        : <div></div>

        
    )

};

export default PokemonCard;
