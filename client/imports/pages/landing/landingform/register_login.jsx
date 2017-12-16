import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { browserHistory } from "react-router";

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
	withPassword(e) {
		e.preventDefault();
	}
	crearUsuario(e) {
		e.preventDefault();
	}
	render(){
		return(
			<div id="login-register" style = {{width: window.innerWidth +"px", height: window.innerHeight + "px"}}>
				<button onClick = {this.props.update.bind(this,"close") }> <i className="fa fa-times" aria-hidden="true"></i> </button>
				<div className="forms">
					<form onSubmit={ this.crearUsuario.bind(this) }>
						<h1>Sign Up Now!</h1>
						<input type="text" placeholder="username" id="username"/>
						<input type="password" placeholder="password" id="password"/>
						<input type="password" placeholder="re-password" id="repassword"/>
						<input type="text" placeholder="email adress" id="email"/>
						<button type="submit">REGISTER</button>
					</form>
					<form onSubmit={ this.withPassword.bind(this) }>
						<h1>Sign In</h1>
						<input type="text" placeholder="username" id="username"/>
						<input type="password" placeholder="password" id="password"/>
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
