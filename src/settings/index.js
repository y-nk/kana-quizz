import React, { Component } from 'react';
import './index.css';

import Group from '../group'
import Switch from '../switch'
import Slider from '../slider'
import Stat from '../stat'

import equal from 'fast-deep-equal';

import { CORRECTIONS } from '../consts';

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
    const { className, stats } = this.props;
    const { session, bpm, reveal, hiragana, katakana, vowels, extended, consonants, learning } = this.state;

    return (
      <div className={ 'settings ' + className }>
        <Group title="settings">
          <Slider label="Session" value={ session } min={ 0 } max={ 60 } unit="questions" onUpdate={ session => this.setState({ session }) } />
          <Slider label="BPM" value={ bpm } min={ 1 } max={ 60 } unit="BPM" onUpdate={ bpm => this.setState({ bpm }) } />
          <Slider label="Reveal after" value={ reveal * 100 } unit="%" onUpdate={ reveal => this.setState({ reveal: reveal / 100 }) } />
          <Switch label="smart learning" value={ learning } onUpdate={ () => this.setState({ learning: !learning })} />
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
        <Group title="statistics">
          <Group title="hiragana">
            { learning && Object.entries(stats.hira).map(([k, o]) => (
              <Stat key={ k } label={ k in CORRECTIONS ? CORRECTIONS[k] : k } value={ o.v } total={ o.i } />
            )) }
          </Group>
          <Group title="katakana">
            { learning && Object.entries(stats.kata).map(([k, o]) => (
              <Stat key={ k } label={ k in CORRECTIONS ? CORRECTIONS[k] : k } value={ o.v } total={ o.i } />
            )) }
          </Group>
        </Group>
      </div>
    );
  }
}
