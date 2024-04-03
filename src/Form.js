import {React, useState} from 'react'
import './App.css';
import FlatButton from './FlatButton'
import Axios from 'axios'

export default function Form(props, { parentCallback }) {
	const [name, setName] = useState('')
	const [creditScore, setCreditScore] = useState('')
	const [place, setPlace] = useState('')
	const [travellers, setTravellers] = useState('')
	const [budget, setBudget] = useState('')

	const postData = (e) => {
		e.preventDefault() // prevents reloading page on post
		const emailValidationRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		if(!name)
			alert(`Name can't be empty!`)
		else if(!email)
			alert(`Email can't be empty`)
		else if(!emailValidationRegex.test(email))
			alert(`Please enter a valid email`)
		else if(!place)
			alert(`Where do you want to go? Please select from the dropdown.`)
		else if(!travellers)
			alert(`Please select the number of Travellers`)
		else if(!budget)
			alert(`Please select the Budget`)
		else if (name && email && place && travellers && budget) { // Post data to server only when all data is available + send data to parent component
			Axios.post('https://travel-backend-c90r.onrender.com/submit/form', {
				name,
				email,
				place,
				travellers,
				budget
			}).then(res => {
				console.log(`Posted data to server ${JSON.stringify(res)}`)
				setName('')
				setEmail('')
				setPlace('')
				setTravellers('')
				setBudget('')
			}).catch(err => console.log(`Error while posting data: ${JSON.stringify(err)}`))

			// Call the parent callback function
			// On successful submission of form -> show SuccessBox
        	props.parentCallback({
        		showForm: false,
        		showSuccessBox: true,
        		showTable: false
        	});
		}
	}
	return(
		<div id="form">
			<form id="form-contents">
				 <input type="text" id="form-name" class="broad-input" value={name} onChange={(e) => setName(e.target.value)} name="form-name" placeholder="Enter your name" required/>
				 <input type="text" id="form-email" class="broad-input" value={email} onChange={(e) => setEmail(e.target.value)} name="form-email" placeholder="Enter your email" required/>
				 <select id="form-place" class="broad-input" value={place} onChange={(e) => setPlace(e.target.value)} required>
				  <option value="" selected disabled hidden>Where do you want to go?</option>
				  <option value="India">India</option>
				  <option value="Africa">Africa</option>
				  <option value="Europe">Europe</option>
				 </select>
				 <select id="form-travellers" class="broad-input" value={travellers} onChange={(e) => setTravellers(e.target.value)} required>
				  	<option value="" selected disabled hidden>Travellers</option>
				  	<option value="1">1</option>
				  	<option value="2">2</option>
				  	<option value="3">3</option>
				  		<option value="4">4</option>
				  		<option value="5">5</option>
				  		<option value="6">6</option>
				  		<option value="7">7</option>
				  		<option value="8">8</option>
				  		<option value="9">9</option>
				  	</select>
				  	<div id="budget-wrapper">
				  		<div id="currency">🇺🇸 USD</div>
				  		<select id="form-budget" value={budget} onChange={(e) => setBudget(e.target.value)} required>
				  			<option value="" selected disabled hidden>Budget per person</option>
				  			<option value="1000-2000">1000-2000</option>
				  			<option value="2000-3000">2000-3000</option>
				  			<option value="3000-4000">3000-4000</option>
				  			<option value="4000-5000">4000-5000</option>
				  			<option value="5000-6000">5000-6000</option>
				  			<option value="6000-7000">6000-7000</option>
				  			<option value="7000-8000">7000-8000</option>
				  			<option value="8000-9000">8000-9000</option>
				  			<option value=">9000">>9000</option>
				  		</select>
				  	</div>
				  	<FlatButton buttonText="SUBMIT" onClick={postData}/>
			</form>
		</div>
	)
}