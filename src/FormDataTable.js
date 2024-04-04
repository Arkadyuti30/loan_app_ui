import {React, useEffect, useState} from 'react'
import './App.css';
import Axios from 'axios'
import cross_button from './media/cross_button.svg'

export default function FormDataTable(props, parentCallback) {
	const [data, setData] = useState([])
	useEffect(() => {
		Axios.get('http://127.0.0.1:8000/get/all/loan-applications')
		.then(res => {
			console.log(`Got data from server ${res.data}`)
			setData(res.data)
		}).catch(err => console.log(`Error while getting data: ${err}`))
	}, [])

	const openSuccessBox = () => {
		props.parentCallback({
			showForm: false,
			formData: {},
			showSuccessBox: true,
			showTable: false
		});
	}

	const deleteRow = (loan_id) => {
		let delete_confirmation = window.confirm(`Are you sure you want to delete the data for loan id: ${loan_id}?`)
  		if (delete_confirmation) {
			Axios.delete(`http://127.0.0.1:8000/delete/loan-data/${loan_id}`)
  			.then(response => {
    			console.log(`Deleted loan data with id ${loan_id}`);
				// Update data state after successful deletion
				const updatedData = data.filter(row => row[0] !== loan_id); // Filter out deleted row
				setData(updatedData);
  			})
  			.catch(error => {
    			console.error(error);
  			});
		}
	}

	const updatedRow = (row) => {
		props.parentCallback({
			showForm: true,
			formData: structureDataForForm(row),
			showSuccessBox: false,
			showTable: false
		});
	}

	const structureDataForForm = (row) => {
		let formData = {}
		formData["loan_id"] = row[0]
		formData["applicant_name"] = row[1]
		formData["credit_score"] = row[2]
		formData["loan_amount"] = row[3]
		formData["loan_purpose"] = row[4]
		formData["income"] = row[5]
		formData["employment_status"] = row[6]
		formData["debt"] = row[7]
		formData["loan_status"] = row[8]
	}

	const headers = ["ID", "Name", "Credit Score", "Loan Amt", "Purpose", "Income", "Employment Status", "Debt", "Loan Status", "Update", "Delete"]

	const tableData = data.map((row, index) => {
		return(
			<tr>
				{row.map((cell_data, index) => (
                    <td key={index}>
                        {cell_data}
                    </td>
                ))}
				<td className='link-button' onClick={() => updatedRow(row[0])}>
					Update
				</td>
				<td className='link-button' onClick={() => deleteRow(row[0])}>
					Delete
				</td>
			</tr>
		)
	})

	return(
		<div id="table-wrapper">
			<div id="cross-button-container" onClick={openSuccessBox}>
				<img src={cross_button}/>
			</div>
			<table>
				<tr>
				{headers.map((header, index) => (
                    <th key={index}>
                        {header}
                    </th>
                ))}
				</tr>
				{tableData}
			</table>
		</div>
	)
}