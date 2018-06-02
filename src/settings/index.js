import React, { Component } from 'react';
import './index.css';

import Group from '../group'
import Switch from '../switch'
import Slider from '../slider'

import equal from 'fast-deep-equal';

export default class Settings extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps({ config }) {
    this.setState(config)
  }

  componentDidUpdate(props, state) {
    if (!equal(this.props.config, this.state))
      this.props.onUpdate(this.state)
  }

  render() {
    const { className } = this.props;
    const { session, bpm, reveal, hiragana, katakana, vowels, extended, consonants } = this.state;

    return (
      <div className={ 'settings ' + className }>
        <Group title="settings">
          <Slider label="Session" value={ session } min={ 0 } max={ 50 } unit="questions" onUpdate={ session => this.setState({ session }) } />
          <Slider label="BPM" value={ bpm } min={ 1 } max={ 60 } unit="BPM" onUpdate={ bpm => this.setState({ bpm }) } />
          <Slider label="Reveal after" value={ reveal * 100 } unit="%" onUpdate={ reveal => this.setState({ reveal: reveal / 100 }) } />
        </Group>

        <Group title="display">
          <Switch label="hiragana" value={ hiragana } onUpdate={ () => this.setState({ hiragana: !hiragana })} />
          <Switch label="katakana" value={ katakana } onUpdate={ () => this.setState({ katakana: !katakana })} />
        </Group>

        <Group title="vowels">
          { Object.entries(vowels).map(([k, v]) => (
            <Switch key={ k } label={ k } value={ v } onUpdate={ () => this.setState({ vowels: { ...vowels, [k]: !v }})} />
          )) }
        </Group>
        <Group title="composed">
          { Object.entries(extended).map(([k, v]) => (
            <Switch key={ k } label={ k } value={ v } onUpdate={ () => this.setState({ extended: { ...extended, [k]: !v }})} />
          )) }
        </Group>
        <Group title="consonants">
          { Object.entries(consonants).map(([k, v]) => (
            <Switch key={ k } label={ k } value={ v } onUpdate={ () => this.setState({ consonants: { ...consonants, [k]: !v }})} />
          )) }
        </Group>
      </div>
    );
  }
}
