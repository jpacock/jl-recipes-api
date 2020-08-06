const couchdbCompile = require('couchdb-compile'); // eslint-disable-line import/no-extraneous-dependencies

function compileDesignDoc(src) {
  return new Promise((resolve, reject) => {
    couchdbCompile(
      src,
      { index: true },
      (error, doc) => {
        if (error) {
          reject(error);
        } else {
          resolve(doc);
        }
      },
    );
  });
}

module.exports = compileDesignDoc;
