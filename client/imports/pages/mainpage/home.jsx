import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { browserHistory } from "react-router";

import './home.sass';
const path = "../../../../../img/"

export default class Home extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="home">
			</div>
		);
	}
}
