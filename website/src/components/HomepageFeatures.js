import React from 'react';
import clsx from 'clsx';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: translate({
      message: 'Start with MiniStar',
    }),
    Svg: require('../../static/img/undraw_Dev_focus_re_6iwt.svg').default,
    description: (
      <Translate
        id="homepage.feature1"
        values={{ title: <code>MiniStar</code> }}
      >
        {
          'Start your project with {title} or inject it in existed project. Its Progressive!'
        }
      </Translate>
    ),
  },
  {
    title: translate({
      message: 'Pluginize your Project',
    }),
    Svg: require('../../static/img/undraw_Mobile_marketing_re_p77p.svg')
      .default,
    description: (
      <Translate id="homepage.feature2">
        Decoupling is very important part for Engineering. Dynamic code help you
        split your project, so its can independent development and independent
        deployment.
      </Translate>
    ),
  },
  {
    title: translate({
      message: 'For Any Framework',
    }),
    Svg: require('../../static/img/undraw_JavaScript_frameworks_8qpc.svg')
      .default,
    description: (
      <Translate
        id="homepage.feature3"
        values={{ title: <code>MiniStar</code> }}
      >
        {
          '{title} is Frame-independent framework, whether react, vue, svelte, jquery, or angular. You can feel free and at ease for that: its create for modern web project.'
        }
      </Translate>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
