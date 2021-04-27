import { runA } from './sync';

runA();

import('./async').then((module) => module.runB());

import('@capital/shared').then((module) => module.sharedConsole('test'));
