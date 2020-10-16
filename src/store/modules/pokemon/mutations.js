import * as mutations from "../../mutation-types";
export default {
  [mutations.ADD_FAVORITE_POKEMON](state, pokemon) {
    state.favorites.push(pokemon);
  },
  [mutations.SET_SELECTED_POKEMON](state, pokemon) {
    state.selectedPokemon = pokemon;
  },
  [mutations.REMOVE_FAVORITE_POKEMON](state, pokemon) {
    const favoritesCopy = state.favorites;
    var index = favoritesCopy.findIndex(
      element => element.name === pokemon.name
    );
    favoritesCopy.splice(index, 1);
    state.favorites = favoritesCopy;
  }
};
