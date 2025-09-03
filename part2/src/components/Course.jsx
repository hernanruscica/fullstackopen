const Header = (props) => {
  const {title} = props;
  return (
    <h1>{title}</h1>
  )
}

const Part = ({part}) => {    
    const { name, exercises, id} = part;
    //console.log(id);    
    return (
        <p>{ name } { exercises } </p>
    )
}

const Content = ({parts}) => {        
    
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);    
    return (
        <>            
            { parts.map(part=><Part key={part.id} part={part} />) }
            <p>Total of { totalExercises } exercises</p>
        </>
    )
}

const Course = ({course}) => {
    return(
        <>
            <Header title={course.name} />
            <Content parts = {course.parts}/>
        </>
    )
}
export default Course;
