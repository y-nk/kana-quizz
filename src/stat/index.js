import React, { Component } from 'react';
import './index.css';

export default props => {
  const { label, value, total } = props;
  const pct = total !== 0 ? value / total : 0;
  const type = value > 0 ? 'positive' : value < 0 ? 'negative' : 'neutral';

  return (
    <div className="stat">
      <div className="title">{ label }</div>
      <div className="track" data-percentage={ `${ Math.round(100 * pct) }%` }>
        <div className={ `thumb ${type}` } style={{ transform: `scaleX(${pct})` }}></div>
      </div>
    </div>
  )
}
