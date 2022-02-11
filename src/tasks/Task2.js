import React, {useState} from 'react'
import {Link} from 'react-router-dom'

export default function Task2() {

    const [state,setState] = useState({
        number_a:{prev:null,current:null},
        number_b:{prev:null,current:null},
        number_c:{prev:null,current:null},
    })

    const [displayTotal,setDisplayTotal] = useState(0)
    
    const handleChange = (evt) =>{
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: { prev : state[evt.target.name].prev,current:value}
        });
    }

    const sum = () =>{

        const total =  Object.values(state).reduce((a, b) => a + parseInt(b.current === "" || isNaN(b.current) ? b.prev : b.current ),0);
        if(isNaN(total)){
            return alert("Please fill up the fields")
        }
        setState({
            number_a:{prev:state.number_a.current === ''? state.number_a.prev:state.number_a.current,current:state.number_a.current},
            number_b:{prev:state.number_b.current === ''? state.number_b.prev:state.number_b.current,current:state.number_b.current},
            number_c:{prev:state.number_c.current === ''? state.number_c.prev:state.number_c.current,current:state.number_c.current},
        })

        setDisplayTotal(total)
    }
  return (
    <div>
        <h2>Task 2</h2>
        <input type="number" onChange={handleChange} name="number_a"/>
        <input type="number" onChange={handleChange} name="number_b"/>
        <input type="number" onChange={handleChange} name="number_c"/>
        <p>Arethmetic Expression : {state.number_a.current === ''? state.number_a.prev:state.number_a.current} + {state.number_b.current === ''? state.number_b.prev:state.number_b.current} + {state.number_c.current === ''? state.number_c.prev:state.number_c.current}</p>
        <p>Total = {displayTotal}</p>
        <button onClick={sum}>Get Sum!</button>

        <p><Link to="/">Go back</Link></p>
    </div>
  )
}
