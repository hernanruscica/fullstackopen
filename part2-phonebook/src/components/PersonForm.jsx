const PersonForm = ({title ='Form Title', onSubmit, inputs, btnText}) => {
  return (
    <form onSubmit={onSubmit}>     
        <h3>{title}</h3> 
        { (inputs.length) > 0 ?
          inputs.map(input=>(
            <div key={input.id}>
              {input.name}: <input key={input.id} value={input.value} onChange={input.onChange}/>
            </div>
          ))
          : 'There isnt any input to show'
        }        
        <div>
          <button type="submit">{btnText}</button>
        </div>
      </form>
  )
};
export default PersonForm;