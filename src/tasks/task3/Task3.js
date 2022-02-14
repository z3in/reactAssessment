import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import Fighter from './Fighter'

export default function Task3() {
    /*
        The base damage of a fighter is 10. Each point of strength increases damage by 5, agility decreases  damage by 3. 
        The base defense of a fighter is 10. Each point of agility increases defence by 5, strength increases  defence by 3, vitality increases defence by 1. 
        The base hp of a fighter is 50. Each point of vitality increases hp by 10, strength increases hp by 5,  agility increases hp by 3. 
    */
    const [fighter1,setFighter1] = useState({points:30,str:0,agi:0,vit:0,name:""})
    const [fighter2,setFighter2] = useState({points:30,str:0,agi:0,vit:0,name:""})
    const [fighterData,setFighterData] = useState([])
    const [battleLog,setBattleLog] = useState([])
    

    
    const changeFighter1 = (evt) =>{
        if(evt.target.value > 30){
            alert('Value cannot exceed 30')
            return 
        }
        if(isNaN(evt.target.value) || evt.target.value === ""){
            setFighter1(fight=> ({...fight,
                [evt.target.name]: 0
            }));
            return
        }
        setFighter1(fight=> ({...fight,
            [evt.target.name]: parseInt(evt.target.value)
        }));
        setFighter1(fight => ({...fight,points: 30 - ( fight.str + fight.agi + fight.vit )}))
    }
    const changeFighter2 = (evt) =>{
        if(evt.target.value > 30){
            alert('Value cannot exceed 30')
            return 
        }
        if(isNaN(evt.target.value) || evt.target.value === ""){
            setFighter2(fight=> ({...fight,
                [evt.target.name]: 0
            }));
            return
        }
        setFighter2(fight=> ({...fight,
            [evt.target.name]: parseInt(evt.target.value)
        }));
        setFighter2(fight => ({...fight,points: 30 - ( fight.str + fight.agi + fight.vit )}))
    }

    const createFighter1 = () =>{
        const player = new Fighter(fighter1.name,fighter1.str,fighter1.agi,fighter1.vit)
        setFighterData([...fighterData, player]);
        document.querySelector("#create_btn_1").disabled = true
        document.querySelector("#create_btn_1").innerHTML = `FIGHTER ${player.getName()} CREATED`
    }

    const createFighter2 = () =>{
        let player = new Fighter(fighter2.name,fighter2.str,fighter2.agi,fighter2.vit)
        setFighterData([...fighterData, player]);
        document.querySelector("#create_btn_2").disabled = true
        document.querySelector("#create_btn_2").innerHTML = `FIGHTER ${player.getName()} CREATED`
    }
    var details = []
    const startFight = (playerTurn) =>{
            let defending = playerTurn ? 1 : 0
            let attacker = playerTurn ? 0 : 1
            fighterData[defending].takeDamage(fighterData[attacker].dealDamage())
            details.push(<p key={details.length + 1}>{fighterData[attacker].getName()} attacked {fighterData[defending].getName()} and received {fighterData[attacker].dealDamage()} damage. {fighterData[defending].getName()} : {fighterData[defending].getHp()} / {fighterData[defending].getTotalHp()} HP </p>)
            if(fighterData[defending].getHp() === 0){
                details.push(<h4 key={details.length + 1}>Winner {fighterData[attacker].getName()}</h4>)
                return setBattleLog(details)
            }
            startFight(!playerTurn)
}
    return (
        <div>
            <h2>Task 3</h2>
            <p><Link to="/">Go back</Link></p>


            <div style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
            <div style={{width:"30%",border:"1px solid #000",display:"flex",flexDirection:"column",padding:"1.2em"}}>
            Name : <input type="text" name="name" onChange={changeFighter1} style={{marginBottom:"10px"}} placeholder="Please Enter Fighter Name"/>
            <p>Distributable Points : {fighter1.points}</p> 
            Strength : <input name="str" value={fighter1.str} onChange={changeFighter1} style={{marginBottom:"10px"}} max="30" placeholder="Strength"/>
            Vitality : <input value={fighter2.agi}  name="agi" onChange={changeFighter1} style={{marginBottom:"10px"}}  max="30" placeholder="Vitality"/>
            Agility : <input value={fighter2.vit}  name="vit" onChange={changeFighter1} style={{marginBottom:"10px"}} max="30" placeholder="Agility"/>
            <button style={{padding:"1em 2em"}} onClick={() => createFighter1()} id="create_btn_1">Create Fighter #1</button>

            </div>
            <div style={{width:"30%",border:"1px solid #000",display:"flex",flexDirection:"column",padding:"1.2em"}}>
                
                <h4>Battle Log</h4>
                <button style={{padding:"1em 2em"}} onClick={()=> startFight(true)}>Start Fight</button>
                <hr/>
                <div>
                    {battleLog}
                </div>
            </div>
            <div style={{width:"30%",border:"1px solid #000",display:"flex",flexDirection:"column",padding:"1.2em"}}>
            Name : <input type="text" name="name" onChange={changeFighter2} style={{marginBottom:"10px"}} placeholder="Please Enter Fighter Name"/>
            <p>Distributable Points : {fighter2.points}</p>
            Strength : <input type="number" value={fighter2.str}  name="str" onChange={changeFighter2} style={{marginBottom:"10px"}} placeholder="Strength"/>
            Vitality : <input type="number" value={fighter2.agi} name="agi" onChange={changeFighter2} style={{marginBottom:"10px"}} placeholder="Vitality"/>
            Agility : <input type="number" value={fighter2.vit} name="vit" onChange={changeFighter2} style={{marginBottom:"10px"}} max="30" placeholder="Agility"/>
            <button style={{padding:"1em 2em"}} onClick={() => createFighter2()}  id="create_btn_2">Create Fighter #2</button>
            
            </div>
            </div>

            
        </div>
    )
}
