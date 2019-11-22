import React, {useState, useEffect} from 'react';
import classes from './NextPokemonButton.module.css';


const NextPokemonButton = (props) => {

    useEffect(() => {

        

    }, [JSON.stringify(props)]);


    return (
        <ul className={classes.ButtonContainer}>

            {props.showPrev ?
            <li onClick={props.prevButtonClicked} className={`${classes.Button} + ${classes.Prev}`}><div></div></li>
            : null}

            {props.showNext ?
            <li onClick={props.nextButtonClicked} className={classes.Button}><div></div></li>
            : null}

        </ul>
    )
};

export default NextPokemonButton;