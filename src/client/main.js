$(document).ready(function(){
	console.log("holaa")

	$("#btnEnviar").on("click", function(e){
		e.preventDefault();
		console.log("click en btn")
		let companyName = $("#companyName").val()
		console.log(txt)

		let json = {
			"valor" : txt
		}

		$.post("/api/new_enterprise", json, function(res){
			console.log(res)
		});
	});
});

function handleCreateEnterprise(e){
	e.preventDefault();
	console.log("click en boton")
	var txt1 = document.getElementById('companyName');
	var valor = txt1.value();
	console.log(valor);

}
/*
import React from 'react'
import ReactDom from 'react-dom'
import Layout from './components/layout'


	ReactDom.render(
      <Layout/>,
      document.getElementById('container')
    );

*/

/*
* Modul dependencies
*/

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import EnterpriseRegisterInfo from './components/enterpriseRegisterInfo'
import TeamAdmin from './components/teamAdmin'
import Happ from './components/happ'
import Explore from './components/explore'
import ExploreScene from './components/exploreScene'



const routes = (<Router history={browserHistory}>
                	<Route path="/" component = {Happ} >
                		<Route path="explore" component = {Explore} />
                		<Route path="exploreScene" component = {ExploreScene} />
                		
                	</Route>
                	<Route path="binndi-team" component = {TeamAdmin} />
             
            </Router>);

ReactDom.render(routes, document.getElementById('container'));

