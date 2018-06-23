import React, { Component } from 'react';
import './index.css';

export default class Group extends Component {
  constructor() {
    super();
    this.state = { toggle: true };
  }

  render(props) {
    const { title, children } = this.props,
          { toggle } = this.state;

    return (<div className="group">
        <div className="title" onClick={ () => this.setState({ toggle: !toggle }) }>{ title }</div>
        { toggle && children }
      </div>
    )
  }

}
