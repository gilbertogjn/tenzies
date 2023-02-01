import React from "react"
import { nanoid } from "nanoid"

export default function Die(props) {
    let style = {
        backgroundColor: props.isHeld ? "#59E391" : "#fff"
    }

    function diceDots() {
        const dots = []
        for(let i = 0; i < props.value; i++) {
            dots.push(
                <span 
                    key={nanoid()}
                    className='dot'
                >
                </span>
            )
        }
        return dots
    }

    return (
        <div 
            className={"die" + props.value}
            style={style}
            onClick={props.holdDice}
        >
            {diceDots()}
        </div>
    )
}