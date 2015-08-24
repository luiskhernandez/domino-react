import React from 'react';
import Card from './../domino/card';

let Board = React.createClass({
  componentDidMount () {
    let _this = this;
    $("#droppable").droppable();
  },
  addItem (item) {
  },
  renderList () {
    let _this = this;
    return this.props.values.map( (value, index) => {
      return(
          <Card r90={value[0] != value[1]} key={index} draggable={false} index={index} value={value} available={true}></Card>
      )
    });
  },
  render () {
    return (
        <div className="row board" id="droppable">
          {this.renderList()}
        </div>
        )
  }
});

export default Board;
