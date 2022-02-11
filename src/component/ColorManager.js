import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

export default class ColorManager extends Component {
    constructor(props) {
        super(props)
        this.get = this.get.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.reset = this.reset.bind(this);
        this.state = {counter:this.props.allColors.findIndex(i => i === this.get())}
    }

    get(){
        return this.props.selected
    }

    next(){
        
        this.setState(state => state.counter === this.props.allColors.length - 1 ? {counter :  0} :{ counter : state.counter + 1})
        
    }

    prev(){
        
        this.setState(state => state.counter === 0 ? {counter :  this.props.allColors.length - 1} :{ counter : state.counter - 1})
        
    }

    reset(){
        
        this.setState({counter:this.props.allColors.findIndex(i => i === this.get())})
    }

    render() {
    return (
        <li key={this.get()} style={{ padding:"6em",margin:"10px",backgroundColor:this.props.allColors[this.state.counter]}}> 
           
           <Button className="btn btn-secondary" onClick={this.next}> next </Button>
           <Button className="btn btn-secondary" onClick={this.prev}> prev </Button>
           <Button className="btn btn-secondary" onClick={this.reset}> reset </Button>
        </li> 
    )
  }
}
