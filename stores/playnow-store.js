import Reflux from 'reflux';
import $ from 'jquery';
import PlayNowActions from '../actions/playnow-actions';
import _ from 'underscore';

let PlaynowStore = Reflux.createStore({
  listenables: [ PlayNowActions],
  getInitialState() {
    return {
      playerCards:[]
    }
  },
  cards: [],
  playerCards: [],
  init () {
    let _this = this;
    _.each(_.range(7), function(item){
      _.each(_.range(item, 7),function(item2){
        if(item != 6 || item2 != 6){
          _this.cards.push([item,item2])
        }
      })
    });
    this.cards = _.shuffle(this.cards);
  },
  onFetchBoardGame () {
    this.playerCards = _.sample(this.cards,7);
    this.trigger({ playerCards: this.playerCards});
  },
});

export default PlaynowStore;

