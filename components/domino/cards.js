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
        <div className="navbar-fixed-bottom cards">
          <div className="container">
            {this.renderList()}
          </div>
        </div>
        )
  }
});
export default Cards;
