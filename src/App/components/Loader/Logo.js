import React from 'react'

export default function Logo(props) {
    return (
        <div className="text-center text-warning ">
            <span className={props.className} style={{ backgroundColor: "black", fontWeight: props.fontWeight }} > DIF</span>
        </div>
    )
}
