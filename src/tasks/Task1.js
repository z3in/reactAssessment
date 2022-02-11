import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

import ColorManager from '../component/ColorManager'

export default function Task1() {
    
    const [colors,setColors] = useState([
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "indigo",
        "violet"
    ])
    
    const [ colorArray, setColorArray ] = useState([])
    const [ colorList, setColorList ] = useState([])

    const initColor = () =>{
        const check_radio = document.querySelector("input[name=color]:checked");
        if(colorArray.length === colors.length){
            return alert("all colors has been selected")
        }
        let data = null
        if(check_radio){
            data = check_radio.value
            let match = colorArray.findIndex(i => i === data)
            if(match > -1){
                return alert("this color has been selected")
            }
        }
        createColorManager(data)
    }

    const createColor = () =>{

        const new_color = colors[Math.floor(Math.random() * colors.length)]
        const color_match = colorArray.findIndex(i => i === new_color)
        if(color_match < 0 ){
            return new_color
        }
        if(color_match > -1){
            return createColor()
        }
    }

    const createColorManager = (def_color) => {
        if(def_color == null){
            def_color = createColor()
        }
        setColorArray([...colorArray,def_color ])
        setColorList([...colorList,<ColorManager key={def_color} allColors = {colors} selected={def_color} />])
    }

    return (
        <>

            <h2>Task 1</h2>
            <ul style={{ listStyle : "none",width:"100%",padding:"0",display:"flex",flexWrap:"wrap"}}>
                {colorList}
            </ul> 
            {colors.map(item =>  <div style={{display:"inline-block"}} key={item}><input key={item} type="radio" id={item} value={item} name="color"/><label htmlFor={item}>{item}</label></div> )}


            <p><Button onClick={initColor}>Create Color Manager</Button></p>


            <p><Link to="/">Go back</Link></p>
        </>
    )
}
