import React, { Component } from 'react';
import { browserHistory } from "react-router";

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
			</div>
		);
	}
}
