import React from 'react';
import Router from 'react-router';

let Link = Router.Link;

let PlayNow = React.createClass({
  render () {
    return (
        <div>
          <h1>Play now</h1>
          <h2>Domino</h2>
         <Link to="home" className="btn btn-primary btn-lg">Back to home</Link>
        </div>
        )
  }
});
export default PlayNow;

