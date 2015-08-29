import React from 'react';
import Gravatar from 'react-gravatar';
import classNames from 'classnames';

let Avatar = React.createClass({
  render () {
    let classes = classNames({ 'thumbnail': true, 'avatar-selected': this.props.selected});
    return (
        <div className="col-md-3">
        <div className={classes}>
         <Gravatar email={this.props.email} size={80}  className="img-circle avatar__image"></Gravatar>
          <div className="caption">
            <p>{this.props.name}</p>
          </div>
        </div>
      </div>        )
  }
});

export default Avatar;
