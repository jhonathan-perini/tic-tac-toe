// @ts-nocheck
import { useEffect, useState } from "react"
import './index.css'
import skull from './assets/skull.svg'
import pumpkin from './assets/pumpkin.png'
import { motion } from "framer-motion"
const Board = ({onClick, squares}) => {

    useEffect(() => {
      window.localStorage.setItem('squares', JSON.stringify(squares))
    }, [squares])

    function renderSquare(index){

      // eslint-disable-next-line no-unused-expressions
        return (
            <button className='square' onClick={() => onClick(index)}>
                {squares[index] === 'O' ? <img src={skull} alt="skull" /> : squares[index] === 'X' ? <img src={pumpkin}className="pump" alt="skull" /> : null}
            </button>
        )
    }
    return (
        <section > 
        
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
          
        </section>
    )
    }
    function calculateNextValue(squares) {
        return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
      }

   
      function teste (nextValue, winner) {
const val = winner ? winner : nextValue;
          return (
     <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
{winner ? 'Winner is: ' : 'Next player: '}
    <img src={val === 'O' ? skull : pumpkin} alt="skull" className="rowImg" />
    </div> 
          )
      }

      function calculateStatus(winner, squares, nextValue) {
        return winner
          ? teste(nextValue, winner)
 
          : squares.every(Boolean)
          ? `Scratch: Cat's game`
          : teste(nextValue, null)
      }

      function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ]
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i]
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
          }
        }
        return null
      }


function Game() {
  const [currentStep, setCurrentStep] = useState(0)
  const [history, setHistory] = useState(  [Array(9).fill(null)])
  const currentSquares = history[currentStep]
  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)



    const moves = history.map((stepSquares, step) => {
      const desc = step === 0 ? `Go to game start` : `Go to move #${step}`
      const isCurrentStep = step === currentStep
      return <li key={step}>
        <button disabled={isCurrentStep} onClick={() => setCurrentStep(step)}>{desc} {isCurrentStep ? '(current)': null }</button>
      </li>
    })
  function selectSquare(square){
    if(winner || currentSquares[square]) return 
    const squaresCopy = [...currentSquares]
    const newHistory = history.slice(0, currentStep +1)
    squaresCopy[square] = nextValue
    setHistory([...newHistory, squaresCopy])
    setCurrentStep(newHistory.length)
}
function restart () {
  setHistory([Array(9).fill(null)])
  setCurrentStep(0)
}
    return (
      <motion.div className="game" initial={{opacity: 0}} animate={{opacity: 1}}>
 
           <div style={{ boxShadow:  ' inset 5px 5px  30px 20px rgba(0, 0, 0, 0.2)' ,height: '100vh', width: '18rem', backgroundColor: '#252422', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', border: '1px solid rgb(255,255,255,0.1)'}}>
           <h1 style={{fontFamily: 'SomethingStrange', color: 'white',  marginLeft: '1rem'}}>History</h1>
             <p class='item-list'>{moves}</p>
             </div>
        <div className="game-board">
        <h2>{status}</h2>
          <Board onClick={selectSquare} squares={currentSquares} />
          <button className="restart-button" onClick={restart}>Restart</button>
        </div>
      
       
      </motion.div>
    )
  }




  export default Game

