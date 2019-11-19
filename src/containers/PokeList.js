import React, {Component} from 'react'
import axios from 'axios'


import classes from './PokeList.module.css'

import PokemonCard from '../components/PokemonCard/PokemonCard'

import NavBar from '../components/UI/NavBar/NavBar'
import PokemonFeatures from '../components/PokemonFeatures/PokemonFeatures'

import PokePagination from '../components/UI/PokePagination/PokePagination'

import PokePerPageSelector from '../components/UI/PokePerPageSelector/PokePerPageSelector'
import Spinner from '../components/UI/Spinner/Spinner'

import NextPokemonButton from '../components/UI/NextPokemonButton/NextPokemonButton'
import PokemonDetailCard from '../components/PokemonInfo/PokemonDetailCard/PokemonDetailCard'
import PokemonEvolutions from '../components/PokemonInfo/PokemonEvolutions/PokemonEvolutions'
import PokemonMeasurements from '../components/PokemonInfo/PokemonMeasurements/PokemonMeasurements'
import PokemonIngameSprites from '../components/PokemonInfo/PokemonIngameSprites/PokemonIngameSprites'
import DexEntrie from '../components/PokemonInfo/DexEntrie/DexEntrie'
import PokemonTypes from '../components/PokemonInfo/PokemonTypes/PokemonTypes'

import WhoIsThatPokemon from '../components/WhoIsThatPokemon/WhoIsThatPokemon'



class PokeList extends Component {

    state = {
        lastPokeEver: 807,

        showSpinner: false,

        pokemon: null,
        lastPokeOnList: 807,
        pokePage: 1,
        pokePerPage: 50,

        showingType: null,
        allPokeFromType: null,

        selectedPokemon: null,
        selectedPokemonId: null,
        selectedPokemonColor: null,
        selectedPokemonHabitat: null,
        selectedPokemonSprites: null,
        selectedPokemonMega: null,
        selectedPokemonEntries: null,
        selectedPokemonTypes: null,
        selectedPokemonStats: null,

        evolutions: null,

        searchData: null,
        searchDataError: null,
        showSearchInput: false,

        showPokedex: null,
        playingWhoIs: false
    }
    
    goHomeHandler() {
        this.setState({

            showSpinner: false,

            showingType: null,
            allPokeFromType: null,

            pokemon: null,
            pokePage: 0,

            pokemon: null,
            lastPokeOnList: 807,
            pokePage: 1,

            selectedPokemon: null,
            selectedPokemonId: null,
            selectedPokemonColor: null,
            selectedPokemonHabitat: null,
            selectedPokemonSprites: null,
            selectedPokemonMega: null,
            selectedPokemonEntries: null,
            selectedPokemonTypes: null,
            selectedPokemonStats: null,

            evolutions: null,

            searchData: null,
            searchDataError: null,
            showSearchInput: false,

            showPokedex: null,
            playingWhoIs: false


        });
    }

    pokedexClickedHandler() {
        this.setState({showPokedex: true});
        this.nextPokemonPage(this.state.pokePerPage)
    }

    whoIsThatPokemonClickedHandler() {
        this.setState({playingWhoIs: true});
    }

    pokemonPerPageHandler (numberPerPage) {
        
        this.setState({pokePerPage: numberPerPage})

        if(!this.state.showingType) {
            this.nextPokemonPage(numberPerPage)

        } else {
            this.nextTypePokemonPage(numberPerPage);
        }
        
    }

    searchToggleHandler() {

        this.setState({searchDataError: false}) ///Al cambiar

        if (this.state.showSearchInput) {
            this.setState({showSearchInput: false})

        }
         else if (!this.state.showSearchInput) {
            this.setState({showSearchInput: true}) ///Al cambiar
        }
    }

    searchPokemonHandler(toSearch) {

        const pokeUrl = 'https://pokeapi.co/api/v2/pokemon/' + toSearch;
        this.pokemonClickedHandler(pokeUrl);
        this.setState({
            searchData: toSearch,
            searchDataError: null,
            showPokedex: true,
        });

    }

    pokemonSearchErrorHandler() {
        this.setState({searchDataError: this.state.searchData, showSpinner: false});
    }


