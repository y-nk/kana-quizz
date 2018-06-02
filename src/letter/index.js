import React from 'react'
import './index.css'

const AUDIO_URL = 'https://www.nhk.or.jp/lesson/mp3/syllabary/%.mp3';
const filenames = { 'a' : 'aa', 'i' : 'ii', 'u' : 'uu', 'e' : 'ee', 'o' : 'oo', 'zi': 'ji', 'di': 'ji', 'du': 'zu', 'sya': 'sha', 'syu': 'shu', 'syo': 'sho', 'tya': 'cha', 'tyu': 'chu', 'tyo': 'cho', 'zya': 'ja', 'zyu': 'ju', 'zyo': 'jo' }

const CORRECTIONS = { 'si': 'shi', 'ti': 'chi', 'tu': 'tsu', 'hu': 'fu', 'zi': 'ji', 'di': 'ji', 'du': 'zu', 'sya': 'sha', 'syu': 'shu', 'syo': 'sho', 'tya': 'cha', 'tyu': 'chu', 'tyo': 'cho', 'zya': 'ja', 'zyu': 'ju', 'zyo': 'jo' }

export default props => {
  const filename = props.syllab in filenames ? filenames[props.syllab] : props.syllab,
        url = AUDIO_URL.replace('%', filename)

  const syllab = props.syllab in CORRECTIONS ? CORRECTIONS[props.syllab] : props.syllab

  return (
    <div className="letter" style={{ animationDuration: `${props.timeout}ms` }}>
      <span style={{
        animationDuration: `${props.timeout * (1 - props.reveal)}ms`,
        animationDelay: `${props.timeout * props.reveal}ms`
      }}>{ syllab }</span>
      <audio src={ url } autoPlay={ true } />
    </div>
  )
}