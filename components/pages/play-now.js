import React from 'react';
import Router from 'react-router';
import Avatar from '../avatar/avatar';

let Link = Router.Link;

let PlayNow = React.createClass({
  render () {
    return (
        <div>
          <h1>Play now</h1>
          <h2>Domino</h2>
           <Link to="home" className="btn btn-primary btn-lg">Back to home</Link>
           <div className="row">
            <Avatar url="https://cdn.shopify.com/s/files/1/0601/0281/files/Mobile-_background1.png?10844" name="Michelle Lewin"></Avatar>
            <Avatar url="https://i.imgur.com/1dHKy5K.jpg" name="Anllela Sagra"></Avatar>
           </div>
        </div>
        )
  }
});
export default PlayNow;

