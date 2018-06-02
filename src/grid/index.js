import React from 'react';
import './index.css';

const CORRECTIONS = { 'si': 'shi', 'ti': 'chi', 'tu': 'tsu', 'hu': 'fu', 'zi': 'ji', 'di': 'ji', 'du': 'zu', 'sya': 'sha', 'syu': 'shu', 'syo': 'sho', 'tya': 'cha', 'tyu': 'chu', 'tyo': 'cho', 'zya': 'ja', 'zyu': 'ju', 'zyo': 'jo' }

export default props => {
  return (<div className="grid">
    { props.syllabs.map((syllab, i) => {
      const display = syllab in CORRECTIONS ? CORRECTIONS[syllab] : syllab
      return (
        <div key={ i } className={ `letter-${syllab}` }>
          { props.hiragana ? <span className='kana hira' /> : null }
          { props.katakana ? <span className='kana kata' /> : null }
          <div className='roma'>{ display }</div>
        </div>
      )}
    )}
  </div>)
}