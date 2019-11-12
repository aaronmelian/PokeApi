import React, {useState, useEffect} from 'react';
import classes from './PokePagination.module.css';

const PokePagination = (props) => {

    const [paginationSmallDevices, setPaginationSmallDevices] = useState(null);
    const [paginationMediumDevices, setPaginationMediumDevices] = useState(null);

    let lastPoke = props.lastPoke
    useEffect(() => {

        let pokePages = []
        for (let i = 1 ; i <= Math.ceil(lastPoke/props.pokePerPage); i++) {
            pokePages.push(i)
        }

        let paginationSmallStart;
        let paginationSmallEnd;

        let paginationMediumStart;
        let paginationMediumEnd;

        //////////////////// Small Devices ////////////////////

        if(props.pokePage <= 3) {

            paginationSmallStart = 1
            paginationSmallEnd = paginationSmallStart + 4;

        } else if(props.pokePage <= Math.ceil(lastPoke/props.pokePerPage)-2) {

            paginationSmallStart = props.pokePage - 2;
            if (paginationSmallStart <= 0) {
                paginationSmallStart = 1
            }

            paginationSmallEnd = paginationSmallStart + 4;
            
        } else if (props.pokePage > Math.ceil(lastPoke/props.pokePerPage)-2) {

            paginationSmallStart = Math.ceil(lastPoke/props.pokePerPage) - 4;
            if (paginationSmallStart <= 0) {
                paginationSmallStart = 1
            }

            paginationSmallEnd = Math.ceil(lastPoke/props.pokePerPage);

        }

        //////////////////// Medium Devices ////////////////////

        if(props.pokePage <= 5) {

            paginationMediumStart = 1
            paginationMediumEnd = paginationMediumStart + 8;

        } else if(props.pokePage <= Math.ceil(lastPoke/props.pokePerPage)-4) {
            
            paginationMediumStart = props.pokePage - 4;
            if (paginationMediumStart <= 0) {
                paginationMediumStart = 1
            }

            paginationMediumEnd = paginationMediumStart + 8;


        } else if (props.pokePage > Math.ceil(lastPoke/props.pokePerPage)-4) {

            paginationMediumStart = (Math.ceil(lastPoke/props.pokePerPage) - 8);
            if (paginationMediumStart <= 0) {
                paginationMediumStart = 1
            }

            paginationMediumEnd = Math.ceil(lastPoke/props.pokePerPage);

        }

        let paginationSmall = pokePages.slice(paginationSmallStart-1, paginationSmallEnd ).map(number => {
            return (
                <div 
                    className={classes.PageContainer}
                    onClick={props.pokePage !== number ? () => props.paginationPageClicked(number) : null}
                    value={number}
                    key={number}
                    style={props.pokePage === number ? {backgroundColor: 'rgb(236, 236, 236)', width: '60px', fontWeight: '600', cursor: 'auto'}: null}
                >{number}</div>
            )
        })

        let paginationMedium = pokePages.slice(paginationMediumStart-1, paginationMediumEnd ).map(number => {
            return (
                <div 
                    className={classes.PageContainer}
                    onClick={props.pokePage !== number ? () => props.paginationPageClicked(number) : null}
                    value={number}
                    key={number}
                    style={props.pokePage === number ? {backgroundColor: 'rgb(236, 236, 236)', width: '60px', fontWeight: '600', cursor: 'auto'}: null}
                >{number}</div>
            )
        })

        setPaginationMediumDevices(paginationMedium)
        setPaginationSmallDevices(paginationSmall)

    }, [props]);

    return (
            <div>

                <div className={classes.SmallPokePagination}>

                    {props.pokePage !== 1 ?
                        <div className={classes.PageContainer} onClick={props.previousPokemonPage} style={{paddingTop: '2px'}}>
                            <p className={classes.PageArrow}>❮</p>
                        </div>
                    : null}

                    {paginationSmallDevices}

                    {props.pokePage !== Math.ceil(lastPoke/props.pokePerPage) ?
                        <div className={classes.PageContainer} onClick={props.nextPokemonPage} style={{paddingTop: '2px'}}>
                            <p className={classes.PageArrow}>❯</p>
                        </div>
                    : null}

                </div>


                <div className={classes.MediumPokePagination}>

                    {props.pokePage !== 1 ?
                        <div className={classes.PageContainer} onClick={props.previousPokemonPage} style={{paddingTop: '2px'}}>
                            <p className={classes.PageArrow}>❮</p>
                        </div>
                    : null}

                    {paginationMediumDevices}

                    {props.pokePage !== Math.ceil(lastPoke/props.pokePerPage) ?
                        <div className={classes.PageContainer} onClick={props.nextPokemonPage} style={{paddingTop: '2px'}}>
                            <p className={classes.PageArrow}>❯</p>
                        </div>
                    : null}

                </div>



            </div>
    )
};

export default PokePagination;