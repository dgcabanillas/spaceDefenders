import React, { Component, PropTypes } from "react";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import Landing from '../pages/landing/landing.jsx';

export default class Index extends Component {
	render(){
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Landing}/>
			</Router>
		)
	}
}