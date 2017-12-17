import React, { Component } from 'react';
import { browserHistory } from "react-router";
import ReactDOM from 'react-dom';

import './form.sass';

export default class AddMoney extends Component{
	componentWillUnmount(){
		const user = Meteor.user();
		if(user && !user.username)
			browserHistory.push("/home/update");
	}
	update(e){
		e.preventDefault();
		let money = $("#add-money").val();
		const data = {
			_id : Meteor.userId(),
			money: money
		}
		Meteor.call('addMoney', data , (err,res)=>{
			if( err ) {
				alert(err.error);
			} else {
				alert(res);
			}
		});
	}
	render(){
		return (
			<div className="update-info-form">
				<form onSubmit={this.update.bind(this)}>
					<p>Add money to your account</p>
					<div className="input-field">
						<input type="text" id="add-money" />
						<label htmlFor="add-money">write quantity: </label>
					</div>
					<button type="submit">update</button>
				</form>
			</div>
		);
	}
}