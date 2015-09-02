import React from 'react';
import Router from 'react-router';
import Avatar from '../avatar/avatar';
import Cards from '../domino/cards'
import Board from '../boardgame/board';
import _ from 'underscore';
import PlaynowStore from '../../stores/playnow-store';
import UserStore from '../../stores/user-store';
import Reflux from 'reflux';
import PlayActions from '../../actions/playnow-actions';
import UserActions from '../../actions/user-actions';

let Link = Router.Link;

let PlayNow = React.createClass({
  mixins: [ Reflux.connect(PlaynowStore), Reflux.connect(UserStore)],
  socket: io(),
  getPlayerWithTurn (){
    if(this.state.current_user != null && this.state.users != null){
      var a = _.filter(this.state.users, function(item){ return item.selected});
      return a[0];
    }else{
      return false;
    }
  },
  turn: function(){
    var player = this.getPlayerWithTurn();
    if(this.state.current_user != null && this.state.current_user != undefined && player){
      var current_player = this.state.current_user.email;
      return player.email == current_player;
    }else{
      return false;
    }
  },
  getInitialState(){
    return {
      values: this.boardValues,
      left: 6,
      right: 6,
      playersComplete: false
    }
  },
  updateCornes (data){
    let left = data[0];
    let right = data[data.length -1];
    if(left[2] == "r90"){
      left = left[1];
    }else{
      left = left[0];
    }
    if(right[2] == "r90_"){
      right = right[1];
    }else{
      right = right[0];
    }
    this.left = left;
    this.right = right;
    this.setState({left: this.left, right: this.right});
  },
  componentWillMount(){
    PlayActions.fetchBoardGame();
    UserActions.fetchUser();
    let _this = this;
    this.socket.on('fetchUsers', function(data) {
      _this.setState({ users: data.users});
      if (data.users.length == 4){
        _this.setState({playersComplete: true});
      }
    });
    this.socket.on('winner', function(data) {
      var msg = data.closed ? 'Game closed. ' : '';
      if (_this.state.current_user.email == data.winner.email){
        msg += "Congrats! You have won.";
      }else{
        msg += "Winner " + data.winner.email + ".";
      }
      alert(msg);
    });
    // this.socket.on('closed', function(data) {
    //   alert("Game closed");
    // });
    this.socket.on('fetchBoard', function(data) {
      _this.boardValues = data.board;
      _this.updateCornes(data.board);
      _this.setState({ values: data.board});
    });
    this.socket.emit('fetchUsers');
    this.socket.emit('fetchBoard');
  },
  boardValues: [],
  left:6,
  right: 6,
  updateCorner (side, value) {
    if(side == value[0]){
      side = value[1]
    }else{
      side = value[0]
    }
    return side;
  },
  rotate (value, side, sideLeft) {
    let val = "";
    if (sideLeft === true){
      if((value[0] < value[1]) && (side == value[0])){
        val = "r270";
      }else{
        if(value[0] != value[1]){
            val = "r90";
        }
      }
    }else{
      if((value[0] < value[1]) && (side == value[1])){
        val = "r90_";
      }else{
        if(value[0] != value[1]){
            val = "r270_";
        }
      }
    }
    return val;
  },
  playCardLeft (value){
      this.left = this.updateCorner(this.left, value)
      let _class = this.rotate(value,this.left, true);
      value.push(_class);
      this.boardValues.unshift(value);
  },
  playCardRight(value){
      this.right = this.updateCorner(this.right, value)
      let _class = this.rotate(value,this.right, false);
      value.push(_class);
      this.boardValues.push(value);
  },
  playCard (value, left) {
    if(value.length > 0) {
      if(left && _.contains(value,this.left) === true){
        this.playCardLeft(value);
      }else{
        if(_.contains(value,this.right) === true){
          this.playCardRight(value);
        }else{
          this.playCardLeft(value);
        }
      }
    }
    this.setState({values: this.boardValues});
    this.socket.emit("sendBoard", {board: this.boardValues, user: this.state.current_user.email, playedCard: value });
  },
  renderUsers () {
    let _this = this;
    return this.state.users.map( (value, index) => {
      return (
            <Avatar key={'avatar_'+ index + 1} email={value.email} name={value.name} selected={value.selected}></Avatar>
      )
    });
  },
  renderGame(){
    return (
        <div>
            <a href="/">Back to home</a>
           <div className="row">
            {this.renderUsers()}
          </div>
          <Board nextCards={[this.left, this.right]} values={this.state.values}></Board>
          <div className="row">
             <Cards turn={this.turn()} playCard={this.playCard} values={this.state.playerCards} nextCards={[this.state.left,this.state.right]}></Cards>
           </div>
          </div>
        )
  },
  render () {
    if(this.state.playersComplete){
      return this.renderGame()
    }else{
      return (
          <div className="jumbotron">
            <h1> <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Waiting for players... </h1>
          </div>
          )
    }
  }
});
export default PlayNow;

