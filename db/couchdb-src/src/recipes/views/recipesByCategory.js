const map = (doc) => {
  if (doc.name && doc.recipeMetadata && doc.recipeMetadata.categories) {
    doc.recipeMetadata.categories.map((recipe) => {
      emit(recipe, doc);
    });
  }
};

const reduce = (keys, values, rereduce) => {
  if (rereduce) {
    return sum(values);
  }
  return values.length;
};

module.exports = {
  map,
  reduce
};
