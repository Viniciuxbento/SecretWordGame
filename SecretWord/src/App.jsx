
//CSS
import './App.css'

//COMPONENTS
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

//REACT
import { useCallback, useState, useEffect } from 'react'

//CONST COM PALAVRAS
import {wordsList} from "./data/words"



//CONST ESTÁGIOS
const stages = [
  {id:1, name:"start"},
  {id:2, name:"game"},
  {id:3, name:"end"}
]

const words = wordsList

function App() {

const pickWordAndCategory  = useCallback(() =>{

  //SORTEANDO A CATEGORIA
  const categories = Object.keys(words)
  const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

 
  //SORTEANDO A PALAVRA
  const word = words[category][Math.floor(Math.random() * words[category].length)]
 

  return {word,category}
},[words])

  //COMEÇAR O JOGO
  const startGame =useCallback(() =>{
  clearLetterStates()

  const {word, category} = pickWordAndCategory()
  
  let wordLetter = word.split('')
  wordLetter = wordLetter.map((l)=> l.toLowerCase())

  

  setPickedWord(word)
  setPickedCategory(category)
  setLetters(wordLetter)

  setGameStage(stages[1].name)
},[pickWordAndCategory])


const guessesQty =5
const [gameStage, setGameStage] = useState(stages[0].name)

const[pickedWord, setPickedWord] = useState("")
const [pickedCategory, setPickedCategory] = useState("")
const [letters, setLetters] = useState([])

const [guessedLetters, setGuessedLetters] = useState([])
const [wrongLetters, setWrongLetters] = useState([])
const [guesses, setGuesses] = useState(guessesQty)
const [score, setScore] = useState(0)

const verifyLetter = (letter) =>{
  const normalizedLetter = letter.toLowerCase()

  if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
    return
  }

  if(letters.includes(normalizedLetter)){
    setGuessedLetters((actualGL) =>[...actualGL, normalizedLetter,])
  }else{
    setWrongLetters((actualWL)=>[...actualWL, normalizedLetter,])
    setGuesses((actualGSS) => actualGSS -1)
  }
}
const clearLetterStates = () =>{
  setGuessedLetters([])
  setWrongLetters([])
}


useEffect(()=>{
  if(guesses <=0){
    clearLetterStates()
    setGameStage(stages[2].name)

  }
  },[guesses])

useEffect(()=>{
  const uniqueLetters = [...new Set(letters)]

    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore)=> (actualScore +=100))
      startGame()
    
  }
},[guessedLetters,letters, startGame])


const retryGame = ()=>{
  setScore(0)
  setGuesses(guessesQty)
  setGameStage(stages[1 ].name)
}





 
  return (
    <div className='App'>
    {gameStage === "start" && <StartScreen startGame ={startGame} />}

    {gameStage === "game" &&
     <Game verifyLetter={verifyLetter}
      pickedWord={pickedWord}
      pickedCategory={pickedCategory} 
      letters={letters} 
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}/>}

    {gameStage === "end" && <GameOver score={score} retryGame ={retryGame} />}
    </div>
  )
}

export default App
