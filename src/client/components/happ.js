/*
*	module dependencies
*/
import React from 'react';
import Landing from './landing'
import { Link } from 'react-router'

export default class Happ extends React.Component{
	

	render(){
		var landing = <Landing/>
//		console.log(e_id)
		return <div>
			home app
			<Link to={"/explore"}><p>Explora</p></Link>
			<Link to={"/exploreScene"}><p>Explora Scene</p></Link>
			{landing}
			{this.props.children && React.cloneElement(this.props.children, {
              			
            		})}
		</div>
	}
}