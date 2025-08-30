
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
const Display = ({value, text}) => (<p>{text}{value}</p>);
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

const App = () => { 
  /* 1.6: unicafe step 1  */
  
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      code here
    </div>
  )
}

export default App