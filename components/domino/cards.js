import React from 'react';
import classNames from 'classnames';
import Card from './card';


let Cards = React.createClass({
  renderList () {
    return this.props.values.map( (value) => {
      let temp = this.wordValue(value);
      return(
          <Card value={temp}></Card>
      )
    });
  },
  wordValue (array) {
    return this.match(array[0]) + " " + this.match(array[1]);
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
  render () {
    return (
        <div>
          {this.renderList()}
        </div>
        )
  }
});
export default Cards;
