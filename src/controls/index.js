import React, { Component } from 'react'
import './index.css'

import Play from '../play'
import Wheel from '../wheel'
import Settings from '../settings'

import equal from 'fast-deep-equal';

export default class Controls extends Component {
  constructor() {
    super();
    this.state = { active: false, settings: true, config: null }
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props, true)
  }

  componentWillReceiveProps({ active, config }) {
    this.setState({ active, config })
  }

  componentDidUpdate() {
    if (this.props.active !== this.state.active || !equal(this.props.config, this.state.config))
      this.props.onUpdate({ active: this.state.active, config: this.state.config })
  }

  render() {
    const { stats } = this.props,
          { active, settings, config } = this.state;

    return (
      <div className="controls">
        <div className="buttons">
          <Play active={ active } onClick={ () => this.setState({ active: !active, settings: false }) } />
          <Wheel onClick={ () => this.setState({ settings: !settings, active: false }) } />
        </div>

        <Settings className={ !active && settings ? 'visible' : 'hidden' } config={ config } stats={ stats } onUpdate={ config => this.setState({ config }) } />
      </div>
    )
  }
}


