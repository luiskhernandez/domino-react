import React from 'react';
import Router from 'react-router';
import Avatar from '../avatar/avatar';
import Cards from '../domino/cards'
import Board from '../boardgame/board';
import _ from 'underscore';

let Link = Router.Link;

let PlayNow = React.createClass({
  boardValues: [[6,6,'r90']],
  left:6,
  right: 6,
  side: null,
  sideLeft: true,
  playerCards: [],
  getInitialState () {
    let cards = [];
    _.each(_.range(7), function(item){
      _.each(_.range(item, 7),function(item2){
        if(item != 6 || item2 != 6){
          cards.push([item,item2])
        }
      })
    });
    cards = _.shuffle(cards);
    this.playerCards = _.sample(cards,14);
    return {
      cards: cards,
      values: this.boardValues
    }
  },
  updateCorner (side, value) {
    if(side == value[0]){
      side = value[1]
    }else{
      side = value[0]
    }
    return side;
  },
  rotate (value, side) {
    let val = "";
    if (this.sideLeft){
      if((value[0] < value[1]) && (side == value[0])){
        val = "r270";
      }else{
        val = "r90";
      }
    }
    return val;
  },
  playCard (value) {
    if(_.contains(value,this.left)){
      this.left = this.updateCorner(this.left, value)
      this.sideLeft = true;
      let _class = this.rotate(value,this.left);
      value.push(_class);
      this.boardValues.unshift(value);
    }else{
      this.right = this.updateCorner(this.right, value)
      this.sideLeft = false;
      let _class = this.rotate(value,this.right);
      value.push(_class);
      this.boardValues.push(value);
    }
    this.setState({values: this.boardValues});
  },
  render () {
    return (
        <div>
           <Link to="home" className="push-right">Back to home</Link>
           <div className="row">
            <Avatar email="luisk.hernandez.macias@gmail.com" name="Luisk" selected={false}></Avatar>
            <Avatar email="luis.macias@koombea.com" name="Presto" selected={true}></Avatar>
          </div>
          <div className="row">
             <Board values={this.state.values} rotateConfig={this.rotateConfig}></Board>
          </div>
          <div className="row">
             <Cards playCard={this.playCard} values={this.playerCards} nextCards={[this.left,this.right]}></Cards>
           </div>
          </div>
        )
  }
});
export default PlayNow;

