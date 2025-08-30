
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
    </div>
  )
}

export default App