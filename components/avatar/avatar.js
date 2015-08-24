import React from 'react';

let Avatar = React.createClass({
  render () {
    return (
        <div className="col-md-2">
        <div className="thumbnail">
          <img src={this.props.url}className="img-circle avatar__image" />
          <div className="caption">
            <p>{this.props.name}</p>
          </div>
        </div>
      </div>        )
  }
});

export default Avatar;
