/*eslint-env node, browser*/

//require("polythene/theme/theme");
//require("polythene/layout/theme/theme");
require("material-components-web/material-components-web.scss");
require("material-design-icons/iconfont/material-icons.css");
require("./css/base.scss");
require("mithril").mount(document.body, require("./scripts/view"));