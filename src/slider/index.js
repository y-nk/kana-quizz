import React, { Component } from 'react';
import './index.css';

export default class Slider extends Component {
  constructor() {
    super()
    this.state = { value: null }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps({ value }) {
    this.setState({ value })
  }

  componentDidUpdate() {
    if (this.props.value !== this.state.value)
      this.props.onUpdate(this.state.value)
  }

  render() {
    const { label, min, max, unit } = this.props,
          { value } = this.state,
          name = label.replace(/\s+/, '_')

    return (<div className="slider">
      <label htmlFor={ name }>{ label }</label>

      <input type="range" id={ name } name={ name }
             defaultValue={ value } min={ min } max={ max } step="1"
             onInput={ e => this.setState({ value: e.target.value }) } />

      <aside>
        <span>{ value | 0 }</span>
        <small>{ unit }</small>
      </aside>
    </div>)
  }
}
