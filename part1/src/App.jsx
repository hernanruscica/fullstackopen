
const Header = (props) => {
  const {course} = props;
  return (
    <h1>{course}</h1>
  )
}

const Content = (props) => {
  const Part = (props) => {
    const { partName, exercisesQuantity} = props;
    return (
      <p>{ partName } { exercisesQuantity }</p>
    )
  }
  const { part1, part2, part3, exercises1, exercises2, exercises3 } = props;
  return (
    <>
      <Part partName = {part1} exercisesQuantity = {exercises1} />    
      <Part partName = {part2} exercisesQuantity = {exercises2} />
      <Part partName = {part3} exercisesQuantity = {exercises3} />    
    </>
  )
}

const Total = (props) => {
  const {total} = props;
  return (    
    <p>Number of exercises {total}</p>    
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App