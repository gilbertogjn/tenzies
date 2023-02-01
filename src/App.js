import './App.css';
import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [numRolls, setNumRolls] = React.useState(0)
  const [sec, setSec] = React.useState('00')
  const [min, setMin] = React.useState('00')

  React.useEffect(() => {
    // Check if all array elements have .isHeld set "true"
    const allHeld = dice.every(die => die.isHeld)
    // Check if all array elements are the same
    const allSame = dice.every(die => die.value === dice[0].value)
    if (allHeld && allSame) {
      setTenzies(true)
      clearInterval(id.current)
    }
  }, [dice])

  function generateNewId() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewId())
    }
    return newDice
  }

  function rollDice() {
    if (!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateNewId()
      }))
      setNumRolls(prevRolls => prevRolls + 1)
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setNumRolls(0)
      clearTime()
      runTime()
    }
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  const diceElements = dice.map(
    die => <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  )

  let secValue = 0
  let minValue = 0

  function runTime() {
    id.current = setInterval(() => {
      if (secValue < 59) {
        secValue++
        setSec(secValue < 10 ? `0${secValue}` : secValue)
      } else {
        secValue = '00'
        setSec(secValue)
        minValue++
        setMin(minValue < 10 ? `0${minValue}` : minValue)
      }
    }, 1000)
  }

  function clearTime() {
    setSec('00')
    setMin('00')
  }

  let id = React.useRef()

  React.useEffect(() => {
    runTime()
    return () => clearInterval(id.current)
  }, [])

  let items = {}

  window.onbeforeunload = function() {
    localStorage.clear();
 }

  return (
    <main>
      <header>
        <h1 className='title'>Tenzies</h1>
        <p className='description'>
          Roll until all dice are the same.
          Click each die to freeze it at its
          current value between rolls.
        </p>
      </header>
      <div className='container'>
        {diceElements}
      </div>
      <button className='btn-roll' onClick={rollDice}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>
      <footer>
        <span className='num-rolls'>Number of rolls: {numRolls}</span>
        <span className='time'>Time: {min}:{sec}</span>
      </footer>
      {tenzies && <Confetti />}
    </main>
  );
}