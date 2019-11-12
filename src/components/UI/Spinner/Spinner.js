import React from 'react';
import classes from './Spinner.module.css'

const spinner = () => {

        window.scrollTo(0, 0)

        return (
                <div className={classes.Loader}>Loading...</div>
        )
}

export default spinner;