import { runA } from './sync';

runA();

import('./async').then((module) => module.runB());
