import React, { Component } from 'react'
import './index.css'

import Kana from '../kana';

import { AUDIO_URL, FILENAMES, CORRECTIONS } from '../consts'

export default class Card extends Component {
  render() {
    const props = this.props,
          filename = props.syllab in FILENAMES ? FILENAMES[props.syllab] : props.syllab

    return (
      <div className="card" onClick={ () => this.refs.sound.play() }>
        { props.hiragana ? <Kana type='hira' syllab={ props.syllab } learning={ props.learning } /> : null }
        { props.katakana ? <Kana type='kata' syllab={ props.syllab } learning={ props.learning } /> : null }
        <div className='roma'>{ props.syllab in CORRECTIONS ? CORRECTIONS[props.syllab] : props.syllab }</div>
        <audio ref="sound" src={ AUDIO_URL.replace('%', filename) } />
      </div>
    )
  }
}
