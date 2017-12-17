import React, { Component } from 'react';
import { browserHistory } from "react-router";
import ReactDOM from 'react-dom';

import './form.sass';

export default class UpdateInfo extends Component{
	componentWillUnmount(){
		const user = Meteor.user();
		if(user && !user.username)
			browserHistory.push("/home/update");
	}
	update(e){
		e.preventDefault();
		let username = $("#add-username").val();
		const data = {
			_id : Meteor.userId(),
			username: username
		}
		Meteor.call('updateUsername', data , (err)=>{
			if( err ) {
				alert(err.error);
			} else {
				browserHistory.push('/home');
			}
		});
	}
	render(){
		return (
			<div className="update-info-form">
				<form onSubmit={this.update.bind(this)}>
					<p>Please set your username.</p>
					<div className="input-field">
						<input type="text" id="add-username" />
						<label htmlFor="add-username">Username: </label>
					</div>
					<button type="submit">update</button>
				</form>
			</div>
		);
	}
}