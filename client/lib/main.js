import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import Index from "/client/imports/root/index.jsx";
import injectTapEventPlugin from 'react-tap-event-plugin';

Meteor.startup(()=>{
	injectTapEventPlugin();
	render(<Index/>, document.getElementById('root'));
})
