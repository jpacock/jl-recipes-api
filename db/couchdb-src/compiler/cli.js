const compile = require('./compile');

compile()
  .then(() => console.log('Design docs compiled to db/couchdb/recipes directory')) // eslint-disable-line no-console
  .catch(console.error); // eslint-disable-line no-console
