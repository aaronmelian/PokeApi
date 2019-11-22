import React, {useState, useEffect} from 'react';
import classes from './PokemonIngameSprites.module.css';
import ProgressiveImage from '../../UI/ProgressiveImage/ProgressiveImage'
import Aux from '../../UI/AuxCont'
const PokemonIngameSprites = (props) => {

    const [pokeSprites, setPokeSprites] = useState(props.pokeSprites);
    const [typeIcons, setTypeIcons] = useState(null);

    useEffect(() => {

        setPokeSprites(props.pokeSprites);

    }, [props]);

    let megaPokeData = props.pokeMegaData;

    let isNotStrangeForm = null

    
    const megaEvos = megaPokeData.map((obj,i) => {

                    
        if(i>0 && i<megaPokeData.length && megaPokeData ) {

            isNotStrangeForm = megaPokeData[i].pokemon.name.includes('mega')

            if (isNotStrangeForm) {
                
            let megaEvolutionId = obj.pokemon.url.split('/')[obj.pokemon.url.split('/').length-2]
            return(
                <Aux key={obj.pokemon.name}>
                    <div className={classes.BoxTitleBottom}>{obj.pokemon.name}</div>
                    <div className={classes.InfoWindow} style={megaPokeData.length < 3 && window.innerWidth >= 992 ? {transform: 'translateY(50%)'} : null}>
                        <div className={classes.SpriteBox}>
                            <ProgressiveImage
                                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${megaEvolutionId}.png`}
                                alt={obj.pokemon.name}
                                preview={'https://via.placeholder.com/96'}
                            />
                        </div>
                    </div>
                </Aux>
                )
            }
        }
    })


    useEffect(() => {

    if (megaPokeData.length <= 2 && !isNotStrangeForm) {

        let typeIconSrc;
        let typeImgs = props.types.map(typeObj => {
            let typeName = typeObj.type.name

            switch (typeName) {
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

            return (
                <div className={classes.typeImg} key={typeName}>
                    <ProgressiveImage
                        image={typeIconSrc}
                        alt={typeName}
                        preview={'https://via.placeholder.com/62'}
                    />
                </div>
            )
        })

        setTypeIcons(typeImgs)

    }
    }, [props]);





    return(

        <div  className={classes.PokemonIngameSpritesContainer}>  

            {pokeSprites.front_default || pokeSprites.back_default || pokeSprites.front_shiny || pokeSprites.back_shiny ?
                <Aux>
                    {pokeSprites.front_default ?
                    
                        <div className={classes.Card}>

                            <div className={classes.BoxTitle}>{megaPokeData[0].pokemon.name}</div>
                            
                            <div className={classes.InfoWindow}>

                                <div className={classes.SpriteBox}>
                                    <ProgressiveImage
                                        image={pokeSprites.front_default}
                                        alt={megaPokeData[0].pokemon.name + ' front'}
                                        preview={'https://via.placeholder.com/96'}
                                    />
                                </div>

                                {pokeSprites.back_default ? 
                                    <Aux>
                                        <div className={classes.BoxTitleBottom}>{megaPokeData[0].pokemon.name}</div>
                                        <div className={classes.SpriteBox}>
                                            <ProgressiveImage
                                                image={pokeSprites.back_default}
                                                alt={megaPokeData[0].pokemon.name + ' back'}
                                                preview={'https://via.placeholder.com/96'}
                                            />
                                        </div>
                                    </Aux>
                                : null}

                            </div> 
                        </div>
                    : null}

                    {pokeSprites.front_shiny ?

                        <div className={classes.Card}>

                            <div className={classes.BoxTitle}>{'shiny ' + megaPokeData[0].pokemon.name}</div>

                            <div className={classes.InfoWindow}>
                                <div className={classes.SpriteBox}>
                                    <ProgressiveImage
                                        image={pokeSprites.front_shiny}
                                        alt={megaPokeData[0].pokemon.name + ' shiny-front'}
                                        preview={'https://via.placeholder.com/96'}
                                    />
                                </div>

                                {pokeSprites.back_shiny ?
                                    <Aux>
                                        <div className={classes.BoxTitleBottom}>{'shiny ' + megaPokeData[0].pokemon.name}</div>

                                        <div className={classes.SpriteBox}>
                                            <ProgressiveImage
                                                image={pokeSprites.front_shiny}
                                                alt={megaPokeData[0].pokemon.name + ' shiny-front'}
                                                preview={'https://via.placeholder.com/96'}
                                            />
                                        </div>
                                    </Aux>
                                : null}
                            </div>
                        </div>
                    :null}
                </Aux>
                    
            : null}

            {megaPokeData[1] && isNotStrangeForm ? 
                <div className={classes.Card}>
                    {megaEvos}
                </div>
            :
            <div className={classes.Card}>
                <div className={classes.BoxTitle}>Medal</div>

                <div className={classes.typeImgContainer}>
                    {typeIcons}
                </div>
            </div>
            }
        </div>

    ) 

};

export default PokemonIngameSprites;