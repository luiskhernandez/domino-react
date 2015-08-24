import React from 'react';

let Board = React.createClass({
  componentDidMount () {
    let _this = this;
    $("#droppable").droppable({
      drop (event, ui) {
        // $(ui.draggable).draggable("disable");
        _this.addItem(1);
      }
    });
  },
  addItem (item) {
  },
  render () {
    const { x, y, connectDropTarget, isOver } = this.props;
    return (
        <div className="row board" id="droppable">
        </div>
        )
  }
});

export default Board;
