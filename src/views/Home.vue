<template>
  <div v-if="!loading">
    <b-container class="main-container">
      <div class="search-bar">
        <b-icon-search class="search-bar__icon"></b-icon-search>
        <input
          class="search-bar__input"
          type="search"
          placeholder="Search"
          v-model="search"
        />
      </div>

      <b-list-group class="list" v-if="filteredPokemonList.length > 0">
        <div
          style="display: flex; justify-content: space-between; margin-left:8px; margin-right:8px"
        >
          <b-icon
            v-if="prevPage"
            icon="arrow-left"
            animation="cylon"
            style="color: #353535;"
            aria-hidden="true"
            @click="goPrevPage"
          ></b-icon>
          <div v-else></div>
          <b-icon
            v-if="nextPage"
            icon="arrow-right"
            animation="cylon"
            style="color: #353535;"
            aria-hidden="true"
            @click="goNextPage"
            >prev</b-icon
          >
          <div v-else></div>
        </div>
        <b-list-group-item
          v-for="(pokemon, index) in filteredPokemonList"
          :key="index"
          button
          class="list-item"
          @click="openModal(pokemon)"
        >
          <div class="list-item__text">
            {{ capitalize(pokemon.name) }}
          </div>
          <div
            class="list-item__badge"
            v-if="isFavorite(pokemon)"
            @click.stop="addToFavorites(pokemon)"
          >
            <b-icon-star-fill class="list-item__badge-icon-active">
            </b-icon-star-fill>
          </div>
          <div
            class="list-item__badge"
            v-else
            @click.stop="addToFavorites(pokemon)"
          >
            <b-icon-star-fill class="list-item__badge-icon"> </b-icon-star-fill>
          </div>
        </b-list-group-item>
      </b-list-group>
      <div class="empty-result" v-else>
        <p class="empty-result__title">Uh-oh!</p>
        <p class="empty-result__subtitle">
          We couldn't find what you were looking for
        </p>
      </div>
    </b-container>
    <Modal v-if="openedModal" />
    <div class="footer-menu">
      <b-button
        pill
        class="footer-menu__button"
        :variant="all"
        @click="showAll"
      >
        <b-icon-list-ul class="footer-menu__button-icon"></b-icon-list-ul>
        All
      </b-button>
      <b-button
        pill
        class="footer-menu__button"
        :variant="favorites"
        @click="showFavorites"
      >
        <b-icon-star-fill class="footer-menu__button-icon"></b-icon-star-fill>
        Favorites
      </b-button>
    </div>
  </div>
  <Loader v-else />
</template>

<script>
import axios from "axios";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import { mapState } from "vuex";
import {
  SELECT_POKEMON_FOR_MODAL,
  REMOVE_POKEMON_FROM_FAVORITES,
  ADD_POKEMON_TO_FAVORITES
} from "../store/action-types";

export default {
  name: "Home",
  data() {
    return {
      pokemons: [],
      filteredPokemons: [],
      search: "",
      loading: false,
      all: "primary",
      favorites: "secondary",
      prevPage: null,
      nextPage: null
    };
  },
  components: {
    Modal,
    Loader
  },
  computed: {
    ...mapState({
      openedModal: state => state.ui.modalOpened,
      favoritePokemons: state => state.pokemon.favorites
    }),
    filteredPokemonList() {
      return this.filteredPokemons.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  mounted() {
    this.getPokemons("https://pokeapi.co/api/v2/pokemon");
  },
  methods: {
    getPokemons(url) {
      this.loading = true;
      axios
        .get(url)
        .then(response => {
          if (response.data.next != null) this.nextPage = response.data.next;
          else this.nextPage = null;
          if (response.data.previous != null)
            this.prevPage = response.data.previous;
          else this.prevPage = null;
          this.pokemons = response.data.results;
          this.filteredPokemons = this.pokemons;
          this.loading = false;
        })
        .catch(error => console.log(error));
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
    openModal(pokemon) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then(response => {
          this.$store.dispatch(SELECT_POKEMON_FOR_MODAL, response.data);
        })
        .catch(error => console.log(error));
    },
    showAll() {
      this.filteredPokemons = this.pokemons;
      this.all = "primary";
      this.favorites = "secondary";
    },
    showFavorites() {
      this.filteredPokemons = this.favoritePokemons;
      this.all = "secondary";
      this.favorites = "primary";
    },
    goNextPage() {
      this.restartVariantsFooter();
      this.getPokemons(this.nextPage);
    },
    goPrevPage() {
      this.restartVariantsFooter();
      this.getPokemons(this.prevPage);
    },
    restartVariantsFooter() {
      this.all = "primary";
      this.favorites = "secondary";
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<style scoped>
.main-container {
  max-width: 570px;
}
.search-bar {
  width: 100%;
  border-radius: 5px;
  display: inline-flex;
  height: 50px;
  margin-top: 35px;
  background-color: #ffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
}
.search-bar__icon {
  width: 18px;
  height: 18px;
  padding: 16px;
  color: #bfbfbf;
}
.search-bar__input {
  width: 100%;
  padding: 16px;
  border-style: none;
  border-radius: 5px;
  height: 50px;
  outline: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  color: #353535;
}
.search-bar__input::placeholder {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  color: #bfbfbf;
}
.empty-result {
  margin-top: 50px;
  font-family: Lato;
  font-style: normal;
}
.empty-result__title {
  font-weight: bold;
  font-size: 36px;
  line-height: 43px;
  color: #353535;
}
.empty-result__subtitle {
  font-weight: 500;
  font-size: 20px;
  line-height: 150%;
  color: #5e5e5e;
}
.list {
  margin-top: 28px;
  margin-bottom: 100px;
}
.list-item {
  margin-top: 10px;
  border-radius: 5px;
  display: inline-flex;
  justify-content: space-between;
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  color: #353535;
  height: 60px;
}
.list-item__text {
  line-height: 35px;
  /* width: 500px; */
  /* height: 60px; */
  text-align: start;
}
@media only screen and (max-width: 600px) {
  .list-item__text {
    width: 300px;
  }
}
.list-item__badge {
  margin-top: -5px;
  padding-top: 10px;
  background-color: #f5f5f5;
  border-radius: 50%;
  width: 44px;
  height: 44px;
}
.list-item__badge-icon {
  color: #bfbfbf;
}
.list-item__badge-icon-active {
  color: #eca539;
}
.footer-menu {
  height: 80px;
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #ffffff;
  box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);
  z-index: 1;
}
.footer-menu__button {
  margin: 18px 15px;
  height: 44px;
  width: 275px;
  color: #ffffff;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
}
.footer-menu__button-icon {
  width: 22px;
  height: 22px;
}
@media only screen and (max-width: 630px) {
  .footer-menu__button {
    width: 150px;
  }
}
</style>
