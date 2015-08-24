import React from 'react';
import Router from 'react-router';
import Avatar from '../avatar/avatar';
import Cards from '../domino/cards'
import Board from '../boardgame/board';
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
  playCard (value) {
    alert("PlayNow"+ value[0] + "-" +value[1]);
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
             <Board></Board>
          </div>
          <div className="row">
             <Cards playCard={this.playCard} values={values} nextCards={[6,3]}></Cards>
           </div>
          </div>
        )
  }
});
export default PlayNow;

