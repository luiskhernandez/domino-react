import React from 'react';
import Router from 'react-router';
import Avatar from '../avatar/avatar';
import Cards from '../domino/cards'
import Board from '../boardgame/board';
import _ from 'underscore';

let Link = Router.Link;

let PlayNow = React.createClass({
  boardValues: [[6,6]],
  getInitialState () {
    let cards = [];
    _.each(_.range(7), function(item){
      _.each(_.range(item +1 ),function(item2){
        if(item <= 6 && item2 != 6){
          cards.push([item,item2])
        }
      })
    });
    cards = _.shuffle(cards);
    return {
      cards: cards,
      values: this.boardValues
    }
  },
  playCard (value) {
    this.boardValues.push(value);
    this.setState({values: this.boardValues});
  },
  render () {
    let values = _.sample(this.state.cards,14);
    return (
        <div>
           <Link to="home" className="push-right">Back to home</Link>
           <div className="row">
            <Avatar email="luisk.hernandez.macias@gmail.com" name="Luisk" selected={false}></Avatar>
            <Avatar email="luis.macias@koombea.com" name="Presto" selected={true}></Avatar>
          </div>
          <div className="row">
             <Board values={this.state.values}></Board>
          </div>
          <div className="row">
             <Cards playCard={this.playCard} values={values} nextCards={[6,6]}></Cards>
           </div>
          </div>
        )
  }
});
export default PlayNow;

