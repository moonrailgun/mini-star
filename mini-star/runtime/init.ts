import { definePlugin, requirePlugin } from './helper';
import type { Module } from './types';

declare global {
  interface Window {
    definePlugin: (
      name: string,
      deps: string[],
      callback: (...args: unknown[]) => Module
    ) => void;
    requirePlugin: (
      deps: string[],
      callback: (...args: Module[]) => void
    ) => void;
  }
}

window.requirePlugin = requirePlugin;

window.definePlugin = definePlugin;
