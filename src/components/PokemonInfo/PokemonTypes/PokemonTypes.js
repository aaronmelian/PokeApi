import React, {useState, useEffect} from 'react';
import classes from './PokemonTypes.module.css';
import Aux from '../../UI/AuxCont'

import PokemonTypeLabel from '../PokemonTypeLabel/PokemonTypeLabel';

import axios from 'axios';

const PokemonTypes = (props) => {
    const [pokemonTypesData, setPokemonTypesData] = useState(null);
    const [pokemonTypes, setPokemonTypes] = useState(null);

    const [pokeNameStyle, setPokeNameStyle] = useState(null);

    const [pokemonDamageRelations, setPokemonDamageRelations] = useState([]);

    const [fourXDamage, setFourXDamage] = useState([]);
    const [quarterXDamage, setQuarterXDamage] = useState([]);
    const [inmuneToDamage, setInmuneToDamage] = useState([]);
    const [twoXDamage, setTwoXDamage] = useState([]);
    const [halfXDamage, setHalfXDamage] = useState([]);

    let typeData = []

    let colors = {

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
    }

    useEffect(() => {
        if (pokemonTypesData) {
            let nameStyle = null;
            if(pokemonTypesData.length === 1) {
                nameStyle = {backgroundColor: colors[pokemonTypesData[0].type.name]}
            } else if (pokemonTypesData.length === 2) {

                nameStyle = {background: 'linear-gradient(to bottom right,' + colors[pokemonTypesData[0].type.name] + ',' + colors[pokemonTypesData[1].type.name] + ')'}
            }
            setPokeNameStyle(nameStyle)
        }
    }, [pokemonTypesData]);


    useEffect(() => {
        let types = null

        

        axios.get(`https://pokeapi.co/api/v2/pokemon/${props.pokemonId}/`).then(resp => {
        // setPokemonData(resp.data)
        types = resp.data && Object.entries(resp.data.types).map(obj => {
            let type = obj[1].type.name
            
            return <PokemonTypeLabel typeClicked={()=>{props.typeClicked(type)}} type={type} typeColor={colors[type]} key={type}/>

        })
        setPokemonTypes(types)
        setPokemonTypesData(resp.data.types)

        })
    }, [props]);


    let damageRelationsArray = [];

    useEffect(() => {

                                /////////////// GET TYPE DATA --- Functions /////////////////

        function getTypeData(obj) {

            return new Promise(resolve => {
                resolve(axios.get(obj.type.url));
            });
        }
    
        async function typeDataSetting(obj) {
            
            [typeData] = await Promise.all([getTypeData(obj)]);
            damageRelationsArray.push(typeData)

            setPokemonDamageRelations([...damageRelationsArray])

        }
                                /////////////// TYPE DATA --- get-Calls and Set /////////////////

        if (pokemonTypesData && props.showDisadvantages && pokemonDamageRelations) {

            pokemonTypesData.forEach(  async (obj) => {

                await typeDataSetting(obj);

            })
            
        }
        
    }, [pokemonTypesData]);

    let fourXDamageFrom = null;

    let quarterXDamageFrom = null;

    let inmuneToDamageFrom = null

    let doubleXDamageFrom = null

    let halfXDamageFrom = null


    useEffect(() => {

        if (pokemonTypesData && props.showDisadvantages && pokemonDamageRelations) {
         
            // 4 X Damage //

            let fourXDamageFromArray = []

            for (let i=0; i <= pokemonDamageRelations[0].data.damage_relations.double_damage_from.length; i++) {


                if(pokemonDamageRelations[0].data.damage_relations.double_damage_from[i]) {

                    if(pokemonDamageRelations[1]) {

                        for (let j=0; j <= pokemonDamageRelations[1].data.damage_relations.double_damage_from.length; j++) {


                            if(pokemonDamageRelations[1].data.damage_relations.double_damage_from[j]) {

                                if(pokemonDamageRelations[0].data.damage_relations.double_damage_from[i].name ===
                                pokemonDamageRelations[1].data.damage_relations.double_damage_from[j].name) {

                                    fourXDamageFromArray.push(pokemonDamageRelations[0].data.damage_relations.double_damage_from[i].name)

                                }
                            }
                        }
                    }
                }
            }

            fourXDamageFrom = fourXDamageFromArray.map(type => {
                
                    return <PokemonTypeLabel typeClicked={()=>{props.typeClicked(type)}} type={type} typeColor={colors[type]} key={type}/>

            })



            // Inmune to //
            let inmuneToDamageFromArray = [];

            pokemonDamageRelations.forEach(obj => {

                for (let i=0; i <= obj.data.damage_relations.no_damage_from.length; i++) {
                    
                    if (obj.data.damage_relations.no_damage_from[i]) {

                        inmuneToDamageFromArray.push(obj.data.damage_relations.no_damage_from[i].name)
                    }
                } 
                
            })

            inmuneToDamageFrom = inmuneToDamageFromArray.map(type => {

                return <PokemonTypeLabel typeClicked={()=>{props.typeClicked(type)}} type={type} typeColor={colors[type]} key={type}/>

            })

            // 1/4 X Resistance to //

            let quarterXDamageFromArray = [];

            for (let i=0; i <= pokemonDamageRelations[0].data.damage_relations.half_damage_from.length; i++) {

                if(pokemonDamageRelations[0].data.damage_relations.half_damage_from[i]) {
                    
                    if(pokemonDamageRelations[1]) {

                        for (let j=0; j <= pokemonDamageRelations[1].data.damage_relations.half_damage_from.length; j++) {


                            if(pokemonDamageRelations[1].data.damage_relations.half_damage_from[j]) {


                                if(pokemonDamageRelations[0].data.damage_relations.half_damage_from[i].name ===
                                pokemonDamageRelations[1].data.damage_relations.half_damage_from[j].name) {

                                    quarterXDamageFromArray.push(pokemonDamageRelations[0].data.damage_relations.half_damage_from[i].name)

                                }
                            }
                        }
                    }
                }
            }

            quarterXDamageFrom = quarterXDamageFromArray.map(type => {
                
                return <PokemonTypeLabel typeClicked={()=>{props.typeClicked(type)}} type={type} typeColor={colors[type]} key={type}/>

            })


            // 2 X Damage and 1/2 X Resistance to with Repeats //

            let doubleXDamageFromArrayWithRepeats = [];
            
            for (let i = 0; i < pokemonDamageRelations[0].data.damage_relations.double_damage_from.length; i++) {
                doubleXDamageFromArrayWithRepeats.push(pokemonDamageRelations[0].data.damage_relations.double_damage_from[i].name)
            }

            if(pokemonDamageRelations[1]) {

                for (let j = 0; j < pokemonDamageRelations[1].data.damage_relations.double_damage_from.length; j++) {
                    doubleXDamageFromArrayWithRepeats.push(pokemonDamageRelations[1].data.damage_relations.double_damage_from[j].name)
                }
            }


            let halfXDamageFromArrayWithRepeats = [];
            
            for (let i = 0; i < pokemonDamageRelations[0].data.damage_relations.half_damage_from.length; i++) {
                halfXDamageFromArrayWithRepeats.push(pokemonDamageRelations[0].data.damage_relations.half_damage_from[i].name)
            }

            if(pokemonDamageRelations[1]) {

                for (let j = 0; j < pokemonDamageRelations[1].data.damage_relations.half_damage_from.length; j++) {
                    halfXDamageFromArrayWithRepeats.push(pokemonDamageRelations[1].data.damage_relations.half_damage_from[j].name)
                }
            }

            // 2 X Damage //
            
            let doubleXDamageFromArray = doubleXDamageFromArrayWithRepeats.filter(function(x) { 
                return halfXDamageFromArrayWithRepeats.indexOf(x) < 0;
            });

            doubleXDamageFromArray = doubleXDamageFromArray.filter(function(x) { 
                return fourXDamageFromArray.indexOf(x) < 0;
            });

            doubleXDamageFromArray = doubleXDamageFromArray.filter(function(x) { 
                return inmuneToDamageFromArray.indexOf(x) < 0;
            });


            doubleXDamageFrom = doubleXDamageFromArray.map(type => {
                
                return <PokemonTypeLabel typeClicked={()=>{props.typeClicked(type)}} type={type} typeColor={colors[type]} key={type}/>

            })


            // 1/2 X Resistance //
            
            let halfXDamageFromArray = halfXDamageFromArrayWithRepeats.filter(function(x) { 
                return doubleXDamageFromArrayWithRepeats.indexOf(x) < 0;
            });

            halfXDamageFromArray = halfXDamageFromArray.filter(function(x) { 
                return quarterXDamageFromArray.indexOf(x) < 0;
            });

            halfXDamageFromArray = halfXDamageFromArray.filter(function(x) { 
                return inmuneToDamageFromArray.indexOf(x) < 0;
            });


            halfXDamageFrom = halfXDamageFromArray.map(type => {
                
                return <PokemonTypeLabel typeClicked={()=>{props.typeClicked(type)}} type={type} typeColor={colors[type]}    key={type}/>

            })
            
            setInmuneToDamage(inmuneToDamageFrom)
            setFourXDamage(fourXDamageFrom)
            setQuarterXDamage(quarterXDamageFrom);
            setTwoXDamage(doubleXDamageFrom)
            setHalfXDamage(halfXDamageFrom)

        }

    }, [pokemonDamageRelations]);

    return (

        <div className={classes.PokemonDamageRelationsContainer}>

            {!props.showDisadvantages ? 

                <Aux>
                    {props.pokeName ?<div className={classes.PokeName} style={pokeNameStyle}><span>{props.pokeName} </span></div>:null}
                    <div className={classes.TypesContainer}>
                        {pokemonTypes}
                    </div>
                </Aux>


                    
            : null}

            {props.showDisadvantages ?

                <div className={classes.PokemonDamageRelations}>
                    
                        <div className={classes.Card}>
                            <div className={classes.BoxTitle}>Types</div>
                            <div className={classes.DamageRelationCategory}>
                                <div className={classes.TypesContainer}>
                                    {pokemonTypes}
                                </div>
                            </div>
                        </div>

                    {twoXDamage.length > 0 ?
                        <div className={classes.Card}>
                            <div className={classes.BoxTitle}>Weakness (x2)</div>
                            <div className={classes.DamageRelationCategory}>
                                <div className={classes.TypesContainer}>
                                    {twoXDamage}
                                </div>
                            </div>
                        </div>
                    : null}

                    {fourXDamage.length > 0 ?
                        <div className={classes.Card}>
                            <div className={classes.BoxTitle}>Weakness (x4)</div>
                            <div className={classes.DamageRelationCategory}>
                                <div className={classes.TypesContainer}>
                                    {fourXDamage}
                                </div>
                            </div>
                        </div>
                    : null}


                    {halfXDamage.length > 0 ?
                        <div className={classes.Card}>
                            <div className={classes.BoxTitle}>Resistance (x1/2)</div>
                            <div className={classes.DamageRelationCategory}>
                                <div className={classes.TypesContainer}>
                                    {halfXDamage}
                                </div>
                            </div>
                        </div>
                    : null}


                    {quarterXDamage.length > 0 ?
                        <div className={classes.Card}>
                            <div className={classes.BoxTitle}>Resistance (x1/4)</div>
                            <div className={classes.DamageRelationCategory}>
                                 <div className={classes.TypesContainer}>
                                 {quarterXDamage}
                                </div>
                            </div>
                        </div>
                    : null}


                    {inmuneToDamage.length > 0 ?


                        <div className={classes.Card}>
                            <div className={classes.BoxTitle}>Inmune to</div>
                            <div className={classes.DamageRelationCategory}>
                                <div className={classes.TypesContainer}>
                                  {inmuneToDamage}
                                </div>
                            </div>
                        </div>

                    : null}

                </div>

            : null}

        </div>
        
    )
};

export default PokemonTypes;