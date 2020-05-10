<template>
  <div class="home-container">
    <h1 class="home-heading">FLEPTILE</h1>
    <div class="block">
      <el-avatar
        :size="200"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      ></el-avatar>
    </div>
    <div class="home-input">
      <el-input
        v-model="name"
        class="input-class"
        :style="{ width: '30%' }"
        placeholder="What's your name?"
        @keyup.enter.native="playGame"
      ></el-input>
      <el-button
        :disabled="buttonDisabled()"
        :style="{ width: '30%' }"
        class="home-button"
        type="warning"
        @click="playGame"
      >
        PLAY
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      name: '',
    };
  },
  methods: {
    buttonDisabled() {
      return this.name.trim() === '';
    },

    playGame() {
      let name = this.name;
      this.$store.dispatch('setName', name);
      this.$router.push('instructions');
    },
  },
};
</script>
<style>
@import '../assets/styles.scss';
</style>
