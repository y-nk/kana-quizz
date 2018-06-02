import React, { Component } from 'react'
import './index.css'

const AUDIO_URL   = 'https://www.nhk.or.jp/lesson/mp3/syllabary/%.mp3';
const FILENAMES   = { 'a' : 'aa', 'i' : 'ii', 'u' : 'uu', 'e' : 'ee', 'o' : 'oo', 'zi': 'ji', 'di': 'ji', 'du': 'zu', 'sya': 'sha', 'syu': 'shu', 'syo': 'sho', 'tya': 'cha', 'tyu': 'chu', 'tyo': 'cho', 'zya': 'ja', 'zyu': 'ju', 'zyo': 'jo' }
const CORRECTIONS = { 'si': 'shi', 'ti': 'chi', 'tu': 'tsu', 'hu': 'fu', 'zi': 'ji', 'di': 'ji', 'du': 'zu', 'sya': 'sha', 'syu': 'shu', 'syo': 'sho', 'tya': 'cha', 'tyu': 'chu', 'tyo': 'cho', 'zya': 'ja', 'zyu': 'ju', 'zyo': 'jo' }

export default class Card extends Component {
  render() {
    const props = this.props,
          filename = props.syllab in FILENAMES ? FILENAMES[props.syllab] : props.syllab
    
    return (
      <div className={ `card _${ props.syllab }` } onClick={ () => this.refs.sound.play() }>
        { props.hiragana ? <span className='kana hira' /> : null }
        { props.katakana ? <span className='kana kata' /> : null }
        <div className='roma'>{ props.syllab in CORRECTIONS ? CORRECTIONS[props.syllab] : props.syllab }</div>
        <audio ref="sound" src={ AUDIO_URL.replace('%', filename) } />
      </div>
    )
  }
}
