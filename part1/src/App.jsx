
import { useState } from "react";

const Header = (props) => {
  const {course} = props;
  return (
    <h1>{course}</h1>
  )
}

const Content = (props) => {

  const Part = (props) => {
    console.log('props part', props.part);
    const { name, exercises} = props.part;
    return (
      <p>{ name } { exercises }</p>
    )
  }

  const [ part1, part2, part3 ] = props.parts;
  return (
    <>
      <Part part = {part1} />    
      <Part part = {part2} />
      <Part part = {part3} />    
    </>
  )
}

const Total = (props) => {
  const [ part1, part2, part3 ] = props.parts;
  const total = part1.exercises + part2.exercises + part3.exercises;  
  return (    
    <p>Number of exercises {total}</p>    
  )
}

/* part1C: Component state, event handlers */
const Display = ({value, text, unit=''}) => (<p>{text} {(!isNaN(value) ? value : 0)} {unit}</p>);
const MyButton = ( { handlerClick, btnText } ) => (<button onClick={handlerClick}>{ btnText }</button>); 

const ShowSeconds = () => {
  const [counter, setCounter] = useState(0);
  setTimeout(
    () => setCounter(counter + 1),
    1000
  )    
  console.log('Rendering ...', counter);
  return (
    <Display value={counter} text="seconds: " />
  )
}

const ManualCounter = () => {
  const [manualCounter, setManualCounter] = useState(0);

  const increaseValue = () => setManualCounter(manualCounter + 1);
  const decreaseValue = () => setManualCounter(manualCounter - 1);
  const setToZero = () => setManualCounter(0);
  return (
    /* part1C: Component state, event handlers */
    <>
      <Display value={manualCounter} text="Manual Counter: " />
      <MyButton handlerClick = { increaseValue } btnText = "Increase value" />
      <MyButton handlerClick = { setToZero } btnText = "Set to zero" />      
      <MyButton handlerClick = { decreaseValue } btnText = "Decrease value" />    
    </>
  )
}

/* part 1 d Complex state */
const ClicksLog = () => {  
  
  const [ clicks, setClicks ] = useState({left: 0, right: 0 });   
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0)
  
  const handleLeftClick = () => {
    const updatedLeft = clicks.left + 1;
    setClicks({
      left: updatedLeft,
      right: clicks.right
    });
    /* setTotal(clicks.left + clicks.right); This doesn't work */
    setTotal(updatedLeft + clicks.right);    
    setAll(allClicks.concat('L'));
  }

  const handleRightClick = () => {
    const updatedRight = clicks.right + 1;
    /* With object spread ... */
    setClicks({
      ...clicks,
      right: updatedRight
    });
    setTotal(clicks.left + updatedRight);
    setAll(allClicks.concat('R'));
  }

  return (
    <div>
      <Display value={clicks.left} text="lefts clicks: " />
      <Display value={clicks.right} text="rights clicks: " />
      <Display value={total} text="Total clicks: " />
      <MyButton handlerClick = { handleLeftClick } btnText = "Left" /> 
      <MyButton handlerClick = { handleRightClick } btnText = "Right" />    
      {(allClicks.length > 0)
      ? <Display value={allClicks.join(' ')} text="button press history: " />
      : <p>the app is used by pressing the buttons</p>
      }  
    </div>
  )
}

/* const Display = ({value, text, unit=''}) => (<p>{text} {(!isNaN(value) ? value : 0)} {unit}</p>); */
const StatisticLine = ({value, text, unit=''}) => {
  return (
    <tr>
      <td>{text}</td><td>{value}{unit}</td>
    </tr>
  )
}

const Anecdotes = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]   
  const [selected, setSelected] = useState(0);
  //const [votes, setVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0});
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [mostVoted, setMostVoted] = useState([-1]);

  const generateRandom = (min, max) => {
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min;    
  }

  const handlerNextAnecdote = () => {
    const nextAnecdote = generateRandom(0, anecdotes.length - 1);
    setSelected(nextAnecdote);
  }

  /* 1.13*: anecdotes step 2 */
  const handlerVoteAnecdote = () => {    
    const updatedVotes = [...votes] ;   
    //console.log(updatedVotes) 
    updatedVotes[selected] += 1;    
    setVotes(updatedVotes);    
    const updatedMax = Math.max(...updatedVotes);
    const updatedMaxIndex = updatedVotes.indexOf(updatedMax);
    //console.log(updatedVotes, updatedMax, updatedMaxIndex);
    setMostVoted(updatedMaxIndex);
  }
  
  
  return (
    <>
      <h2>Anecdotes</h2>
      <p>
        {anecdotes[selected]} has {votes[selected]} votes
      </p>
      <MyButton btnText="vote" handlerClick={handlerVoteAnecdote}/>
      <MyButton btnText="next anecdote" handlerClick={handlerNextAnecdote}/>

      {/* 1.14*: anecdotes step 3 */}
      <h3>Anecdote with most votes</h3>
       {(mostVoted > -1)
        ?<p>{anecdotes[mostVoted]}</p>
        :<p>No votes yet!</p>
      } 
    </>
  )
}

/* 1.8: unicafe step 3  */
const Statistics = ({good, neutral, bad}) => {  
  const total = good + neutral + bad;
  const average = ((good * 1) + (neutral * 0) + (bad * -1)) / total;
  const positive = (good / total) * 100;

  /*1.10: unicafe step 5 I have already made, but I called it, 'Display' instead of 'StatisticLine'. 
    1.11* But now I see it must to be a table ... ;) */
  return (
  <table>          
    <tbody>
      <StatisticLine text="good " value={good} />
      <StatisticLine text="neutral " value={neutral} />
      <StatisticLine text="bad " value={bad} />
      <StatisticLine text="all " value={good + neutral + bad} />
      <StatisticLine text="average " value={average}/>
      <StatisticLine text="positive " value={positive} unit="%"/>      
    </tbody>
  </table>)
}

const App = () => { 
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedBack</h1>
      <MyButton btnText="good" handlerClick={()=>setGood(good + 1)}/>
      <MyButton btnText="neutral" handlerClick={()=>setNeutral(neutral + 1)}/>
      <MyButton btnText="bad" handlerClick={()=>setBad(bad + 1)}/>
      <h2>statistics</h2>
      { /* 1.9: unicafe step 4 */
        (good !== 0 | neutral !== 0 | bad !== 0)
        ? <Statistics good={good} neutral={neutral} bad={bad} />
        : <p>No feedback given</p>
      }
      <Anecdotes />
    </div>
  )
}

export default App