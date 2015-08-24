import React from 'react';
import classNames from 'classnames';


let Card = React.createClass({
  render () {
    let classes = classNames('domino', this.props.value);
    return (
         <div className={classes}></div>
        )
  }
});
export default Card;

