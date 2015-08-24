import React from 'react';
import Router from 'react-router';
import Avatar from '../avatar/avatar';
import Cards from '../domino/cards'
import _ from 'underscore';

let Link = Router.Link;

let PlayNow = React.createClass({
  getInitialState () {
    let cards = [];
    _.each(_.range(7), function(item){
      _.each(_.range(7),function(item2){
        cards.push([item,item2])
      })
    });
    cards = _.shuffle(cards);
    return {
      cards: cards
    }
  },
  render () {
    let values = _.sample(this.state.cards,6);
    return (
        <div>
           <Link to="home" className="push-right">Back to home</Link>
           <div className="row">
            <Avatar email="luisk.hernandez.macias@gmail.com" name="Luisk" selected={false}></Avatar>
            <Avatar email="luis.macias@koombea.com" name="Presto" selected={true}></Avatar>
          </div>
          <div className="row">
             <Cards values={values} nextCards={[6,3]}></Cards>
           </div>
          </div>
        )
  }
});
export default PlayNow;

