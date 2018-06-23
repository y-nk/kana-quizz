import React from 'react'
import './index.css'

import { AUDIO_URL, FILENAMES, CORRECTIONS } from '../consts'

export default props => {
  const filename = props.syllab in FILENAMES ? FILENAMES[props.syllab] : props.syllab

  return (
    <div className="letter" style={{ animationDuration: `${props.timeout}ms` }}>
      <span style={{
        animationDuration: `${props.timeout * (1 - props.reveal)}ms`,
        animationDelay: `${props.timeout * props.reveal}ms`
      }}>{ props.syllab in CORRECTIONS ? CORRECTIONS[props.syllab] : props.syllab }</span>
      <audio src={ AUDIO_URL.replace('%', filename) } autoPlay={ true } />
    </div>
  )
}
