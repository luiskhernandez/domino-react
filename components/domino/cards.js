import React from 'react';
import classNames from 'classnames';
import Card from './card';


let Cards = React.createClass({
  renderList () {
    return this.props.values.map( (value) => {
      return(
          <Card value={value} nextCards={this.props.nextCards}></Card>
      )
    });
  },
  render () {
    return (
        <div>
          {this.renderList()}
        </div>
        )
  }
});
export default Cards;
