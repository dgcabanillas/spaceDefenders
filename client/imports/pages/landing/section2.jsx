import React, { Component } from 'react';
import { browserHistory } from "react-router";

const path = "../../../../../img/"

export default class Section2 extends Component{
	render(){
		return(
			<div className="section-2">
				<p> Choose your ship </p>
				<div className="section-2-ship">
					<div className="ship-card">
						<img src={path + "nave1.png"} alt="ship" />
					</div>
					<div className="ship-card">
						<img src={path + "nave2.png"} alt="ship" />
					</div>
					<div className="ship-card">
						<img src={path + "nave3.png"} alt="ship" />
					</div>
					<div className="ship-card">
						<img src={path + "nave4.png"} alt="ship" />
					</div>
				</div>
			</div>
		);
	}
}
