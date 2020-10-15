import * as mutations from '../../mutation-types'
export default {
  [mutations.ADD_FAVORITE_POKEMON](state, pokemon) {
    state.favorites.push(pokemon)
  },
  [mutations.SET_SELECTED_POKEMON](state, pokemon) {
    state.selectedPokemon = pokemon
  },
  [mutations.REMOVE_FAVORITE_POKEMON](state, pokemon) {
    const favoritesCopy = { ...state.favorites }
    delete favoritesCopy[favoritesCopy.findIndex((item) => { item.name === pokemon.name })]
    state.favorites = { ...favoritesCopy }
  }
}
