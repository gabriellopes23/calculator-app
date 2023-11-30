import './Button.css'
import React from 'react'

export default props => {
    let classes = 'button '
    classes += props.del ? 'del' : " "
    classes += props.reset ? 'reset' : " "
    classes += props.equal ? 'equal' : " "

    return (
        <button onClick={e => props.click && props.click(props.label)}
            className={classes}>
            {props.label}
        </button>
    )
}