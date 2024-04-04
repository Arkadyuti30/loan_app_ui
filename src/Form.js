import {React, useState} from 'react'
import './App.css';
import FlatButton from './FlatButton'
import Axios from 'axios'

export default function Form(props, { parentCallback }) {
	const [name, setName] = useState('')
	const [creditScore, setCreditScore] = useState('')
	const [loanAmount, setLoanAmount] = useState('')
	const [income, setIncome] = useState('')
	const [debt, setDebt] = useState('')
	const [employmentStatus, setEmploymentStatus] = useState('')
	const [purpose, setPurpose] = useState('')

	const postData = (e) => {
		e.preventDefault() // prevents reloading page on post.
		if(!name)
			alert(`Name can't be empty!`)
		else if(!creditScore)
			alert(`Credit Score can't be empty`)
		else if(!loanAmount)
			alert(`Loan amount can't be empty`)
        else if(!income)
			alert(`Income can't be empty`)
		else if(!debt)
			alert(`Debt can't be empty`)
		else if(!employmentStatus)
			alert(`Employment status can't be empty`)
        else if(!purpose)
            alert(`Loan purpose can't be empty?`)
		else if (name && creditScore && loanAmount && income && debt && employmentStatus && purpose) { // Post data to server only when all data is available + send data to parent component
			let body = {
				"applicant_name": name,
				"credit_score": parseInt(creditScore),
                "loan_amount": parseFloat(loanAmount),
                "income": parseFloat(income),
                "debt": parseFloat(debt),
                "employment_status": employmentStatus,
                "loan_purpose": purpose
			}
            Axios.post('http://127.0.0.1:8000/post/loan-application', body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Method': 'POST',
                }
            }).then(res => {
				console.log(`Posted data to server ${JSON.stringify(res)}`)
				setName('')
				setCreditScore('')
				setLoanAmount('')
				setIncome('')
				setDebt('')
                setEmploymentStatus('')
                setPurpose('')
			}).catch(err => console.log(`Error while posting data: ${JSON.stringify(err)}`))

			// Call the parent callback function
			// On successful submission of form -> show SuccessBox
        	props.parentCallback({
        		showForm: false,
				formData:{},
        		showSuccessBox: true,
        		showTable: false
        	});
		}
	}

	const updatedData = (e) => {
		let body = {
			"loan_id": props.formData.loan_id,
			"applicant_name": name,
			"credit_score": parseInt(creditScore),
			"loan_amount": parseFloat(loanAmount),
			"income": parseFloat(income),
			"debt": parseFloat(debt),
			"employment_status": employmentStatus,
			"loan_purpose": purpose
		}
		Axios.put(`http://127.0.0.1:8000/update/loan_data`, body, {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Request-Method': 'PUT',
			}
		})
  		.then(res => {
			console.log(`Updated data to server ${JSON.stringify(res)}`)
			setName('')
			setCreditScore('')
			setLoanAmount('')
			setIncome('')
			setDebt('')
            setEmploymentStatus('')
            setPurpose('')
  		}).catch(err => console.log(`Error while posting data: ${JSON.stringify(err)}`))
		// Call the parent callback function
			// On successful submission of form -> show SuccessBox
        	props.parentCallback({
        		showForm: false,
				formData: {},
        		showSuccessBox: true,
        		showTable: false
        	});
	}

    const creditScores = [];
    for (let i = 100; i <= 900; i += 100) {
        creditScores.push({ value: i, label: `${i}` });
    }   

	return(
		<div id="form">
			<form id="form-contents">
				<input type="text" id="form-name" class="broad-input" value={name} onChange={(e) => setName(e.target.value)} name="form-name" placeholder="Enter your name" required/>
                <select id="form-credit-score" class="broad-input" value={creditScore} onChange={(e) => setCreditScore(e.target.value)} required>
                <option value="" selected disabled hidden>Enter credit Score</option>
                    {creditScores.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
				</select>
				<input type="number" id="form-loan-amount" class="broad-input" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} name="form-loan-amount" placeholder="Enter your loan amount" required/>
                <input type="number" id="form-income" class="broad-input" value={income} onChange={(e) => setIncome(e.target.value)} name="form-income" placeholder="Enter your income" required/>
                <input type="number" id="form-debt" class="broad-input" value={debt} onChange={(e) => setDebt(e.target.value)} name="form-debt" placeholder="Enter your current debt" required/>
                <select id="form-employment-status" class="broad-input" value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)} required>
                    <option value="" selected disabled hidden>Your employment status</option>
                    <option value="employed">employed</option>
                    <option value="self-employed">self-employed</option>
                    <option value="unemployed">unemployed</option>
                </select>
                <input type="text" id="form-purpose" class="broad-input" value={purpose} onChange={(e) => setPurpose(e.target.value)} name="form-purpose" placeholder="What is your loan purpose?" required/>

				 {
					props.formData ?
					<FlatButton buttonText="SUBMIT" onClick={updatedData}/> // UPDATE REQUEST
					:
					<FlatButton buttonText="SUBMIT" onClick={postData}/> // POST REQUEST
				}
				
			</form>
		</div>
	)
}