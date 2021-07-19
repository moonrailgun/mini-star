import { runA } from './sync';
import { sharedConsole } from '@capital/shared';

runA();

import('./async').then((module) => module.runB());

sharedConsole('test');
