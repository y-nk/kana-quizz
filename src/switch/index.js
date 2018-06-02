import React, { Component } from 'react'
import './index.css'

export default class Switch extends Component {
  constructor() {
    super()
    this.state = { value: -1 }
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
    const { label } = this.props,
          { value } = this.state,
          name = label.replace(/\s+/, '_')

    return (
      <div className="switch">
        <label htmlFor={ name }>{ label }</label>
        <input type="checkbox" id={ name } name={ name } checked={ value }
               onChange={ () => this.setState({ value: !value }) } />
      </div>
    )
  }
}