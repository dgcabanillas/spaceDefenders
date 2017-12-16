import React, { Component } from 'react';
import { browserHistory } from "react-router";

import './landing.sass';
import Section1   	from './section1.jsx';
import Section2  	from './section2.jsx';
import Line 		from './line.jsx';
import Form 		from './landingform/register_login.jsx';
const path = "../../../../../img/"

export default class Landing extends Component{
	constructor(props){
		super(props);
		this.state = {
			form: "close",
		}
	}
	update(value,e){
		this.setState({ form: value });
	}
	showForm() {
		if(this.state.form === "open") 
			return <Form update = {this.update.bind(this) } /> 
	}

	render(){
		return(
			<div className="landing">
				<img src={path + "landing_background.jpg"} alt="background" />
				<Section1 update = {this.update.bind(this) }/>
				<Section2 />
				<Line />
				{ this.showForm() }
			</div>
		);
	}
}
