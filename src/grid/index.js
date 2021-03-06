import React from 'react';
import './index.css';

import Card from '../card'

export default props => {
  return (<div className="grid">
    { props.syllabs.map((syllab, i) => (<Card key={ syllab+i } index={ i } syllab={ syllab } hiragana={ props.hiragana } katakana={ props.katakana } learning={ props.learning } />)) }
  </div>)
}
