import React from 'react';
import classNames from 'classnames';
import Card from './card';
import _ from 'underscore';


let Cards = React.createClass({
  isAvailable (value){
    let nextCard = this.props.nextCards;
    return _.contains(value, this.props.nextCards[0]) || _.contains(value, this.props.nextCards[1])
  },
  renderList () {
    let _this = this;
    return this.props.values.map( (value, index) => {
      return(
          <Card turn={this.props.turn} key={index} r90={false} draggable={true} index={index + 1} value={value} playCard={_this.props.playCard} available={this.isAvailable(value)}></Card>
      )
    });
  },
  render () {
    return (
        <div className="navbar-fixed-bottom cards">
          <div id="players-cards" className="container">
            {this.renderList()}
          </div>
        </div>
        )
  }
});
export default Cards;