    paginationPageClickedHandler(pageClickedNumber) {
        if(!this.state.showingType) {
            this.nextPokemonPage(null, pageClickedNumber);
        } else {
            this.nextTypePokemonPage(null, pageClickedNumber);
        }
    }

    typeClickedHandler (type) {
        this.setState({showingType: type, selectedPokemon: null, pokemon: null, pokePage: 1})
        // this.setState({showingType: type, selectedPokemon: null, pokemon: null, showSpinner:true, pokePage: 1})

        axios.get(`https://pokeapi.co/api/v2/type/${type}/`)
        .then(response => {

                let justNormalPokes = []  
                response.data.pokemon.forEach(pokemon => {
                let pokeId = pokemon.pokemon.url.split('/')[pokemon.pokemon.url.split('/').length-2];
                if(pokeId <= this.state.lastPokeEver) {
                    justNormalPokes.push(pokemon)
                }
            })
            const pokeDataSliced = justNormalPokes.slice(0,this.state.pokePerPage);
            const updatedPokemonList = pokeDataSliced.map(poke => {
                return {
                    ...poke,
                }
            });

            const lastPoke = justNormalPokes.length;
            this.setState({pokemon: updatedPokemonList, showSpinner: false, allPokeFromType: justNormalPokes, lastPokeOnList: lastPoke});

        })
        window.scrollTo(0, 0);
    }

    nextTypePokemonPage(numberPerPage, pageClickedNumber) {

        // this.setState({showSpinner: true});

        let beforePokePage = this.state.pokePage;

        if(numberPerPage) {
            beforePokePage = 0
        }

        if(pageClickedNumber) {
            beforePokePage = pageClickedNumber-1
        }

        let nextPokePage = beforePokePage + 1;

        let startingPoke = beforePokePage*(numberPerPage || this.state.pokePerPage)
        let endPoke = (beforePokePage+1)*(numberPerPage || this.state.pokePerPage)

        const pokeDataSliced = this.state.allPokeFromType.slice(startingPoke,endPoke);
        const updatedPokemonList = pokeDataSliced.map(poke => {
            return {
                ...poke,
            }
        });
            
        this.setState({pokemon: updatedPokemonList, showSpinner: false, pokePage: nextPokePage});
    }


    previousTypePokemonPage() {

        // this.setState({showSpinner: true});

        let beforePokePage = this.state.pokePage;

        let nextPokePage = beforePokePage - 1;

        let startingPoke = (beforePokePage-2)*this.state.pokePerPage
        let endPoke = (beforePokePage-1)*this.state.pokePerPage

        const pokeDataSliced = this.state.allPokeFromType.slice(startingPoke,endPoke);
        const updatedPokemonList = pokeDataSliced.map(poke => {
            return {
                ...poke,
            }
        });
            
        this.setState({pokemon: updatedPokemonList, showSpinner: false, pokePage: nextPokePage})
    }


    nextPokemonPage(numberPerPage, pageClickedNumber) {
        // this.setState({showSpinner: true});

        let beforePokePage = this.state.pokePage
        
        if(pageClickedNumber) {
            beforePokePage = pageClickedNumber-1
        }

        if(numberPerPage) {
            beforePokePage = 0
        }

        const nextPokePage = beforePokePage + 1;
        const offset = beforePokePage * this.state.pokePerPage

        axios.get('https://pokeapi.co/api/v2/pokemon?offset=' + offset + '&limit=' + (numberPerPage || this.state.pokePerPage))
        .then(response => {

            const pokeDataSliced = response.data.results.slice(0,this.state.pokePerPage);
            const updatedPokemonList = pokeDataSliced.map(poke => {
                return {
                    ...poke,
                }
            });
            
            this.setState({pokemon: updatedPokemonList, pokePage: nextPokePage, showSpinner: false});

        })

        window.scrollTo(0, 0);
    }

