const map = (doc) => {
  if (doc.name && doc.recipeMetadata && doc.recipeMetadata.categories) {
    doc.recipeMetadata.categories.map((category) => {
      emit(category, null);
    });
  }
};

const reduce = (keys, value) => {
  return true
}

module.exports = {
  map,
  reduce,
};
