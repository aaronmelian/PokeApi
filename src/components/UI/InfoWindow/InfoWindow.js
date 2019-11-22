import React from 'react';
import classes from './InfoWindow.module.css';
import { mixedTypeAnnotation } from '@babel/types';

const InfoWindow = (props) => {
    console.log(props)
    let pokemonColors = props.pokemonColors
    // pokemonColors=['black','black']

    let cardStyle = 
        {
            background: 'linear-gradient(to bottom right,' + pokemonColors[0] + ',' + pokemonColors[1] + ')',
        }

    return(
        
        <div className={classes.InfoWindowContainer}>

            <div className={classes.BoxTitle} style={cardStyle}>{props.title}</div>
            
            <div className={classes.InfoWindow}>
                {props.children}
            </div>
        </div>

    )

};

export default InfoWindow;