    previousPokemonPage() {
        // this.setState({showSpinner: true});

        const thisPokePage = this.state.pokePage;
        const previousPokePage = thisPokePage - 1;
        const offset = (previousPokePage -1)  * this.state.pokePerPage
        
        axios.get('https://pokeapi.co/api/v2/pokemon?offset=' + offset + '&limit=' + this.state.pokePerPage)
        .then(response => {

            const pokeDataSliced = response.data.results.slice(0,this.state.pokePerPage);
            const updatedPokemonList = pokeDataSliced.map(poke => {
                return {
                    ...poke,
                }
            });
            

            this.setState({pokemon: updatedPokemonList, pokePage: previousPokePage, showSpinner: false});

        });

        window.scrollTo(0, 0);
    }

    pokemonClickedHandler(url) {

        this.setState({showSpinner: true});

        axios.get(url).then(response => {
            // console.log(response)

        const clickedPokemon = response.data;
        const clickedPokemonId = response.data.id;
        const clickedPokemonSprites = response.data.sprites;
        const clickedPokemonTypes = response.data.types;
        const clickedPokemonStats = response.data.stats;

        
        

        if (clickedPokemon) {

            axios.get('https://pokeapi.co/api/v2/pokemon-species/' + clickedPokemonId +'/')
            .then(resp => {

                // console.log(resp)

                const clickedPokemonColor = resp.data.color;
                const clickedPokemonHabitat = resp.data.habitat;
                const clickedPokemonMega = resp.data.varieties;
                const clickedPokemonEntries = resp.data.flavor_text_entries

                if (resp.data.evolution_chain) {

                    axios.get(resp.data.evolution_chain.url)
                    .then(resp => {

                        this.setState({
                            
                            selectedPokemon: clickedPokemon,
                            selectedPokemonId: clickedPokemonId ,
                            selectedPokemonColor: clickedPokemonColor,
                            selectedPokemonHabitat: clickedPokemonHabitat,
                            selectedPokemonSprites: clickedPokemonSprites,
                            selectedPokemonMega: clickedPokemonMega,
                            selectedPokemonEntries: clickedPokemonEntries,
                            selectedPokemonTypes: clickedPokemonTypes,
                            selectedPokemonStats: clickedPokemonStats,

                            evolutions: resp.data.chain,

                            showSearchInput: false,

                            showSpinner: false


                        });
                    });
                }
            });
        }

        window.scrollTo(0, 0);

        }).catch(error => {
            this.pokemonSearchErrorHandler();
        });
    }

