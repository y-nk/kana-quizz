import React, { Component } from 'react'
import './index.css'

export default class Kana extends Component {
  constructor() {
    super();
    this.state = { value: 0 }
  }

  shouldComponentUpdate({ learning }, { value }) {
    return this.props.learning !== learning
        || this.state.value !== value;
  }

  componentWillReceiveProps({ learning }) {
    if (!learning)
      this.setState({ value: 0 })
  }

  componentDidUpdate(props, { value }) {
    if (this.state.value === value)
      return;

    const { type, syllab } = this.props;
    const diff = this.state.value - value;

    const inc = this.state.value !== 0
              ? this.state.value !== -value ? 1 : 0
              : -1 ;

    this.refs.root.dispatchEvent(new CustomEvent('learn', {
      detail: { type, syllab, diff, inc },
      bubbles: true
    }))
  }

  render() {
    const { type, syllab, learning } = this.props,
          { value } = this.state;

    return (
    <div ref="root" className={`kana ${type} _${syllab}`}>
      { learning &&
        <div className={ `ko${value === -1 ? ' active' : ''}` }
             onClick={ (e) => { e.stopPropagation(); this.setState({ value: value !== -1 ? -1 : 0 }) } } />
      }
      { learning &&
        <div className={ `ok${value === 1 ? ' active' : ''}` }
             onClick={ (e) => { e.stopPropagation(); this.setState({ value: value !== 1 ? 1 : 0 }) } } />
      }
    </div>)
  }
}
