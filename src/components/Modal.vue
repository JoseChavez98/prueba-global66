<template>
  <div class="modal">
    <b-alert v-model="copyAlert" class="alert" variant="info" dismissible>
      Copied to clipboard
    </b-alert>
    <div class="modal-content">
      <div class="close" @click="closeModal">
        <span style="color: black;">&times;</span>
      </div>
      <div>
        <img src="@/assets/background.png" class="modal-image" />
        <img
          v-bind:src="this.selectedPokemon.sprites.front_shiny"
          class="pokemon-image"
        />
      </div>
      <b-container class="info-container">
        <div class="info-item">
          <span class="info-item__title">Name: </span>
          <span class="info-item__data">
            {{ capitalize(selectedPokemon.name) }}</span
          >
        </div>
        <div class="info-item">
          <span class="info-item__title">Weight: </span>
          <span class="info-item__data"> {{ selectedPokemon.weight }}</span>
        </div>
        <div class="info-item">
          <span class="info-item__title">Height: </span>
          <span class="info-item__data"> {{ selectedPokemon.height }}</span>
        </div>
        <div class="info-item">
          <span class="info-item__title">Types: </span>
          <span class="info-item__data">
            {{ getTypesString(selectedPokemon.types) }}</span
          >
        </div>
      </b-container>
      <div class="footer">
        <b-button
          pill
          variant="primary"
          class="footer-button"
          @click="
            copyData();
            copyAlert = true;
          "
        >
          Share to my friends
        </b-button>
        <div
          class="footer-badge"
          v-if="isFavorite(selectedPokemon)"
          @click="addToFavorites(selectedPokemon)"
        >
          <b-icon-star-fill class="footer-badge__icon-active" font-scale="1.5">
          </b-icon-star-fill>
        </div>

        <div
          class="footer-badge"
          v-else
          @click="addToFavorites(selectedPokemon)"
        >
          <b-icon-star-fill class="footer-badge__icon" font-scale="1.5">
          </b-icon-star-fill>
        </div>
      </div>
    </div>
  </div>
  <!-- <b-modal title="BootstrapVue"> 

  </b-modal> -->
</template>

<script>
import { mapState } from "vuex";
import { UNSELECT_POKEMON_FOR_MODAL } from "../store/action-types";
import {
  REMOVE_POKEMON_FROM_FAVORITES,
  ADD_POKEMON_TO_FAVORITES
} from "../store/action-types";
export default {
  name: "Modal",
  data() {
    return {
      copyAlert: false
    };
  },
  computed: {
    ...mapState({
      selectedPokemon: state => state.pokemon.selectedPokemon,
      favoritePokemons: state => state.pokemon.favorites
    })
  },
  methods: {
    closeModal() {
      this.$store.dispatch(UNSELECT_POKEMON_FOR_MODAL);
      document.querySelector(".modal").style.display = "none";
    },
    getTypesString(types) {
      var newString = "";
      types.forEach(element => {
        newString += element.type.name;
        newString += ", ";
      });
      return newString.slice(0, newString.length - 2);
    },
    addToFavorites(pokemon) {
      const found = this.favoritePokemons.find(
        element => element.name === pokemon.name
      );
      if (found) {
        this.$store.dispatch(REMOVE_POKEMON_FROM_FAVORITES, pokemon);
      } else {
        this.$store.dispatch(ADD_POKEMON_TO_FAVORITES, pokemon);
      }
    },
    isFavorite(pokemon) {
      const found = this.favoritePokemons.find(
        element => element.name === pokemon.name
      );
      return found;
    },
    copyData() {
      let name = "name: " + this.selectedPokemon.name + ", ";
      let weight = "weight: " + this.selectedPokemon.weight + ", ";
      let height = "height: " + this.selectedPokemon.height + ", ";
      let types = "types: " + this.getTypesString(this.selectedPokemon.types);
      let copyText = name + weight + height + types;
      navigator.clipboard.writeText(copyText);
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<style scoped>
.info-container {
  margin-top: 10px;
  max-width: 510px;
}
@media only screen and (max-width: 600px) {
  .info-container {
    max-width: 315px;
  }
}
.modal {
  display: block;
  position: fixed;
  z-index: 2;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-image {
  height: 230px;
  width: 100%;
}
.pokemon-image {
  position: absolute;
  top: 0.1%;
  left: 24%;
  height: 250px;
  z-index: 3;
}
@media only screen and (max-width: 600px) {
  .pokemon-image {
    left: 11%;
  }
}
.alert {
  width: 540px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
}
@media only screen and (max-width: 600px) {
  .alert {
    width: 345px;
  }
}
.modal-content {
  background-color: #fefefe;
  margin: auto;
  border: 1px solid #888;
  width: 540px;
  height: 80%;
  max-height: 516px;
  border-radius: 5px;
  animation-name: animatetop;
  animation-duration: 0.4s;
  overflow: auto;
}
@media only screen and (max-width: 600px) {
  .modal-content {
    width: 345px;
  }
}
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
.close {
  position: absolute;
  right: 15px;
  top: 15px;
  width: 26px;
  height: 26px;
  background: #ffff;
  border-radius: 50%;
  font-size: 28px;
  font-weight: bold;
  opacity: 100;
}
.info-item {
  width: 100%;
  height: 47px;
  border-bottom: 1px solid #e8e8e8;
  text-align: start;
}
.info-item__title {
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 150%;
  color: #5e5e5e;
  line-height: 45px;
}
.info-item__data {
  font-family: Lato;
  font-style: normal;
  font-size: 18px;
  line-height: 150%;
  color: #5e5e5e;
  line-height: 45px;
}
.footer {
  display: inline-flex;
  justify-content: space-between;
  margin: 20px 43px;
}
@media only screen and (max-width: 600px) {
  .footer {
    margin: 20px 28px;
  }
}
.footer-button {
  width: 195px;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
}
.footer-badge {
  margin-top: -5px;
  padding-top: 10px;
  background-color: #f5f5f5;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  cursor: pointer;
}
.footer-badge__icon-active {
  color: #eca539;
}
.footer-badge__icon {
  color: #bfbfbf;
}
</style>
