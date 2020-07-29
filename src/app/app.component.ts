import type { Component } from 'lib/types';

import template from './app.component.html';
import './app.component.scss';

export const appComponent: Component = {
  selector: 'app',
  options: {
    template,
  },
};
