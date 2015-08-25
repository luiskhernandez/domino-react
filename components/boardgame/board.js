import React from 'react';
import Card from './../domino/card';

let Board = React.createClass({
  componentDidMount () {
    $(".dropzone-left").droppable({
      drop: function(event, ui) {
        ui.draggable.data('dropped', 'left');
      }
    });
    $(".dropzone-right").droppable({
      drop: function(event, ui) {
        ui.draggable.data('dropped', 'right');
      }
    });
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
          <div className="dropzone dropzone-left"></div>
          <div>
            {this.renderList()}
          </div>
          <div className="dropzone dropzone-right"></div>
        </div>
        )
  }
});

export default Board;
