import React, {useState, useEffect} from 'react';
import classes from './PokemonIngameSprites.module.css';
import ProgressiveImage from '../../UI/ProgressiveImage/ProgressiveImage'

const PokemonIngameSprites = (props) => {
    

    const [pokeSprites, setPokeSprites] = useState(props.pokeSprites);


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
                    <div key={obj.pokemon.name} className={classes.SpriteContainer  }>
                        {/* <img alt={obj.pokemon.name} className={classes.Sprite} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${megaEvolutionId}.png`}></img> */}
                        <div className={classes.Sprite}>
                            <ProgressiveImage
                                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${megaEvolutionId}.png`}
                                alt={obj.pokemon.name}
                            />
                        </div>
                        
                        <p className={classes.Name}>{obj.pokemon.name}</p>
                    </div>
                )
            }
        }
    })

    return(

        <div  className={classes.PokemonIngameSpritesContainer}>  
            
            {pokeSprites.front_default || pokeSprites.back_default || pokeSprites.front_shiny || pokeSprites.back_shiny ?
                <div className={classes.PokemonIngameSprites}>


                    {pokeSprites.front_default ?
                        <div className={classes.SpriteContainer}>
                            {/* <img alt={megaPokeData[0].pokemon.name + ' front'} className={classes.Sprite} src={pokeSprites.front_default}/> */}
                            <div className={classes.Sprite}>
                                <ProgressiveImage
                                    image={pokeSprites.front_default}
                                    alt={megaPokeData[0].pokemon.name + ' front'}
                                />
                            </div>
                            <p className={classes.Name}>{megaPokeData[0].pokemon.name}</p>
                        </div>
                    : null}

                    
                    {pokeSprites.back_default ?
                        <div className={classes.SpriteContainer}>
                            {/* <img alt={megaPokeData[0].pokemon.name + ' back'} className={classes.Sprite} src={pokeSprites.back_default}/> */}
                            <div className={classes.Sprite}>
                                <ProgressiveImage
                                    image={pokeSprites.back_default}
                                    alt={megaPokeData[0].pokemon.name + ' back'}
                                />
                            </div>
                            
                            <p className={classes.Name}>{megaPokeData[0].pokemon.name}</p>
                        </div>
                    : null}

                    {pokeSprites.front_shiny ?
                        <div className={classes.SpriteContainer}>
                            {/* <img alt={megaPokeData[0].pokemon.name + ' shiny-front'}className={classes.Sprite} src={pokeSprites.front_shiny}/> */}
                            <div className={classes.Sprite}>
                                <ProgressiveImage
                                    image={pokeSprites.front_shiny}
                                    alt={megaPokeData[0].pokemon.name + ' shiny-front'}
                                />
                            </div>

                            <p className={classes.Name}>{'Shiny-' + megaPokeData[0].pokemon.name}</p>
                        </div>
                    :null }


                    {pokeSprites.back_shiny ?
                    <div className={classes.SpriteContainer}>
                        {/* <img alt={megaPokeData[0].pokemon.name + ' shiny-back'} className={classes.Sprite} src={pokeSprites.back_shiny}/> */}
                        <div className={classes.Sprite}>
                            <ProgressiveImage
                                    image={pokeSprites.back_shiny}
                                    alt={megaPokeData[0].pokemon.name + ' shiny-back'}
                            />
                        </div>

                        <p className={classes.Name}>{'Shiny-' + megaPokeData[0].pokemon.name}</p>
                    </div>
                    :null }

                </div>
            : null}


            {megaPokeData[1] && isNotStrangeForm ? 

                <div>

                    <div className={classes.PokemonIngameSprites}>
                        <div className={classes.FixingCont}>
                            {megaEvos}
                        </div>
                    </div>

                </div>
                
            : null}
   
            
        </div>

    ) 

};

export default PokemonIngameSprites;



                                                  