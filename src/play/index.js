import React, { Component } from 'react';
import './index.css';

export default class Play extends Component {
  constructor() {
    super()
    this.state = { active: null }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps({ active }) {
    this.setState({ active })
  }

  componentDidUpdate() {
    if (this.props.active !== this.state.active)
      this.props.onClick(this.state.active)
  }

  render() {
    const { active } = this.state

    return (
      <button className={ active ? 'stop' : 'play' } onClick={ () => this.setState({ active: !active }) }>
        { active
          ? (
            <svg viewBox="0 0 36 36">
              <path d="M35,0H1C0.448,0,0,0.447,0,1v34c0,0.553,0.448,1,1,1h34c0.552,0,1-0.447,1-1V1C36,0.447,35.552,0,35,0z"/>
            </svg>
          ) 
          : (
            <svg viewBox="0 0 42 42">
              <path d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z"/>
            </svg>
          )  
        }
      </button>
    )
  }
}
