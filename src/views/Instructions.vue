<template>
  <div class="instructions-container">
    <h1 class="home-heading">FLEPTILE</h1>
    <div class="block">
      <div class="instructions-list">
        Hi {{ name }}, before you get going, here are some instructions on how
        to play the game.
      </div>
      <ul class="instructions-list">
        <li class="list-item">Click on "Play Game".</li>
        <li class="list-item">
          You will get 3 seconds to memorize the superheroes on the tiles.
        </li>
        <li class="list-item">
          Click on two tiles to see if you remembered right or wrong.
        </li>
      </ul>
      <div class="instructions-list">
        Good Luck...!
      </div>
      <el-button
        :style="{ width: '30%', marginTop: '5%', marginBottom: '5%' }"
        class="home-button"
        type="warning"
        @click="playGame"
      >
        PLAY GAME
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.$store.state.name.toUpperCase(),
    };
  },
  methods: {
    playGame() {
      this.$router.push('game');
    },
  },
};
</script>

<style>
@import '../assets/styles.scss';
</style>
