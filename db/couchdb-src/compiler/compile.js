const fs = require('fs-extra'); // eslint-disable-line import/no-extraneous-dependencies
const { zip } = require('lodash');
const path = require('path');

const compileDesignDoc = require('./compileDesignDoc');
const convertDesignDocToES5 = require('./convertDesignDocToES5');
const designDocsSrc = require('../src');

async function compile() {
  const keys = Object.keys(designDocsSrc);
  const designDocs = await Promise.all(
    keys.map(async (key) => {
      const designDocId = `_design/${key}`;
      const designDocSrc = designDocsSrc[key];
      const designDocSrcWithId = {
        _id: designDocId,
        ...designDocSrc,
      };
      const designDoc = await compileDesignDoc(designDocSrcWithId);
      const es5DesignDoc = await convertDesignDocToES5(designDoc);
      return es5DesignDoc;
    }),
  );
  await Promise.all(
    zip(keys, designDocs)
      .map(([key, designDoc]) => fs.outputJSON(
        path.resolve(__dirname, '../../couchdb/recipes', `${key}.json`),
        designDoc,
        { spaces: 2 },
      )),
  );
}

module.exports = compile;
