import React, {useState, useEffect} from 'react';
import classes from './NavBarSearchIcon.module.css';

const NavBarSearchIcon = (props) => {
        
    
    
    return (
           
        <div className={classes.SearchContainer}>

            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
           
            <p onClick={props.searchToggle}>
                <i className={"material-icons"}>search</i>
            </p>

        </div>
        
    ) 

};

export default NavBarSearchIcon;



                             