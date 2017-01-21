/*eslint-env node */

import css from './css/frame.css';
require('./scripts/table');
document.body.appendChild(require('./scripts/draw').canvas);
require('./scripts/calc');