import * as mutations from "../../mutation-types";
import * as actions from "../../action-types";

export default {
  [actions.SELECT_POKEMON_FOR_MODAL]({ commit }, pokemon) {
    commit(mutations.SET_SELECTED_POKEMON, pokemon);
    commit(mutations.OPEN_MODAL);
  },
  [actions.UNSELECT_POKEMON_FOR_MODAL]({ commit }) {
    commit(mutations.CLOSE_MODAL);
    commit(mutations.SET_SELECTED_POKEMON, null);
  },
  [actions.ADD_POKEMON_TO_FAVORITES]({ commit }, pokemon) {
    commit(mutations.ADD_FAVORITE_POKEMON, pokemon);
  },
  [actions.REMOVE_POKEMON_FROM_FAVORITES]({ commit }, pokemon) {
    commit(mutations.REMOVE_FAVORITE_POKEMON, pokemon);
  }
};
