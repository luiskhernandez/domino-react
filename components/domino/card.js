import React from 'react';
import classNames from 'classnames';
import _ from 'underscore';


let Card = React.createClass({
  componentDidMount () {
    let _this = this;
    $("#card_"+this.props.index ).draggable(
        {revert: 'invalid'},
        {stop: function (event, ui) {
          $(this).remove();
          _this.props.playCard(_this.props.value);
         }
        }
    );
  },
  isAvailable (){
    let nextCard = this.props.nextCards;
    return _.contains(this.props.value, this.props.nextCards[0]) || _.contains(this.props.value, this.props.nextCards[1])
  },
  match (param) {
    let value;
    switch(param){
      case 0:
        value = "blank";
        break;
      case 1:
        value = "one";
        break
      case 2:
        value = "two";
        break
      case 3:
        value = "three";
        break
      case 4:
        value = "four";
        break
      case 5:
        value = "five";
        break
      case 6:
        value = "six";
        break
    }
    return value;
  },
  wordValue (array) {
    return this.match(array[0]) + " " + this.match(array[1]);
  },
  render () {
    let temp = this.wordValue(this.props.value);
    let classes = classNames('domino', temp, this.props.direction,{ 'domino-noavailable': !this.isAvailable()});
    return (
         <div playCard={this.props.playCard} id={'card_'+ this.props.index} className={classes}></div>
        )
  }
});
// export default DragSource(ItemTypes.CARD, CardSource, collect)(Card);
export default Card;

