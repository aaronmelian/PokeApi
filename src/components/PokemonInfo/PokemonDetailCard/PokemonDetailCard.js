import React, {useState, useEffect} from 'react';
import classes from './PokemonDetailCard.module.css';
import PokemonTypes from '../PokemonTypes/PokemonTypes';
import ProgressiveImage from '../../UI/ProgressiveImage/ProgressiveImage'


const PokemonDetailCard = (props) => {
    const [pokemonId, setPokemonId] = useState(props.dexNumber);
    const [pokemonName, setPokemonName] = useState(props.name);
    const [pokemonStats, setPokemonStats] = useState(props.stats);

    let spriteId = '' + props.dexNumber;
    while (spriteId.length < 3) {
        spriteId = '0' + spriteId;
    }

    const statNames = ['HP', 'ATK', 'DEF', 'SP.ATK', 'SP.DEF', 'SPD']
    const statColors = ['#ff5959', '#f5ac78', '#fae078', '#9db7f5', '#a7db8d', '#fa92b2']

    let cardStyle = {background: 'linear-gradient(to bottom right,' + props.pokemonColors[0] + ',' + props.pokemonColors[1] + ')'}
    let nameStyle = {color: `${props.pokemonColors[1]}`}
    if(props.pokemonColors[1] === 'black') {
        nameStyle = {
            color: `${props.pokemonColors[0]}`
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


