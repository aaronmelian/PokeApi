import React, {useState, useEffect} from 'react';
import classes from './DexEntrie.module.css'

const DexEntrie = (props) => {

    const [dexEntrie, setDexEntrie] = useState([]);

    useEffect(() => {

        const dexEntries = props.entries;

        let firstEnglishEntrie = null


        for ( let i=0; i < dexEntries.length; i++) {
            
            if (props.entries[i].language.name === 'en') {

                firstEnglishEntrie = props.entries[i].flavor_text
            }
        }

        let firstEnglishEntriePolished = firstEnglishEntrie.replace(/(\r\n|\n|\f|\r)/gm," ");

        setDexEntrie(firstEnglishEntriePolished)


    }, [props]);

    return (
        
        <div className={classes.EntrieContainer}>
            {dexEntrie}
        </div>

    )
};

export default DexEntrie;