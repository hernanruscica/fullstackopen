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
    
    return (
        <>            
            { parts.map(part=><Part key={part.id} part={part} />) }
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
