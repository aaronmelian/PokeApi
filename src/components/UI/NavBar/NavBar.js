import React, {useState, useEffect, useRef} from 'react';

import classes from './NavBar.module.css';
import NavBarSearchIcon from '../NavBarSearchIcon/NavBarSearchIcon';
import Backdrop from '../Backdrop/Backdrop'
import homeIcon from '../../images/homeIcon.svg'


const NavBar = (props) => {
    const inputRef = useRef(null);

    const [pokeToSearchName, setPokeToSearchName] = useState();
    const [errorText, setErrorText] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        props.searchPokemon(pokeToSearchName.toLowerCase());
        setPokeToSearchName(null)

    }

    const searchToggleHandler = () => {

        if(!pokeToSearchName) {
            props.searchToggle()
        } else {
            props.searchPokemon(pokeToSearchName.toLowerCase());
            setPokeToSearchName(null);
        }
    }

    const handleInputChange = (event) => {
        event.preventDefault();
        setPokeToSearchName(event.target.value);
    }


    const isNumber = (data) => {
        return /^-?[\d]+(?:e-?\d+)?$/.test(data);
    }

    
    useEffect(() => {

        if(isNumber(props.searchError)) {
            setErrorText(`Invalid #Dex. (${props.searchError})`) 
        } else {
            setErrorText(`Invalid Pokemon Name.`)

        }

    }, [props.searchError]);


    useEffect(() => {

        if(props.showInputField) {
            inputRef.current.focus()
        } 

    }, [props.showInputField]);


    return(

        <div>

            <div className={classes.NavBarContainer}>

                <div className={classes.NavBar}>

                    <div className={classes.NavBarSection1}>
                        <img className={classes.PokeIcon} onClick={props.homeIconClicked} src={homeIcon}/>
                    </div>

                    <div className={classes.NavBarSection2}>
                        <div className={classes.NavBarContent} style={{display: !props.showInputField ? 'flex' : 'none'}}>
                            <img onClick={props.homeIconClicked} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png'} />
                        </div>

                        {props.showInputField ?
                                <form onSubmit={(event) => handleSubmit(event)} className={classes.InputContainer}>
                                    <input 
                                        className={classes.Input}
                                        placeholder={props.searchError || ' Poke Name or #Dex'}
                                        type='text'
                                        name='fullName'
                                        onChange={(event) => handleInputChange(event)}
                                        ref={inputRef}
                                        autoComplete="off"
                                        spellCheck="false">
                                    </input>
                                </form>
                        : null}
                    </div>

                    <div className={classes.NavBarSection3}>
                        <NavBarSearchIcon
                            searchToggle={() => searchToggleHandler()}
                        />
                    </div>

                </div>
                
                <div
                    style={{display: props.searchError ? 'flex' : 'none'}}
                    className={classes.ErrorBox}
                    ><p className={classes.ErrorText}>{errorText}</p>
                </div>

            </div>


            <Backdrop 
                clicked={() => {setPokeToSearchName(null); props.searchToggle()}}
                show={props.showInputField}
            />

        </div>

    )

};

export default NavBar;


