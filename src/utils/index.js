const extractPokemonIdFromUrl = (url) => url.split('/').at(-2);
const createPokemonSrcFromUrl = (spritesUrl, itemUrl) => {
  let id = itemUrl.split('/').at(-2);
  return `${spritesUrl}${id}.png`;
};

export {
  extractPokemonIdFromUrl,
  createPokemonSrcFromUrl
}