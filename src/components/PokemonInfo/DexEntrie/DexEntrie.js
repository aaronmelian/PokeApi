import React, {useState, useEffect} from 'react';
import classes from './DexEntrie.module.css';


const DexEntrie = (props) => {

    const [dexEntrie, setDexEntrie] = useState([]);

    let pokeHeight = (props.height * 0.1).toFixed(1)
    let pokeWeight = (props.weight * 0.1).toFixed(1)
    let pokeColor = props.pokeColor
    let pokeHabitat = props.pokeHabitat

    let cardStyle = {background: 'linear-gradient(to bottom right,' + props.pokemonColors[0] + ',' + props.pokemonColors[1] + ')'}
    
    let categoryColor = props.pokemonColors[1] !== 'black' ? props.pokemonColors[1] : props.pokemonColors[0]

    useEffect(() => {
            
        const dexEntries = props.entries;
        let firstEnglishEntrie = null

        for ( let i=0; i < dexEntries.length; i++) {
            if (props.entries[i].language.name === 'en') {
                firstEnglishEntrie = props.entries[i].flavor_text
            }
        }
        let firstEnglishEntriePolished = firstEnglishEntrie.replace(/(\r\n|\n|\f|\r)/gm," ");
        let splitEntrie = firstEnglishEntriePolished.split(' ')

        let firstWords = splitEntrie.slice(0, splitEntrie.length-2)
        let lastWords = splitEntrie.slice(splitEntrie.length-2,splitEntrie.length)

        let arrayDiv = <div>{firstWords.join(' ')}<span style={{color: props.pokemonColors[0], fontSize: '115%'}}> {lastWords.join(' ')}</span></div>
        setDexEntrie(arrayDiv)

    }, [props]);


    return(
        
        <div className={classes.PokemonInfoBorderWrap}  style={cardStyle}>
            
            <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet"></link>
            <div className={classes.PokemonInfo}>
                
                <div className={classes.EntrieContainer}>
                    {dexEntrie}
                </div>

                {pokeHabitat?
                    <p className={classes.Category} style={{color: categoryColor}}>Habitat : <span className={classes.Property}>{pokeHabitat.name}</span></p>
                : null}

                {pokeColor ?
                <div className={classes.CategoryContainer}>
                    <p className={classes.Category} style={{color: categoryColor}}>Color : <span className={classes.Property}>{pokeColor.name}</span></p>
                </div>
                : null}

                {pokeHeight ?
                <div className={classes.CategoryContainer}>
                    <p className={classes.Category} style={{color: categoryColor}}>Height : <span className={classes.Property}>{pokeHeight}<span className={classes.Unit}> m</span></span></p>
                </div>
                : null}

                {pokeWeight ?
                <div className={classes.CategoryContainer}>
                    <p className={classes.Category} style={{color: categoryColor}}>Weight : <span className={classes.Property}>{pokeWeight}<span className={classes.Unit}> kg</span></span></p>
                </div>
                : null}
                
            </div>
        </div>
    ) 

};

export default DexEntrie;