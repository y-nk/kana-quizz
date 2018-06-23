import React, { Component } from 'react';
import './index.css';

import randomcolor from 'randomcolor';

import Letter from '../letter';
import Grid from '../grid';
import Controls from '../controls';

import equal from 'fast-deep-equal';

const CONFIG = {
  session: 20,
  bpm: 10,
  reveal: .5,
  hiragana: true,
  katakana: true,
  learning: true,

  vowels: {
    a: true,
    i: true,
    u: true,
    e: true,
    o: true,
  },

  extended: {
    ya: true,
    yu: true,
    yo: true,
  },

  consonants: {
    ø: true,
    k: true,
    s: true,
    t: true,
    h: true,
    n: true,
    m: true,
    y: true,
    r: true,
    w: true,
    g: true,
    z: true,
    d: true,
    p: true,
    b: true,
  },
}

const STATS = {
  hira: {},
  kata: {}
}

export default class App extends Component {
  constructor() {
    super();

    let config = localStorage.getItem('config')
        config = config ? JSON.parse(config) : { ...CONFIG }

    let stats = localStorage.getItem('stats')
        stats = stats ? JSON.parse(stats) : { ...STATS }

    this.state = {
      theme: randomcolor(),
      active: false,
      syllabs: [],
      config,
      stats
    }

    this.timer = -1;
  }

  componentDidMount() {
    this._proxy = e => {
      const { type, syllab, diff, inc } = e.detail;
      const { stats } = this.state;

      const stat = Object.assign(
        { v:0, i:0 },
        this.state.stats[type][syllab]
      );

      stat.v += diff;
      stat.i += inc;

      this.setState({ stats: {
        ...stats,
        [type]: {
          ...stats[type],
          [syllab]: stat
        }
      }})
    }

    this.refs.root.addEventListener('learn', this._proxy);
  }

  componentWillUnmount() {
    this.refs.root.removeEventListener('learn', this._proxy);
    delete this._proxy;
  }

  componentWillUpdate(props, { active, config, stats }) {
    if (!equal(this.state.config, config)) {
      localStorage.setItem('config', JSON.stringify(config))
      console.log('need to update config')
    }

    if (this.state.config.learning !== config.learning) {
      this.setState({ stats: { ...STATS }})
      return;
    }

    if (!equal(this.state.stats, stats)) {
      localStorage.setItem('stats', JSON.stringify(stats))
      console.log('need to update stats')
    }

    const consonants = Object.entries(config.consonants).filter(([k, v]) => v).map(([k, v]) => k)
    const vowels = Object.entries({ ...config.vowels, ...config.extended }).filter(([k, v]) => v).map(([k, v]) => k)

    const safe = consonants.filter(consonant => !['w', 'y', 'd'].includes(consonant)).length

    if (!safe) {
      let requirements = []

      if (consonants.includes('w'))
        requirements = requirements.concat(['a', 'o']).filter((v, i, a) => a.indexOf(v) === i)

      if (consonants.includes('y'))
        requirements = requirements.concat(['a', 'u', 'o']).filter((v, i, a) => a.indexOf(v) === i)

      if (consonants.includes('d'))
        requirements = requirements.concat(['a', 'i', 'u', 'e', 'o']).filter((v, i, a) => a.indexOf(v) === i)

      const combinations = vowels.filter(vowel => requirements.indexOf(vowel) !== -1).length;

      if (combinations === 0)
        alert('the current configuration cannot generate combinations. please add consonants or vowels.')
    }

    if (!this.state.active && active)
      clearTimeout(this.timer)
  }

  componentDidUpdate(props, { active, syllabs }) {
    // prevent an endless componentDidUpdate<=>setState loop
    if (!this.state.active || (this.state.active === active)) {
      return;
    }

    // delay activation by 3s
    if (active === false && this.state.active === true) {
      this.setState({ syllabs: [] })

      this.timer = setTimeout(
        () => { this.componentDidUpdate(null, { active: -1 }) },
        3000
      )

      return;
    }

    // deactivate if we touch config.session limit
    if ((this.state.config.session !== 0) && (this.state.syllabs.length === this.state.config.session)) {
      this.setState({ active: false })
      return;
    }

    // add a new syllab to the session
    this.setState({ syllabs: [...this.state.syllabs, this.pick()] })

    // loop
    clearTimeout(this.timer);
    this.timer = setTimeout(
      () => { this.componentDidUpdate(null, { active: -1 }) },
      60000 / this.state.config.bpm
    );
  }


  pick() {
    const forbidden  = ['yi', 'ye', 'wi', 'wu', 'we', 'yya', 'yyu', 'yyo', 'wya', 'wyu', 'wyo', 'dya', 'dyu', 'dyo']

    const consonants = Object.entries(this.state.config.consonants).filter(([k, v]) => v).map(([k, v]) => k)
    const vowels = Object.entries({ ...this.state.config.vowels, ...this.state.config.extended }).filter(([k, v]) => v).map(([k, v]) => k)

    let c, v, s; // consonant, vowel, syllab

    do {
      // build random syllab
      c = consonants[Math.floor(Math.random() * consonants.length)];
      v = vowels[Math.floor(Math.random() * vowels.length)];
      s = c + v;
    }
    while(forbidden.indexOf(s) !== -1)

    s = s.replace('ø', '');

    return s;
  }

  render() {
    const { theme, active, syllabs, config, stats } = this.state,
          syllab = syllabs.slice(-1);

    return (
      <div ref="root" className="jqz" data-watermark={ active ? `${syllabs.length} / ${config.session}` : '' } style={{ '--theme': theme }}>
        { active && syllab.length ? <Letter key={ `${ Date.now() }` } syllab={ syllab } reveal={ config.reveal } timeout={ 60000 / config.bpm } /> : null }
        { !active && syllabs.length ? <Grid syllabs={ syllabs } hiragana={ config.hiragana } katakana={ config.katakana } learning={ config.learning } /> : null }

        <Controls theme={ theme } config={ config } stats={ stats } active={ active } onUpdate={ ({ active, config }) => { this.setState({ active, config }) } } />
      </div>
    );
  }
}
