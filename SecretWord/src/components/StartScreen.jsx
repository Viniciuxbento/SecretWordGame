import "./StartScreen.css"



function StartScreen({startGame}) {
  return (
    <div className="Start">
        <h1>Secret Word</h1>
        <p>Clique aqui em baixo para começar a jogar!</p>
        <button onClick={startGame}>COMEÇAR O JOGO!</button>
        
        
        </div>
  )
}

export default StartScreen