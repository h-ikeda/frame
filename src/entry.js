/*eslint-env node, browser*/

require("polythene/theme/theme");
require("polythene/layout/theme/theme");
require("mithril").mount(document.body, require("./scripts/view"));
