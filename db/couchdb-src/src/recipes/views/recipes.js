const map = (doc) => {
  if (doc.name && doc.recipeMetadata) {
    emit(doc.name, doc);
  }
};

module.exports = {
  map,
};
