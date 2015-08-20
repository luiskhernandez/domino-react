import React from 'react';
import Router from 'react-router';
import Home from './components/pages/home';

let Route = Router.Route
let RouteHandler = Router.RouteHandler;

let App = React.createClass({
  render () {
    return (
        <div className="app-wrapper">
          <div className="container">
           <RouteHandler />
          </div>
        </div>
        )
  }
});

let routes = (
     <Route handler={App}>
       <Route path="/" name="home" handler={Home}></Route>
     </Route>
    );

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
