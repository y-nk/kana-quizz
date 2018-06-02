import React from 'react';
import './index.css';

export default (props) => (
  <div className="group">
    <div className="title">{ props.title }</div>
    { props.children }
  </div>
)
