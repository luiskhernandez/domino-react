import React from 'react';
import Card from './../domino/card';

let Board = React.createClass({
  componentDidMount () {
    $(".board-wrapper").droppable();
  },
  renderList () {
    let _this = this;
    return this.props.values.map( (value, index) => {
      return(
          <Card draggable={false} r90={value[0] != value[1]} key={index} index={"board-card-"+index} value={value} available={true}></Card>
      )
    });
  },
  render () {
    return (
        <div className="board-wrapper">
          <div>
            {this.renderList()}
          </div>
        </div>
        )
  }
});

export default Board;
