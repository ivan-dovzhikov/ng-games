import { Component } from 'lib/types';

import template from './header.component.html';
import './header.component.scss';

export const headerComponent: Component = {
  selector: 'appHeader',
  options: {
    template,
  },
};
