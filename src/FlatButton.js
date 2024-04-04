import React from 'react'
import './App.css';


export default function FlatButton(props) {
	return(
		<div id="flat-button" onClick={props.onClick}>
			<span>{props.buttonText}</span>
		</div>
	)
}