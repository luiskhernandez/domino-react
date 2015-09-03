import React from 'react';
import Router from 'react-router';
import Home from './components/pages/home';
import PlayNow from './components/pages/play-now';

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
       <Route path="/old" name="home" handler={Home}></Route>
       <Route path="/" name="playnow" handler={PlayNow}></Route>
       <Route path="/_=_" name="playnow2" handler={PlayNow}></Route>
     </Route>
    );

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementById("board"));
});
