import React, { Component } from 'react'
import './index.css'

import Kana from '../kana';

import { AUDIO_URL, FILENAMES, CORRECTIONS } from '../consts'

export default class Card extends Component {
  constructor() {
    super();
    this.state = { dead: false };
  }
  componentDidMount() {
    this._proxy = e => {
      const { inc } = e.detail;

      clearTimeout(this._timeout);

      if (inc !== -1)
        this._timeout = setTimeout(() => {
          this.setState({ dead: true })
        }, 3000);
    }

    this.refs.root.addEventListener('learn', this._proxy);
  }

  componentWillUnmount() {
    this.refs.root.removeEventListener('learn', this._proxy);
    delete this._proxy;
  }

  render() {
    const { syllab, hiragana, katakana, learning } = this.props,
          { dead } = this.state,
          filename = syllab in FILENAMES ? FILENAMES[syllab] : syllab

    const style = dead ? {
      position: 'absolute',
      visibility: 'hidden',
      left: '1000000px',
    } : null;

    return (
      <div ref="root" className="card" style={ style } onClick={ () => this.refs.sound.play() }>
        { hiragana ? <Kana type='hira' syllab={ syllab } learning={ learning } /> : null }
        { katakana ? <Kana type='kata' syllab={ syllab } learning={ learning } /> : null }
        <div className='roma'>{ syllab in CORRECTIONS ? CORRECTIONS[syllab] : syllab }</div>
        <audio ref="sound" src={ AUDIO_URL.replace('%', filename) } />
      </div>
    )
  }
}
