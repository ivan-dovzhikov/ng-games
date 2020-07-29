import angular from 'angular';
import 'core-js/stable';
import 'regenerator-runtime/runtime.js';
import 'styles.scss';
import 'app/app.module';

import { appModule } from 'app/app.module';

angular.bootstrap(document.getElementById('root')!, [appModule]);