    evolutionClickedHandler (pokemonId) {

        const evoIndex = pokemonId.target.src.split('/')[pokemonId.target.src.split('/').length-1].split('.')[0];
        let newEvoId = evoIndex.replace(/^0+/, '')
        let currentId = this.state.selectedPokemonId + ''

        if (newEvoId === currentId) {
            return
        }
        const evoUrl = 'https://pokeapi.co/api/v2/pokemon/' + newEvoId;
        this.pokemonClickedHandler(evoUrl);
       
    }

  
    render() {
        let newPokemonList = []
        if (!this.state.showingType) {
            newPokemonList = this.state.pokemon && this.state.pokemon
            .map(poke => {
                const pokemonIndex = poke.url.split('/')[poke.url.split('/').length-2];
                return (
        
                    <PokemonCard 
                        showCursor={true}
                        key={poke.name}
                        name={poke.name}
                        clicked={() => this.pokemonClickedHandler(poke.url)}
                        dexNumber={pokemonIndex}
                        lastPokemon={this.state.lastPokeEver}
                    /> 
            
                )

            });
        } else {
                            ///// Display Pokemon Per Type /////
            newPokemonList = this.state.pokemon && this.state.pokemon
            .map(poke => {
                const pokemonIndex = poke.pokemon.url.split('/')[poke.pokemon.url.split('/').length-2];
                return (
        
                    <PokemonCard 
                        showCursor={true}
                        key={poke.pokemon.name}
                        name={poke.pokemon.name}
                        clicked={() => this.pokemonClickedHandler(poke.pokemon.url)}
                        dexNumber={pokemonIndex}
                        showingType={this.state.showingType}
                        lastPokemon={this.state.lastPokeEver}
                    /> 
            
                )

            });
        }

        let pokeDex = <Spinner/>

        if (!this.state.showSpinner) {
            pokeDex = 
            <section className={classes.Pokedex}>

                {!this.state.selectedPokemon ?
                <div>
                    <PokePerPageSelector 
                        items ={[
                            {value: 1, id: 1},
                            {value: 5, id: 5},
                            {value: 10, id: 10},
                            {value: 25, id: 25},
                            {value: 50, id: 50}
                        ]}
                        pokePerPageSelected={this.state.pokePerPage}
                        pokemonPerPage={(value) => this.pokemonPerPageHandler(value)}
                    />

                    <div className={classes.PageButtons}>
                        <PokePagination
                            pokePage={this.state.pokePage}
                            pokePerPage={this.state.pokePerPage}
                            paginationPageClicked={(pageClickedNumber) => this.paginationPageClickedHandler(pageClickedNumber)}
                            previousPokemonPage={() => !this.state.showingType ? this.previousPokemonPage() : this.previousTypePokemonPage()}
                            nextPokemonPage={() => !this.state.showingType ? this.nextPokemonPage() : this.nextTypePokemonPage()}
                            lastPoke={this.state.lastPokeOnList}
                        />
                    </div>

                    {this.state.pokemon ?
                        
                        <div className={classes.PokeList}>
                            {newPokemonList}
                        </div>

                    :null}
                    
                </div>
                :null}

                {this.state.selectedPokemon ? 

                    <div className={classes.PokemonDetails}>


                        <PokemonDetailCard
                            name={this.state.selectedPokemon.name}
                            dexNumber={this.state.selectedPokemonId}
                            types={this.state.selectedPokemonTypes}
                            stats={this.state.selectedPokemonStats}
                            typeClicked={(type)=>{this.typeClickedHandler(type)}}

                        />

                        <NextPokemonButton
                            showPrev={!(this.state.selectedPokemon.id === 1)}
                            showNext={!(this.state.selectedPokemon.id === this.state.lastPokeOnList)}
                            prevButtonClicked={() => this.pokemonClickedHandler('https://pokeapi.co/api/v2/pokemon/' + (this.state.selectedPokemon.id-1))}
                            nextButtonClicked={() => this.pokemonClickedHandler('https://pokeapi.co/api/v2/pokemon/' + (this.state.selectedPokemon.id+1))}
                        />


                        <PokemonMeasurements 
                            pokeColor={this.state.selectedPokemonColor}
                            pokeHabitat={this.state.selectedPokemonHabitat}
                            height={this.state.selectedPokemon.height}
                            weight={this.state.selectedPokemon.weight}
                        />

                        <DexEntrie 
                            entries={this.state.selectedPokemonEntries}
                        />      

                        <PokemonTypes 
                            pokemonId={this.state.selectedPokemonId}
                            showDisadvantages={true}
                            typeClicked={(type)=>{this.typeClickedHandler(type)}}
                        />

                        <PokemonIngameSprites
                            pokeSprites={this.state.selectedPokemonSprites}
                            pokeMegaData={this.state.selectedPokemonMega}
                        />
                                                
                        <PokemonEvolutions 
                            evolutionData={this.state.evolutions}
                            evolutionClicked={(pokemonId) => this.evolutionClickedHandler(pokemonId)}
                            typeClicked={(type)=>{this.typeClickedHandler(type)}}
                        />

                    </div>  
                : null} 

            </section>
        }

        return (

            <div className={classes.Body}>

                <NavBar
                    searchPokemon={(toSearch) => this.searchPokemonHandler(toSearch)}
                    searchError={this.state.searchDataError}
                    showInputField={this.state.showSearchInput}
                    searchToggle={() => this.searchToggleHandler()}
                    homeIconClicked={() => this.goHomeHandler()}
                />


                {!this.state.showPokedex && !this.state.playingWhoIs?
                    <div>
                        <PokemonFeatures 
                            pokedexClicked={() => this.pokedexClickedHandler()}
                            playWhoIsThatPokemon={()=> this.whoIsThatPokemonClickedHandler()}
                        />
                    </div>
                : null}

                {this.state.playingWhoIs? <WhoIsThatPokemon/> : null}

                {this.state.showPokedex ?
                    <div>{pokeDex}</div>
                :null}

            </div>
        )
    }
}

export default PokeList;


