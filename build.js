// Options
var opts = {
  files: '**/resume.*'
};
// Require and init
var plainStatic = require('plain-static')(opts);

// Build all the things!
var def = plainStatic();
