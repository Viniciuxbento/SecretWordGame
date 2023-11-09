import "./GameOver.css"

const GameOver = ({retryGame, score}) => {
  return (
    <div>
        <h1>Game Over</h1>
        <h2>A sua Pontuação foi : {score}</h2>
        <button onClick={retryGame}>REINICIAR</button>  
     </div>
  )
}

export default GameOver