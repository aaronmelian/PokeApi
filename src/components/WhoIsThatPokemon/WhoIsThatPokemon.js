import React, {useState, useEffect, useRef} from 'react';
import {TwitterTimelineEmbed} from 'react-twitter-embed';
import classes from './WhoIsThatPokemon.module.css';
import axios from 'axios';

import Modal from '../UI/Modal/Modal'

import gen1Names from './gen1Names.json';
import gen2Names from './gen2Names.json';
import gen3Names from './gen3Names.json';
import gen4Names from './gen4Names.json';
import gen5Names from './gen5Names.json';
import gen6Names from './gen6Names.json';
import gen7Names from './gen7Names.json';

import twitterLogo from './twitterLogo.png'
import facebookLogo from './facebookLogo.png'


const WhoIsThatPokemon = (props) => {

    const inputRef = useRef(null);
    const inputUserNameRef = useRef(null);

    const [pokeToGuess, setPokeToGuess] = useState(null);
    const [pokeToGuessId, setPokeToGuessId] = useState(null);
    const [inputBuffer, setInputBuffer] = useState('');
    const [brightStyle, setBrightStyle] = useState();

    const [guessed, setGuessed] = useState('toBe');

    const [showImage, setShowImage] = useState(true);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    const [matchedNames, setMatchedNames] = useState();
    const [randomPokes, setRandomPokes] = useState([]);

    const [maxScore, setMaxScore] = useState();

    const [selectingGen, setSelectingGen] = useState(true);

    const [noGenSelected, setNoGenSelected] = useState(false);

    const [tweetText, setTweetText] = useState(false);

    const [topScores, setTopScores] = useState();
    
    const [saveLoading, setSaveLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(true);
    const [scoreUserName, setScoreUserName] = useState(null);
    const [scoreUserEmail, setScoreUserEmail] = useState(null);

    const [gen1, setGen1] = useState(false);
    const [gen2, setGen2] = useState(false);
    const [gen3, setGen3] = useState(false);
    const [gen4, setGen4] = useState(false);
    const [gen5, setGen5] = useState(false);
    const [gen6, setGen6] = useState(false);
    const [gen7, setGen7] = useState(false);

    const handleChange1 = () => {
        
        setPokeToGuess(null)
        setGen1(!gen1)
    }

    const handleChange2 = () => {
        setPokeToGuess(null)
        setGen2(!gen2)
    }

    const handleChange3 = () => {
        setPokeToGuess(null)
        setGen3(!gen3)
    }

    const handleChange4 = () => {
        setPokeToGuess(null)
        setGen4(!gen4)
    }

    const handleChange5 = () => {
        setPokeToGuess(null)
        setGen5(!gen5)
    }

    const handleChange6 = () => {
        setPokeToGuess(null)
        setGen6(!gen6)
    }

    const handleChange7 = () => {
        setPokeToGuess(null)
        setGen7(!gen7)
    }

    const chooseGenHandler = () => {
        
        setPokeToGuess(null);
        setMatchedNames(null);
        setInputBuffer('');
        setSelectingGen(false);
        
        if(selectingGen) {
            playAgainHandler()
        }
        
    }
    
    useEffect(() => {
        if(!gen1 && !gen2 && !gen3 && !gen4 && !gen5 && !gen6 && !gen7) {
            setPokeToGuess(null);
            setNoGenSelected(true);
        } else if(gen1 || gen2 || gen3 || gen4 || gen5 || gen6 || gen7){
            setNoGenSelected(false);
        }
    }, [gen1, gen2, gen3, gen4, gen5, gen6, gen7]);

    useEffect(() => {
        getScores()
    },[]);

  
    const getScores = () => {
        axios.get(`https://pokeapi-pokedex.firebaseio.com/topScores.json`)
        .then(response => {
            let responseData = response.data
            let scoresArray = [];
            for (let key in responseData) {
                scoresArray.push(responseData[key])
            }
            
            let scoreToSort = [...scoresArray]
            scoreToSort.sort((a, b) => parseFloat(b.scoreValue) - parseFloat(a.scoreValue));
 

            let topScores = scoreToSort.map((scoreData,i) => {
                return (
                    <div key={`${scoreData.UserScore}, ${i}`}
                        className={classes.UserScoreContainer}
                    >
                        <div className={classes.UserScoreName}>{scoreData.userName}:</div>
                        <div className={classes.UserScoreValue}>{scoreData.scoreValue}</div>
                    </div>
                )
            })
            setTopScores(topScores)
        });
    }


    useEffect(() => {

        let generationText;

        const gen1text = gen1 ? 1 : null
        const gen2text = gen2 ? 2 : null
        const gen3text = gen3 ? 3 : null
        const gen4text = gen4 ? 4 : null
        const gen5text = gen5 ? 5 : null
        const gen6text = gen6 ? 6 : null
        const gen7text = gen7 ? 7 : null

        const generations = [gen1text, gen2text, gen3text, gen4text, gen5text, gen6text, gen7text]
        
        const genList = generations.filter(gen => gen > 0);
        if (genList.length === 1) {
            generationText = `Gen ${genList[0]}`
        } else {

            let someGenText = [];

            genList.forEach((gen,i) => {

                if (i === genList.length-1) {
                    someGenText.push(` and ${gen}`)
                    
                } else {
                    someGenText.push(` ${gen}`)
                }

                someGenText.join('')
            })

            generationText = `Generations${someGenText}`
        }

        let scoreText = score === maxScore ? `all ${score}` : `${score}`
        let numberOfPoke = score === maxScore ? '' : ` ( ${maxScore} Pokemon ).`
        let tweet = `I just guessed ${scoreText} pokemon from ${generationText}!${numberOfPoke} How many will you guess?`
        
        setTweetText(tweet)
        
    }, [gameOver, gameWon]);
    
    const setGame = () => {

        let pokemonArray = []

        if(gen1) {
            for (let i = 1; i <= 151 /* 151 */; i++) {
                pokemonArray.push(i)
            }
        };
        if(gen2) {
            for (let i = 152; i <= 251 /* 251 */; i++) {
                pokemonArray.push(i)
            }
        };
        if(gen3) {
            for (let i = 252; i <= 386 /* 386 */; i++) {
                pokemonArray.push(i)
            }
        };
        if(gen4) {
            for (let i = 387; i <= 493 /* 493 */; i++) {
                pokemonArray.push(i)
            }
        };
        if(gen5) {
            for (let i = 494; i <= 649 /* 649 */; i++) {
                pokemonArray.push(i)
            }
        };
        if(gen6) {
            for (let i = 650; i <= 721 /* 721 */; i++) {
                pokemonArray.push(i)
            }
        };
        if(gen7) {
            for (let i = 722; i <= 807 /* 807 */; i++) {
                pokemonArray.push(i)
            }
        };

        if (typeof pokemonArray !== 'undefined' && pokemonArray.length > 0) {
            assignNewPokemon(pokemonArray);
            setMaxScore(pokemonArray.length + 1);
        }
    }

    const handleInputChange = (event) => {
        
        event.preventDefault();
        setInputBuffer(event.target.value);
        searchPokes(event.target.value)
    }

    const assignNewPokemon = async(pokemonArray) => {
        
        let pokesToPick = pokemonArray ? pokemonArray : randomPokes

        let randomPokeId = Math.floor(Math.random() * (pokesToPick.length)) + 1;

        let pokeToSplice = randomPokeId-1
        let chosenPokeId = pokesToPick[randomPokeId - 1];

        let spriteId = chosenPokeId.toString()
        while (spriteId.length < 3) {
            spriteId = '0' + spriteId;
        }

        pokesToPick.splice(pokeToSplice, 1);
        setRandomPokes([...pokesToPick]);

        let offset = (chosenPokeId -1);
        
       

        let imgStyle = {transition: 'none', filter: 'brightness(0)'};
        
        let resp = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=' + offset + '&limit=' + 1);
        // console.log(resp.data.results[0].name.split('-')[0], randomPokeId)
        setPokeToGuess(resp.data.results[0].name.split('-')[0])
        setPokeToGuessId(spriteId);
        setBrightStyle(imgStyle)
        setShowImage(true)
        inputRef.current.focus()

       
    } 


    const nextPokemonHandler = () => {
        setShowImage(false)
        setGuessed('toBe')
        assignNewPokemon()
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        if(!gameOver) {

            let inputChosen = matchedNames && matchedNames.length === 1 ? matchedNames[0].props.id : inputBuffer;

            if(!inputBuffer || (guessed === 'yes')) {
                return
            } else if(inputChosen.toLowerCase() === pokeToGuess) {

                let pokeStyle = {
                    transition: '2s',
                    filter: 'brightness(1)'
                };
                let newScore = score + 1;
                setScore(newScore);
                setGuessed('yes');
                setBrightStyle(pokeStyle);
                setInputBuffer('');

                if (newScore === maxScore) {
                    setGameWon(true)
                } else {
                inputRef.current.focus()
                setTimeout(function(){nextPokemonHandler()}, 2000)
                }

            } else {
                setGuessed('no');
                setGameOver(true)

            }
            setMatchedNames(null)

        }
    }

    const playAgainHandler = () => {
        setShowSaveButton(true)
        setScoreUserName('')
        setScoreUserEmail('')
        setScore(0);
        setGameOver(false);
        setGuessed('toBe');
        setInputBuffer('')
        setGameWon(false);
        setGame();


        let imgStyle = {transition: 'none', filter: 'brightness(0)'};
        setBrightStyle(imgStyle);


    }

    const searchPokes = async searchText => {
        let pokemonNameList = []
        if (gen1) {
            pokemonNameList = pokemonNameList.concat(gen1Names.results)
        }
        if (gen2) {
            pokemonNameList = pokemonNameList.concat(gen2Names.results)
        }
        if (gen3) {
            pokemonNameList = pokemonNameList.concat(gen3Names.results)
        }
        if (gen4) {
            pokemonNameList = pokemonNameList.concat(gen4Names.results)
        }
        if (gen5) {
            pokemonNameList = pokemonNameList.concat(gen5Names.results)
        }
        if (gen6) {
            pokemonNameList = pokemonNameList.concat(gen6Names.results)
        }
        if (gen7) {
            pokemonNameList = pokemonNameList.concat(gen7Names.results)
        }


        let matches = pokemonNameList.filter(poke => {
            const regex = new RegExp(`^${searchText}`, 'gi')
            return poke.name.match(regex)
        })

        let matchestoSort = matches.map(obj => {
            const fixedName = obj.name.split('-')[0]

            return fixedName.charAt(0).toUpperCase() + fixedName.slice(1);

        })
        if(searchText.length === 0) {
            matchestoSort = [];
        }
        let matchOptions = matchestoSort.sort().map((poke,i) => {
            return (
                <button
                    onClick={(event)=> optionClickedHandler(event)}
                    className={classes.InputOption}
                    key={poke,i}
                    id={poke}
                    tabIndex={0}
                        >{poke}
                </button>
            )
        })
        if (matchOptions.length === 0) {
            matchOptions = null;
        }

        setMatchedNames(matchOptions)
    }

    const optionClickedHandler = (event) => {
        setInputBuffer(event.target.id)
        setMatchedNames(null)
        inputRef.current.focus()

    }
    
    //////////////////////////////////////  USER SCORE   //////////////////////////////////////

    const modalToggleHandler = () => {
        setShowModal(!showModal)
        if(!showModal) {
            inputUserNameRef.current.focus()
        }

    }

    const saveButtonClickedHandler = () => {
        modalToggleHandler()
    }

    const handleUserInputNameChange = (event) => {
        setScoreUserName(event.target.value);
    }

    const handleUserInputEmailChange = (event) => {
        setScoreUserEmail(event.target.value);
    }

    const confirmSaveScoreHandler = (event) => {
        if(scoreUserName.length <= 3) {
            window.alert("Name must be at least 4 characters long")
        } else {

            if(event) {
                event.preventDefault()
            }

            const scoreData = {
                userName: scoreUserName,
                scoreValue: score,
                email: scoreUserEmail
            }

            axios.post(`https://pokeapi-pokedex.firebaseio.com/topScores.json`, scoreData)
            .then(response => {
                getScores();
                setSaveLoading(false)
            })
            .catch(error => {
                getScores();
                setSaveLoading(false)
            });

            modalToggleHandler()
            setShowSaveButton(false)
        }
    }

    //////////////////////////////////////  USER SCORE   //////////////////////////////////////




    return(

        
        <div className={classes.WhoIsThatContainerBackGround}>

            <Modal 
                backdropClicked={() => {modalToggleHandler()}}
                show={showModal}
            >   
                <p className={classes.ModalScoreText}>Your Score is {score}!</p>
                <p className={classes.ModalInfoText}>Please enter you Info!</p>
                <form className={classes.ScoreForm} onSubmit={(event) => confirmSaveScoreHandler(event)}>
                    <input 
                        onChange={(event)=>handleUserInputNameChange(event)}
                        className={classes.ScoreInput}
                        placeholder={'Name'}
                        type='text'
                        name='UserName'
                        value={scoreUserName || ''}
                        autoComplete="off"
                        spellCheck="false"
                        ref={inputUserNameRef}
                    ></input>

                    <input 
                        onChange={(event)=>handleUserInputEmailChange(event)}
                        className={classes.ScoreInput}
                        placeholder={'Email'}
                        type='text'
                        name='UserEmail'
                        value={scoreUserEmail || ''}
                        autoComplete="off"
                        spellCheck="false"
                    ></input>
                </form>
                <div className={classes.ModalSaveButtons}>
                    <button className={classes.ModalConfirmSaveScoreButton} onClick={()=>{confirmSaveScoreHandler()}}>Save</button>
                    <button className={classes.ModalCancelSaveScoreButton} onClick={()=>{modalToggleHandler()}}>Cancel</button>
                </div>
            
            </Modal>

            <div className={classes.WhoIsThatContainer}>
                
                <div className={classes.WhoIsThatTextContainer}>
                    <span className={classes.WhoIsThatText}>Who's that Pokemon?</span>
                </div>

                <div className={classes.ImageBlock}>

                    {!selectingGen ?
                        <div className={classes.WhoIsThatPokeContainer}>
                            <img className={classes.WhoIsThatPokeBackground} src={'https://external-preview.redd.it/e5zoQw-hgw-LCjdhC_4G8IAcHxex5pzda_BD_FPTcBY.png?width=960&crop=smart&auto=webp&s=23f9df250a8fe74763c3ba7cb8e46421e63cba2d'}/>
                            
                            {showImage ? 
                                // <img className={classes.WhoIsThatPoke} style={brightStyle} src={'https://pokeres.bastionbot.org/images/pokemon/' + pokeToGuessId + '.png'}/>
                                <img className={classes.WhoIsThatPoke} style={brightStyle} src={'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/' + pokeToGuessId + '.png'}/>
                            : null}

                            { gameOver ?
                                <div className={classes.gameOverText}>
                                    You guessed {score} pokemon!
                                </div>
                            : null }

                            { gameWon ?
                                <div className={classes.gameOverText} style={{backgroundColor: 'green'}}>
                                    Congratulations! You guessed all {score} pokemon!
                                </div>
                            : null}

                        </div>
                    :null}


                </div>
                
                {gameOver || gameWon || (window.innerWidth >= 992 && !selectingGen)? 
                    <div id='twitterTimeline' className={classes.TwitterTimeline}>
                        <TwitterTimelineEmbed
                            sourceType="profile"
                            screenName="pokemon_api"
                            options={{height: "100%", width: 850}}
                        />
                    </div>
                :null}

                {gameOver || gameWon || (window.innerWidth >= 992 && !selectingGen)? 
                    <div className={classes.TopScores}>

                        <div
                            className={classes.UserScoreContainer}
                        >
                            <div className={classes.UserScoreName}>Top Scores:</div>
                        </div>

                        {topScores}
                    </div>
                :null}
                

                <div className={classes.ScoreBoardContainer}>
                    <div className={classes.ScoreBoard}>
                            <p className={classes.ScoreTitle}>SCORE</p>
                            <p className={classes.ScoreNumber}>{score}</p>
                    </div>
                </div>

                <div className={classes.ResultBoardContainer}>
                    <div className={classes.ScoreBoard}>
                        <p className={classes.ScoreTitle}>RESULT</p>
                        <div className={classes.ScoreNumber}>
                            {guessed === 'yes' ? <p className={`right ${classes.Result}`}>&#10004;</p>
                            : (guessed === 'no' ? <p className={`wrong ${classes.ResultWrong}`}>&#10006;</p>
                            : (guessed === 'toBe' ? '-' : null))
                            }
                        </div>
                    </div>
                </div>
                


                {!selectingGen?
                <div
                    className={classes.GuessTextContainer}
                    style={guessed === 'yes' ? {backgroundColor: 'green'}
                    : (guessed === 'no' ? {backgroundColor: 'red'}
                    : (guessed === 'toBe' ? {backgroundColor: 'rgb(33, 150, 243)'} : null))}
                >

                    <p className={classes.GuessText}>It's:</p>
                    <form onSubmit={(event) => handleSubmit(event)} className={classes.InputContainer}>
                            <input 
                                className={classes.Input}
                                placeholder={props.searchError || 'Enter Name'}
                                type='text'
                                name='WhosThatName'
                                onChange={(event) => handleInputChange(event)}
                                value={inputBuffer}

                                autoComplete="off"
                                spellCheck="false"
                                readOnly={gameOver || gameWon || selectingGen? true : false}

                                ref={inputRef}
                                tabIndex={0}
                                >
                            </input>
                            <div className={classes.matchList}></div>
                    </form>

                    { !gameOver? 
                    <div className={classes.GuessButtonContainer}>
                        <div onClick={(event) => handleSubmit(event)} className={classes.GuessButton}>
                            Guess!
                        </div>
                    </div>
                    :null }
                    
                </div>
                :null}

                { matchedNames && inputBuffer? 
                    <div className={classes.OptionsList}>{matchedNames}</div>
                :null }
                


                { (gameOver || gameWon) && !selectingGen ?

                <div className={classes.SharingContainer}>

                    <div className={classes.ShareLogos}>
                        <div className={classes.TwitterLogoContainer} onClick={() => {
                            window.open(`https://twitter.com/share?text=${tweetText}&screen_name=pokemon_api&url=https://pokeapi-pokedex.firebaseapp.com/`, 'Twitter', 'height=285,width=550,resizable=1')
                            }}
                        >
                            <img className={classes.TwitterLogo} src={twitterLogo}/>
                        </div>

                        <div className={classes.FacebookLogoContainer} onClick={() => {
                            window.open(`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fpokeapi-pokedex.firebaseapp.com%2F&amp;src=sdkpreparse`, 'Facebook', 'height=285,width=550,resizable=1')
                            }}
                        >
                            <img className={classes.FacebookLogo} src={facebookLogo}/>
                        </div>
                    </div>
                    
                </div>

                : null }
                
                { (gameOver || gameWon) && !selectingGen ?
                            <button className={classes.ChooseGenButton} tabIndex={0} onClick={() => {setGameOver(false); setGameWon(false); setSelectingGen(true); setGuessed('toBe'); setScore(0)} }>
                                Choose Gen?
                            </button>
                : null }

                
                { (gameOver || gameWon) && !selectingGen ?
                            <button className={classes.PlayAgainButton} tabIndex={0} onClick={(event) => playAgainHandler()}>
                                Play Again!
                            </button>
                            
                : null }

                { (gameOver || gameWon) && !selectingGen?
                    showSaveButton ?
                    <button className={classes.SaveScoreButton} onClick={()=>saveButtonClickedHandler()}>Save Score</button>
                    :
                    <button className={classes.SaveScoreButton} style={{backgroundColor: 'green', cursor: 'normal'}}>Score Saved!</button>
                : null }


                <div className={classes.SelectGenContainer}>
                    
                    {selectingGen?
                        <div style={{display: 'flex', flexFlow: 'column'}}>

                            <div className={classes.ChooseGenText}>
                                Choose Gen!
                            </div>

                            {!noGenSelected? 
                            <button className={classes.PlayText} onClick={()=>chooseGenHandler()}>
                                Play!
                            </button>
                            : null}
                        </div>
                    : null }



                    {selectingGen?
                        <div className={classes.SelectBoxes}>
                            <div className={classes.GenLabelContainer}>
                                <button className={classes.Label}  onClick={() => handleChange1()}style={gen1? {backgroundColor: '#2196F3'} : null}>
                                    <img alt="bulbasaur" className={classes.PokeSmallSprite} src={!gen1 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/001.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/003.png"}/>
                                    <img alt="charmander" className={classes.PokeSmallSprite} src={!gen1 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/004.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/006.png"}/>
                                    <img alt="squirtle" className={classes.PokeSmallSprite} src={!gen1 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/007.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/009.png"}/>
                                </button>
                            </div>
                            
                            <div className={classes.GenLabelContainer}>
                                <button className={classes.Label}  onClick={() => handleChange2()}style={gen2? {backgroundColor: '#2196F3'} : null}>
                                    <img alt="chikorita" className={classes.PokeSmallSprite} src={!gen2 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/152.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/154.png"}/>
                                    <img alt="cyndaquil" className={classes.PokeSmallSprite} src={!gen2 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/155.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/157.png"}/>
                                    <img alt="totodile" className={classes.PokeSmallSprite} src={!gen2 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/158.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/160.png"}/>
                                </button>
                            </div>

                            <div className={classes.GenLabelContainer}>
                                <button className={classes.Label}  onClick={() => handleChange3()}style={gen3? {backgroundColor: '#2196F3'} : null}>
                                    <img alt="treecko" className={classes.PokeSmallSprite} src={!gen3 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/252.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/254.png"}/>
                                    <img alt="torchic" className={classes.PokeSmallSprite} src={!gen3 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/255.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/257.png"}/>
                                    <img alt="mudkip" className={classes.PokeSmallSprite} src={!gen3 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/258.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/260.png"}/>
                                </button>
                            </div>


                            <div className={classes.GenLabelContainer}>
                                <button className={classes.Label}  onClick={() => handleChange4()}style={gen4? {backgroundColor: '#2196F3'} : null}>
                                    <img alt="turtwig" className={classes.PokeSmallSprite} src={!gen4 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/387.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/389.png"}/>
                                    <img alt="chimchar" className={classes.PokeSmallSprite} src={!gen4 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/390.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/392.png"}/>
                                    <img alt="piplup" className={classes.PokeSmallSprite} src={!gen4 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/393.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/395.png"}/>
                                </button>
                            </div>

                            <div className={classes.GenLabelContainer}>
                                <button className={classes.Label}  onClick={() => handleChange5()}style={gen5? {backgroundColor: '#2196F3'} : null}>
                                    <img alt="snivy" className={classes.PokeSmallSprite} src={!gen5 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/495.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/497.png"}/>
                                    <img alt="tepig" className={classes.PokeSmallSprite} src={!gen5 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/498.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/500.png"}/>
                                    <img alt="oshawott" className={classes.PokeSmallSprite} src={!gen5 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/501.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/503.png"}/>
                                </button>
                            </div>

                            <div className={classes.GenLabelContainer}>
                                <button className={classes.Label}  onClick={() => handleChange6()}style={gen6? {backgroundColor: '#2196F3'} : null}>
                                    <img alt="chespin" className={classes.PokeSmallSprite} src={!gen6 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/650.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/652.png"}/>
                                    <img alt="fennekin" className={classes.PokeSmallSprite} src={!gen6 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/653.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/655.png"}/>
                                    <img alt="froakie" className={classes.PokeSmallSprite} src={!gen6 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/656.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/658.png"}/>
                                </button>
                            </div>

                            <div className={classes.GenLabelContainer}>
                                <button className={classes.Label}  onClick={() => handleChange7()}style={gen7? {backgroundColor: '#2196F3'} : null}>
                                    <img alt="rowlet" className={classes.PokeSmallSprite} src={!gen7 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/722.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/724.png"}/>
                                    <img alt="litten" className={classes.PokeSmallSprite} src={!gen7 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/725.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/727.png"}/>
                                    <img alt="popplio" className={classes.PokeSmallSprite} src={!gen7 ? "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/728.png" : "https://www.pkparaiso.com/imagenes/pokedex/sm-icons/730.png"}/>
                                </button>
                            </div>
                        </div>
                    : null}
                </div>
            </div>
        </div>
    )
};

export default WhoIsThatPokemon;