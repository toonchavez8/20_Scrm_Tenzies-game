import React from 'react'
import "../css/Die.css"

export default function Die(props) {
  return (
    <div 
    className={props.locked ? " Die--face Locked" : "Die--face"}
    onClick={props.toggleLocked}
    >
        <h2>{props.value}</h2>
    </div>
  )
}
