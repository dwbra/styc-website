/**
 * A function to return the first search result from each Youtube search query to place into the Youtube playlist.
 * @param {Array} resultsArray An array of Youtube search result objects.
 * @returns {Array<object>}
 */
const youtubeSearchModifier = resultsArray => {
  const newArray = resultsArray.map(dataObject => {
    const id = dataObject.value.items[0].id;
    return id;
  });
  return newArray;
};

export default youtubeSearchModifier;
