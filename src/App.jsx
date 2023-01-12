import React from 'react'
import Die from './components/Die'
import "./css/App.css"
import {nanoid} from "nanoid"

export default function App() {

const [dice , setDice] = React.useState(allNewDice())

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
    key-={die.id}
    value={die.value}
    locked={die.locked}
    toggleLocked={() => toggleLocked(die.id)}
    />)
  
  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      if (die.locked) return die
      return {...die, value: Math.ceil(Math.random() * 6)}
    }))

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

  return (
    <main>
      <header className='title--box'>
        <h1 className='title--h1'>Tenzies</h1>
        <p className='title--p'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </header>
      <section className='Dice--container'>
        {diceElements}
      </section>
      <button
      className='roll-dice'
        onClick={rollDice}
      >Roll</button>
    </main>
  )
}
