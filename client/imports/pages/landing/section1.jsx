import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { browserHistory } from "react-router";
import { Accounts } from 'meteor/accounts-base';

export default class Section1 extends Component{
	render(){
		return(
			<div className="section-1">
				<h1>
					Space <br /> Defenders
				</h1>
				<p>
					Become the best space pilot and conquer the universe.
				</p>
				<button onClick={ this.props.update.bind(this,"open") }>
					Join Us Now!
				</button>
			</div>
		);
	}
}
