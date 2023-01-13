import React from 'react'
import Die from './components/Die'
import "./css/App.css"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import {useWindowSize} from 'react-use';

export default function App() {

const [dice , setDice] = React.useState(allNewDice())

const [Tenzies, setTenzies] = React.useState(false)

const [score, setScore] = React.useState(0)
const [highScore, setHighScoreState] = React.useState(0)

const [highScoreClickCount, setHighScoreClickCount] = React.useState(0);


const { width, height } = useWindowSize()

React.useEffect(() => {
  const allHeld = dice.every(die => die.locked)
  const allSame = dice.every(die => die.value === dice[0].value)
  if (allHeld && allSame) {
    setTenzies(true)
  }
}, [dice])

  function allNewDice () {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6) , 
        locked: false})
    }
    return newDice
  }

  const diceElements = dice.map(die => <Die 
    key={die.id}
    value={die.value}
    locked={die.locked}
    toggleLocked={() => toggleLocked(die.id)}
    />)
  
  function rollDice() {
    setScore(score + 1)

    

    setDice(oldDice => oldDice.map(die => {
      if (die.locked) return die
      return {...die, value: Math.ceil(Math.random() * 6)}
    }))

    if (Tenzies) {
      setTenzies(false)
      setDice(allNewDice())
      if (highScore === 0 || score < highScore) {
        setHighScore(score);
      }
      setScore(0)
      
    }

  }

  function toggleLocked(id) {
    const newDice = dice.map(die => {
      if (die.id === id) {
        return {...die, locked: !die.locked}
      }
      return die
    })
    setDice(newDice)

  }

  function setHighScore(newHighScore) {
    localStorage.setItem("highScore", newHighScore);
    // set the state variable
    setHighScoreState(newHighScore);
}

React.useEffect(() => {
  const storedHighScore = localStorage.getItem("highScore");
  if (storedHighScore) {
    setHighScoreState(Number(storedHighScore));;
  }
}, [
]);

function resetHighScore() {
  localStorage.removeItem("highScore");
  setHighScoreState(0);
}



  return (
    <main>
      {Tenzies && <Confetti width={width}
      height={height}/>}
      <header className='title--box'>
        <h1 className='title--h1'>{Tenzies ? "You win!!" :"Tenzies"}</h1>
        <p className='title--p'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </header>
      <div className='score--box'>
        <p className='score--p'>Score: <span>{score}</span></p>
        <p className='score--p' onClick={() => {
    setHighScoreClickCount(highScoreClickCount + 1);
    if (highScoreClickCount === 1) {
        resetHighScore();
        setHighScoreClickCount(0);
    }
}}>High Score: <span>{highScore}</span></p>
      </div>
      <section className='Dice--container'>
        {diceElements}
      </section>
      <button
      className='roll-dice'
        onClick={rollDice}
      >{Tenzies  ? "Reset" : "Roll"
      }</button>
    </main>
  )
}
