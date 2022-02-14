import React from 'react'
import Bem from './Bem'
import {Link} from 'react-router-dom'

export default function Task4() {

 let bem = new Bem()
 console.log("first entry :  bem.block('list').element('item').modifier('active').build()")
 console.log("result :" +
        bem
        .block('list')
        .element('item')
        .modifier('active')
        .build()
 )
console.log("second entry :  bem.element('item').modifier('active').build()")
console.log("result :" +
    bem
   .element('item')
   .modifier('active')
   .build()
)
console.log("third entry :  bem.block('list').modifier('active').build()")
console.log("result :" +
    bem
   .block('list')
   .modifier('active')
   .build()
)
console.log("third entry :  bem.block('list').build()")
console.log("result :" +
    bem
   .block('list')
   .build()
)
  return (
    <div>
        <h4>Task4</h4>
        <p>Please visit Console</p>
        <p><Link to="/">Go back</Link></p>
    </div>
  )
}
