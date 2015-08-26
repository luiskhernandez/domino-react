import React from 'react';
import Router from 'react-router';

let Link = Router.Link;

let Home = React.createClass({
  render () {
    return (
        <div>
          <h1>Hello, let's play </h1>
          <h2>Domino</h2>
         <Link to="playnow" className="btn btn-primary btn-lg">Play now</Link>
        </div>
        )
  }
});
export default Home;
