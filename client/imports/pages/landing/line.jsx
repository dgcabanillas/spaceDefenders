import React, { Component } from 'react';
import { browserHistory } from "react-router";

const path = "../../../../../img/"

export default class Line extends Component{
	render(){
		return(
			<div className="landing-line">
				<img src={path + "line.png"} alt="line" />
				<img src={path + "triangle.png"} alt="line" />
			</div>
		);
	}
}
