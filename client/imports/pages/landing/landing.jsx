import React, { Component } from 'react';
import { browserHistory } from "react-router";

import './landing.sass';
import Section1   	from './section1.jsx';
import Section2  	from './section2.jsx';
import Header 		from './header.jsx';
import Line 		from './line.jsx';

const path = "../../../../../img/"

export default class Landing extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="landing">
				<img src={path + "landing_background.jpg"} alt="background" />
				<Header />
				<Section1 />
				<Line />
				<Section2 />
			</div>
		);
	}
}
