import React, { Component } from 'react';
import { browserHistory } from "react-router";

import './header.sass';

export default class Header extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className="landing-header">
				<div className="header-title">
					<h1>
						Space Defenders
					</h1>
				</div>
				<div className="header-sign">
					<button>
						JOIN US!
					</button>
				</div>
			</div>
		);
	}
}