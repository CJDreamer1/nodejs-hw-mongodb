function parseIsFavouriteParams(query) {
  const { isFavourite } = query;
  return {
    isFavourite:
      isFavourite === 'true'
        ? true
        : isFavourite === 'false'
        ? false
        : undefined,
  };
}

export { parseIsFavouriteParams };
