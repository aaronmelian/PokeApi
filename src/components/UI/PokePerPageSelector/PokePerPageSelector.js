import React, {useState, useEffect} from 'react';
import classes from './PokePerPageSelector.module.css';

const PokePerPageSelector = (props) => {
    const [showItems, setShowItems] = useState(false);

    useEffect(() => {
    }, [props]);


    const dropDown = () => {
        let showOrNot = !showItems;
        setShowItems(showOrNot)
    }

    const optionClicked = (item) => {
        setShowItems(false)
        props.pokemonPerPage(item.value)

    }

    const mouseLeave = () => {
        setShowItems(false)
    }
    let options = props.items || []

    
    return (
        <div className={classes.Box}
                onMouseLeave={() => mouseLeave()}>

            <div className={classes.SelecBoxContainer} 
                 onClick={() => dropDown()}>
                
                <div className={classes.SelectBoxSelectedItem}>
                    <p>{`Show ${props.pokePerPageSelected} Pokemon`}</p>
                </div>

                <div className={classes.SelectBoxArrow}>
                    <span className={showItems ? classes.SelectBoxArrowUp : classes.SelectBoxArrowDown}></span>
                </div>

            </div>

            <div style={{display: showItems ? 'flex' : 'none'}}
                     className={classes.Options}>
                    {options.map(item => {
                        return  <div key={item.id}
                                    onClick={ () => {optionClicked(item)}}
                                    className={props.pokePerPageSelected === item.value ? classes.Selected : null }>
                                    <p className={classes.OptionsText}>{item.value}</p>
                                </div> })}
            </div>

        </div>


        
    )

};

export default PokePerPageSelector;