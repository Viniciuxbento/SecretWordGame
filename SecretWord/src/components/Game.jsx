import "./Game.css"
import { useState, useRef } from "react"

const Game = ({verifyLetter,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score}) => {

        const [letter, setLetter] = useState('')
        const letterInputRef = useRef(null) 

        const handleSubmit = (event) =>{
            event.preventDefault()

            verifyLetter(letter)
            
            setLetter("")

            letterInputRef.current.focus()
        }
  return (
    <div className="game">
        <p className="points">
            <span>Pontuação atual: {score}</span>
        </p>

        <h1>Advinhe a palavra</h1>
        <h3 className="tip">
           Dica: <span className="tipWord">{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativas</p>
        <div className="wordContainer">
            {letters.map((letter,i)=>(
                guessedLetters.includes(letter) ? (<span key={i} className="letter">{letter}</span>) : (<span key={i} className="blankSquare"></span>)
            ))}
           
        </div>
        <div className="letterContainer">
            <p>Insira uma tentativa de letra</p>
            <form onSubmit={handleSubmit} className="formLetterPlay">
                <input className="inputJogar" type="text" maxLength={1} name="letter" required onChange={(event)=>{setLetter(event.target.value)}} value={letter} ref={letterInputRef}/>
                <button className="buttonJogar">JOGAR</button>
            </form>
        </div>
        <div className="wrongLetter"></div>
        <p>Letras usadas:</p>
            {wrongLetters.map((letter,i)=>(
                <span key={i}>{letter} - </span>
    
            ))}
    </div>
  )
}

export default Game