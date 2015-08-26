import React from 'react';
import classNames from 'classnames';
import _ from 'underscore';
import match from '../../helpers/number-to-words';


let Card = React.createClass({
  updateDragOptions (){
    if(this.props.draggable === true){
      if(this.props.available === true){
        $("#card_"+this.props.index).draggable("enable");
      }else{
        $("#card_"+this.props.index).draggable("disable");
      }
    }
  },
  componentDidUpdate (){
    this.updateDragOptions();
  },
  componentDidMount () {
    let _this = this;
    if(this.props.draggable === true){
      $("#card_"+this.props.index).draggable(
          {revert: 'invalid'},
          {start: function (event, ui) {
            ui.helper.data('dropped', false);
           }
          },
          {stop: function (event, ui) {
            if(ui.helper.data('dropped') === 'left'){
              $(this).hide();
              _this.props.playCard(_this.props.value, true);
            }else{
              if(ui.helper.data('dropped') === 'right'){
                $(this).hide();
                _this.props.playCard(_this.props.value, false);
              }
            }
           }
          }
      );
      this.updateDragOptions();
    }
  },
  match: match,
  wordValue (array) {
    return this.match(array[0]) + " " + this.match(array[1]);
  },
  render () {
    let temp = this.wordValue(this.props.value);
    let classes = classNames('domino', temp, this.props.direction,{ 'domino-noavailable': !this.props.available}, {'r90': this.props.r90}, this.props.value[2]);
    return (
         <div playCard={this.props.playCard} id={'card_'+ this.props.index} className={classes}></div>
        )
  }
});
// export default DragSource(ItemTypes.CARD, CardSource, collect)(Card);
export default Card;

