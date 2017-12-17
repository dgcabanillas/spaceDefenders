import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { browserHistory } from "react-router";
import { Accounts } from "meteor/accounts-base";

const path = "../../../../../img/";
import './form.sass';

export default class LoginRegister extends Component{
	constructor(props){
		super(props);
	}
	withFacebook(e) {
		e.preventDefault();
		Meteor.loginWithFacebook((er)=>{
			if(er) {
				alert(er.reason);
			} else {
				browserHistory.push("/home");
			}
		});
	}
	withTwitter(e) {
		e.preventDefault();
		Meteor.loginWithTwitter((er)=>{
			if(er) {
				alert(er.reason);
			} else {
				browserHistory.push("/home");
			}
		});
	}
	crearUsuario(e){
		e.preventDefault();
		let username = $("#r-username").val().trim();
		let password = $("#r-password").val().trim();
		let repassword = $("#r-repassword").val().trim();
		let email = $("#r-email").val().trim();
		let data = {
			username: username,
			password: password,
			email: email,
			status: "nothing",
			profilePicture: "../../../../../img/default_img.png"
		}
		Meteor.call('crearUsuario',data, (err,res)=>{
			if (err){
				alert(err.error);
			} else {
				Meteor.loginWithPassword(username, password, (err,res)=>{
					if (err){
						alert(err.error);
					} else {
						console.log("loged");
						browserHistory.push('/home');
					}
				});
				browserHistory.push('/home');
			}
		});
	}
	withPassword(e) {
		e.preventDefault();
		let username = $("#l-username").val().trim();
		let password = $("#l-password").val().trim();
		Meteor.loginWithPassword(username, password, (err)=>{
			if (err){
				console.log(err.message);
			} else {
				console.log("loged");
				browserHistory.push('/home');
			}
		});
		e.preventDefault();
	}
	render(){
		return(
			<div id="login-register" style = {{width: window.innerWidth +"px", height: window.innerHeight + "px"}}>
				<button onClick = {this.props.update.bind(this,"close") }> <i className="fa fa-times" aria-hidden="true"></i> </button>
				<div className="forms">
					<form onSubmit={ this.crearUsuario.bind(this) }>
						<h1>Sign Up Now!</h1>
						<input type="text" placeholder="username" id="r-username"/>
						<input type="password" placeholder="password" id="r-password"/>
						<input type="password" placeholder="re-password" id="r-repassword"/>
						<input type="email" placeholder="email adress" id="r-email"/>
						<button type="submit">REGISTER</button>
					</form>
					<form onSubmit={ this.withPassword.bind(this) }>
						<h1>Sign In</h1>
						<input type="text" placeholder="username" id="l-username"/>
						<input type="password" placeholder="password" id="l-password"/>
						<button type="submit"> LOGIN </button>
						<button onClick={this.withFacebook.bind(this)}>
							<i className="fa fa-facebook" aria-hidden="true"></i> Facebook 
						</button>
						<button onClick={this.withTwitter.bind(this)}>
							<i className="fa fa-twitter" aria-hidden="true"></i> Twitter 
						</button>
					</form>
				</div>
			</div>
		);
	}
}
