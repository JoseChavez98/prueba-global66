<template>
  <b-container class="main-container">
    <img src="@/assets/main-pic.png" class="landing-image" />
    <p class="title">Welcome to Pokédex</p>
    <p class="subtitle">
      The digital encyclopedia created by Professor Oak is an invaluable tool to
      Trainers in the Pokémon world.
    </p>
    <router-link to="/home">
      <b-button class="starter-button" variant="primary" pill>
        Get started
      </b-button>
    </router-link>
  </b-container>
</template>

<script>
export default {
  name: "Landing"
};
</script>

<style scoped>
.main-container {
  max-width: 570px;
  margin-bottom: 40px;
}
.landing-image {
  margin-top: 83px;
  max-width: 350px;
}
.title {
  margin-top: 60px;
  height: 31px;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 31px;
}
.subtitle {
  margin-top: 30px;
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
}
.starter-button {
  margin-top: 61px;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  width: 131px;
  height: 44px;
}
</style>
