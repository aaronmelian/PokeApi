import React, {useState, useEffect} from 'react';
import classes from './NextPokemonButton.module.css';


const NextPokemonButton = (props) => {

    useEffect(() => {

        

    }, [JSON.stringify(props)]);


    return (
        
        <div className={classes.ButtonContainer}>

            <ul>

                {props.showPrev ?
                <li onClick={props.prevButtonClicked} className={`${classes.Button} + ${classes.Prev}`}><div></div></li>
                : null}

                {props.showNext ?
                <li onClick={props.nextButtonClicked} className={classes.Button}><div></div></li>
                : null}

            </ul>

        </div>

    )
};

export default NextPokemonButton;