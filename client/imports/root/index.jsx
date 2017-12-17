import React, { Component, PropTypes } from "react";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import UpdateInfo 	from '../pages/mainpage/form/updateinfo.jsx';
import Spacecrafts 	from '../pages/mainpage/principal/spacecrafts.jsx';
import Store 	from '../pages/mainpage/store/store.jsx';
import Landing from '../pages/landing/landing.jsx';
import Home from '../pages/mainpage/home.jsx';

export default class Index extends Component {
	render(){
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Landing}/>
				<Route path="/home" component={Home}>
					<IndexRoute component={Spacecrafts}/>
					<Route path="update" component={UpdateInfo} />
					<Route path="store" component={Store} />
				</Route>
			</Router>
		)
	}
}