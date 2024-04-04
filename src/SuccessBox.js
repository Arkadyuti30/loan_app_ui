import React from 'react'
import './App.css';
import check_mark from './media/check_mark.gif'
import FlatButton from './FlatButton'

export default function SuccessBox(props, parentCallback) {
	const openForm = () => {
		props.parentCallback({
			showForm: true,
			formData: {},
			showSuccessBox: false,
			showTable: false
		});
	}

	const openTable = () => {
		props.parentCallback({
			showForm: false,
			formData: {},
			showSuccessBox: false,
			showTable: true
		});
	}

	return(
		<div id="success-box">
			<img src={check_mark} width="200" height="200"/>
			<span id="submit-text">Submitted!</span>
			<FlatButton buttonText="Submit another request" onClick={openForm}/>
			<FlatButton buttonText="See all  submissions" onClick={openTable}/>
		</div>
	)
}
