import React, {useState, useEffect} from 'react';
import classes from './PokemonDetailCard.module.css';
import PokemonTypes from '../PokemonTypes/PokemonTypes';
import ProgressiveImage from '../../UI/ProgressiveImage/ProgressiveImage'


const PokemonDetailCard = (props) => {
    const [pokemonId, setPokemonId] = useState(props.dexNumber);
    const [pokemonName, setPokemonName] = useState(props.name);
    const [pokemonTypesNames, setPokemonTypesNames] = useState();
    const [pokemonStats, setPokemonStats] = useState(props.stats);

    let dexNumber = props.dexNumber
    let spriteId = '' + props.dexNumber;
    while (spriteId.length < 3) {
        spriteId = '0' + spriteId;
    }

    const colors = {

        normal: '#A8A77A',
        fire:  '#EE8130',
        water:  '#6390F0',
        electric:  '#F7D02C',
        grass:  '#7AC74C',
        ice:  '#96D9D6',
        fighting:  '#C22E28',
        poison:  '#A33EA1',
        ground:  '#E2BF65',
        flying:  '#A98FF3',
        psychic:  '#F95587',
        bug:  '#A6B91A',
        rock:  '#B6A136',
        ghost:  '#735797',
        dragon:  '#6F35FC',
        dark:  '#705746',
        steel:  '#B7B7CE',
        fairy:  '#D685AD'
        
    };

    const statNames = ['HP', 'ATK', 'DEF', 'SP.ATK', 'SP.DEF', 'SPD']
    const statColors = ['#ff5959', '#f5ac78', '#fae078', '#9db7f5', '#a7db8d', '#fa92b2']

    let cardStyle = {}
    let nameStyle = {}

    if(pokemonTypesNames) {
        
        if(pokemonTypesNames.length === 1) {
            cardStyle = {
                // background: `${colors[pokemonTypesNames[0]]}`
                background: 'linear-gradient(to bottom right,' + colors[pokemonTypesNames[0]] + ',black)'

                
            }
            nameStyle = {
                color: `${colors[pokemonTypesNames[0]]}`
            }
        } else if(pokemonTypesNames.length === 2) {
            cardStyle = {
                background: 'linear-gradient(to bottom right,' + colors[pokemonTypesNames[0]] + ',' + colors[pokemonTypesNames[1]] + ')'
            }
            nameStyle = {
                color: `${colors[pokemonTypesNames[1]]}`
            }
        }

    }

    const pokemonStatsArray = pokemonStats.slice(0).reverse().map((stat,i) => {
        return (
            <div className={classes.Stat} style={{color: `${statColors[i]}`}} key={statNames[i]}>
                <p className={classes.StatName}>{statNames[i]}</p>
                <p className={classes.StatNumber}>{stat.base_stat}</p>
            </div>
        )
    })

    const loadCard = () => {

        let typeNames = []
        props.types.forEach(type => {
            typeNames.push(type.type.name)
        })
        setPokemonTypesNames(typeNames)
        setPokemonId(props.dexNumber);
        setPokemonName(props.name);
        setPokemonStats(props.stats)
    }
    
    useEffect(() => {
        loadCard();
    }, [props]);

    return(

        
        <div className={classes.PokemonDetailCardContainer}>
                    <div className={classes.Card} style={cardStyle}>

                        <div className={classes.Frame}>
                            <div className={classes.PokeSpriteContainer}>
                                <ProgressiveImage
                                    image={'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'+ spriteId +'.png'}
                                    alt={`Pokemon number ${pokemonId}`}
                                />
                            </div>
                        </div>
                        
                        
                        <div className={classes.TextBox}>
                            <p className={classes.PokemonId} style={nameStyle}>#{pokemonId}</p>
                            <p className={classes.PokemonName}>{pokemonName}</p>
                            <div className={classes.PokemonTypes}>
                                <PokemonTypes
                                    pokemonId={pokemonId}
                                    showDisadvantages={false}
                                    typeClicked={(type) => {props.typeClicked(type)}}
                                />
                            </div>
                            <div className={classes.StatsContainer}>
                                {pokemonStatsArray}
                            </div>
                        </div>
                    </div>
        </div>

    )

};

export default PokemonDetailCard;


