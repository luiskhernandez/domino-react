import React from 'react';
import classNames from 'classnames';
import Card from './card';


let Cards = React.createClass({
  renderList () {
    return this.props.values.map( (value, index) => {
      return(
          <Card key={index} value={value} nextCards={this.props.nextCards}></Card>
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
