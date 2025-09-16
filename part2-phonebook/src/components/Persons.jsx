const Persons = ({list, onClick}) => {  
  return(
    <>
    {        
      list.map(item=><p key={item.id}>
        {item.name} {item.number}
        <button onClick={onClick} id={item.id} name={item.name}>delete</button>
      </p>)
    }
    </>
  )
};

export default Persons;