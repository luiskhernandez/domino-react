import React from 'react';
import Router from 'react-router';
import Avatar from '../avatar/avatar';
import Cards from '../domino/cards'

let Link = Router.Link;

let PlayNow = React.createClass({
  render () {
    let values = [[0,0],[0,1],[0,2], [0,3], [0,4], [0,5]];
    return (
        <div>
          <h1>Play now</h1>
          <h2>Domino</h2>
           <Link to="home" className="btn btn-primary btn-lg">Back to home</Link>
           <div className="row">
            <Avatar email="luisk.hernandez.macias@gmail.com" name="Luisk" selected={false}></Avatar>
            <Avatar email="luis.macias@koombea.com" name="Presto" selected={true}></Avatar>
          </div>
          <div className="row">
             <Cards values={values}></Cards>
           </div>
          </div>
        )
  }
});
export default PlayNow;

