<template>
  <div v-if="!loading">
    <b-container class="main-container">
      <div class="search-bar">
        <b-icon-search class="search-bar__icon"></b-icon-search>
        <input class="search-bar__input" type="search" placeholder="Search" />
      </div>
      <b-list-group class="list">
        <b-list-group-item
          v-for="(pokemon, index) in pokemons"
          :key="index"
          button
          class="list-item"
          ><span class="list-item__text" @click="openModal(pokemon)"
            >{{ pokemon.name }}
          </span>
          <div class="list-item__badge" @click="addToFavorites">
            <b-icon-star-fill class="list-item__badge-icon"> </b-icon-star-fill>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-container>
    <Modal />
    <div class="footer-menu">
      <b-button pill class="footer-menu__button" variant="primary">
        <b-icon-list-ul class="footer-menu__button-icon"></b-icon-list-ul>
        All
      </b-button>
      <b-button pill class="footer-menu__button" variant="secondary">
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
import { SELECT_POKEMON_FOR_MODAL } from "../store/action-types";

export default {
  name: "Home",
  data() {
    return {
      pokemons: [],
      loading: false,
    };
  },
  components: {
    Modal,
    Loader
  },
  mounted() {
    this.getPokemons();
  },
  methods: {
    getPokemons() {
      this.loading = true;
      axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then(response => {
          this.pokemons = response.data.results;
          this.loading = false;
        })
        .catch(error => console.log(error));
    },
    addToFavorites() {
      document.querySelector(".list-item__badge-icon").style.color = "#eca539";
    },
    openModal(pokemon) {
      this.selectForModal(pokemon);
      document.querySelector(".modal").style.display = "block";
    },
    selectForModal(pokemon) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then(response => {
          this.$store.dispatch(SELECT_POKEMON_FOR_MODAL, response.data);
        })
        .catch(error => console.log(error));
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
.list {
  margin-top: 40px;
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
  width: 500px;
  height: 45px;
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
.footer-menu {
  height: 80px;
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #ffffff;
  box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);
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
@media only screen and (max-width: 600px) {
  .footer-menu__button {
    width: 150px;
  }
}
</style>