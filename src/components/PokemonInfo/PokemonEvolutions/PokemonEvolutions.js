import React, {useState, useEffect} from 'react';
import classes from './PokemonEvolutions.module.css';
import PokemonTypes from '../PokemonTypes/PokemonTypes';
import PokemonSprite from '../PokemonSprite/PokemonSprite';

const PokemonEvolutions = (props) => {

    const [preEvolution, setPreEvolution] = useState([]);
    const [middleEvolution, setMiddleEvolution] = useState([]);
    const [postEvolution, setPostEvolution] = useState([]);

    const [preEvolutionGroup, setPreEvolutionGroup] = useState([]);
    const [middleEvolutionGroup, setMiddleEvolutionGroup] = useState([]);
    const [postEvolutionGroup, setPostEvolutionGroup] = useState([]);

    let firstEvoArray = [];
    let middleEvoArray = [];
    let finalEvoArray = [];

    let firstStage = null;
    let secondStage = null;
    let thirdStage = null;
  

    useEffect(() => {

        /////////////////// Middle Evo and Final Evo Arrays asign////////////////////

        firstEvoArray.push(props.evolutionData.species)
        
        props.evolutionData.evolves_to.forEach(middle => {

            middleEvoArray.push(middle.species)
            
            middle.evolves_to.forEach(final => {

                finalEvoArray.push(final.species)

            })       
        })

        setPreEvolution(firstEvoArray)
        setMiddleEvolution(middleEvoArray);
        setPostEvolution(finalEvoArray)
       
    }, [props]);
    
    useEffect(() => {

        if(preEvolution[0]) {
            
            let preEvolutionId = preEvolution[0].url.split('/')[preEvolution[0].url.split('/').length-2];

            firstStage = (
                <div className={classes.EvolutionCard}>
                    <PokemonSprite 
                        pokemonId={preEvolutionId}
                        evolutionClicked={props.evolutionClicked} />
                    <p className={classes.PokeName}>{preEvolution[0].name}</p>
                    <PokemonTypes
                        pokemonId={preEvolutionId}
                        showDisadvantages={false}
                        typeClicked={(type)=>{props.typeClicked(type)}}
                    />
                </div>
            )
            setPreEvolutionGroup(firstStage)
        }

    },[preEvolution]);

    useEffect(() => {

        if(middleEvolution[0]) {

            secondStage = middleEvolution.map((pokeObj) => {

                let middleEvolutionId = pokeObj.url.split('/')[pokeObj.url.split('/').length-2];

                return (

                    <div className={classes.EvolutionCard}
                        key={pokeObj.name}>
                        <PokemonSprite
                            pokemonId={middleEvolutionId}
                            evolutionClicked={props.evolutionClicked} />
                        <p className={classes.PokeName}>{pokeObj.name}</p>
                        <PokemonTypes 
                            pokemonId={middleEvolutionId}
                            showDisadvantages={false}
                            typeClicked={(type)=>{props.typeClicked(type)}}
                        />
                    </div>
                )
            })

            setMiddleEvolutionGroup(secondStage)
        }

    },[JSON.stringify(middleEvolution)]);

    useEffect(() => {

        if(postEvolution[0]){
            
            thirdStage = postEvolution.map((pokeObj) => {

                let postEvolutionId = pokeObj.url.split('/')[pokeObj.url.split('/').length-2];

                return (

                    <div className={classes.EvolutionCard}
                        key={pokeObj.name}>
                        <PokemonSprite
                            pokemonId={postEvolutionId}
                            evolutionClicked={props.evolutionClicked} />
                        <p className={classes.PokeName}>{pokeObj.name}</p>

                        <PokemonTypes 
                            pokemonId={postEvolutionId}
                            showDisadvantages={false}
                            typeClicked={(type)=>{props.typeClicked(type)}}/>
                    </div>
                )
            })
            
            setPostEvolutionGroup(thirdStage)

        }

    },[postEvolution]);
    
    return(

        <div className={classes.PokemonEvolutionChain}>

            <div className={classes.PreContainer}>
                {preEvolutionGroup}
            </div>

            {middleEvolution[0] ? 
                <div>
                    <p className={classes.ArrowMargins}><i className={classes.ArrowDown}></i></p>
                    <div className={classes.MiddleContainer}>
                        {middleEvolutionGroup}
                    </div>
                </div>
            : null}

            {postEvolution[0] ?
                <div>
                    <p className={classes.ArrowMargins}><i className={classes.ArrowDown}></i></p>
                    <div className={classes.PostContainer}>
                        {postEvolutionGroup}
                    </div>
                </div>
            : null}

        </div>
    ) 

};

export default PokemonEvolutions;