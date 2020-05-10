<template>
  <div class="card-container">
    <h1 class="game-heading">FLEPTILE</h1>
    <div class="game-content">
      <div class="left-panel">
        <div class="cards-pack">
          <div class="card-body" v-for="image in shuffled" :key="image.index">
            <vue-flipcard
              :ref="image.index"
              :width="getWidthAndHeight()"
              :height="getWidthAndHeight()"
              direction="horizontal"
              disable
            >
              <template v-slot:front>
                <div
                  class="front-slot"
                  :style="[image.found ? { opacity: '0.5' } : { opacity: '1' }]"
                >
                  <img
                    :src="image.url"
                    :style="{ width: 'inherit', height: 'inherit' }"
                    alt=""
                  />
                </div>
              </template>
              <template v-slot:back>
                <div @click="flipInGame(image)" class="back-slot"></div>
              </template>
            </vue-flipcard>
          </div>
        </div>
      </div>

      <div class="right-panel" v-if="found < 8">
        <div v-if="startingTime > 0">
          {{ getStartingTime() }}
        </div>
        <div>
          {{ getAttempt() }}
        </div>
        <div>{{ found }} found</div>
      </div>
      <div class="right-panel" v-if="found === 8">
        <div class="result-text">
          Wooohhoooo!! You've found all the superheroes.
        </div>
        <div :style="{ marginTop: '5%' }">
          Your accuracy:
        </div>
        <div class="accuracy">
          <animated-number
            :value="getAccuracy()"
            :formatValue="formatAccuracy"
            :duration="1000"
          />
        </div>
        <div>
          <img width="20%" :src="getEmoji()" alt="" />
        </div>
        <el-button @click="playAgain" type="warning">
          Play Again
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import VueFlipcard from 'vue-flipcard';
import AnimatedNumber from 'animated-number-vue';
import { images } from '../consts/data';
export default {
  name: 'Game',
  data() {
    return {
      images: images,
      shuffled: [],
      startingTime: 3,
      count: 0,
      currentFirstCard: null,
      currentSecondCard: null,
      working: false,
      found: 0,
    };
  },
  mounted() {
    this.reset();
  },
  computed: {
    screenSize() {
      return document.getElementsByClassName('card-container')[0].clientWidth;
    },
  },
  methods: {
    playAgain() {
      this.$router.push('/');
    },
    getWidthAndHeight() {
      if (this.screenSize < 610) {
        return 100;
      }
      return 134;
    },
    formatAccuracy(value) {
      return value.toFixed(2) + ' %';
    },
    getEmoji() {
      let accuracy = this.getAccuracy();
      if (accuracy > 85) {
        return 'https://cdn.shopify.com/s/files/1/1061/1924/products/OMG_Face_Emoji_large.png?v=1571606037';
      }
      if (accuracy > 70 && accuracy < 85) {
        return 'https://cdn.shopify.com/s/files/1/1061/1924/products/Sunglasses_Emoji_be26cc0a-eef9-49e5-8da2-169bb417cc0b_grande.png?v=1571606036';
      }
      if (accuracy > 50 && accuracy < 70) {
        return 'https://cdn.shopify.com/s/files/1/1061/1924/products/Slightly_Smiling_Face_Emoji_87fdae9b-b2af-4619-a37f-e484c5e2e7a4_large.png?v=1571606036';
      }
      if (accuracy < 50) {
        return 'https://cdn.shopify.com/s/files/1/1061/1924/products/Tongue_Out_Emoji_with_Winking_Eye_876290ec-609b-498e-84ae-b195218ea438_large.png?v=1571606036';
      }
    },
    reset() {
      this.working = true;
      this.shuffle(images);
      setInterval(() => {
        if (this.startingTime > 0) {
          this.startingTime = this.startingTime - 1;
        }
      }, 1000);
      setTimeout(() => {
        this.flipAll(this.shuffled);
        this.working = false;
      }, 3000);
    },
    shuffle(array) {
      for (var i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      this.shuffled = array;
    },
    flipAll(array) {
      for (var i = 0; i < array.length; i++) {
        this.flipCard(array[i].index);
      }
    },
    getStartingTime() {
      return this.startingTime === 1
        ? this.startingTime + ' sec'
        : this.startingTime + ' secs';
    },
    getAttempt() {
      return Math.floor(this.count / 2) === 1
        ? Math.floor(this.count / 2) + ' attempt'
        : Math.floor(this.count / 2) + ' attempts';
    },
    getAccuracy() {
      return (8 / Math.floor(this.count / 2)) * 100;
    },
    flipCard(index) {
      this.$refs[index][0].flip();
    },
    flipInGame(image) {
      if (!this.working) {
        this.count = this.count + 1;
        this.working = true;
        if (this.count % 2 !== 0) {
          this.currentFirstCard = image;
          this.$refs[image.index][0].flip();
          this.working = false;
        } else {
          this.currentSecondCard = image;
          this.$refs[image.index][0].flip();
          if (this.currentFirstCard.key === this.currentSecondCard.key) {
            this.found += 1;
            setTimeout(() => {
              this.shuffled.map((item) => {
                if (item.key === image.key) {
                  item.found = true;
                }
              });
              this.working = false;
            }, 500);
          } else {
            setTimeout(() => {
              this.flipCard(this.currentFirstCard.index);
              this.flipCard(this.currentSecondCard.index);
              this.currentFirstCard = null;
              this.currentSecondCard = null;
              this.working = false;
            }, 1000);
          }
        }
      }
    },
  },

  components: {
    'vue-flipcard': VueFlipcard,
    'animated-number': AnimatedNumber,
  },
};
</script>
<style>
@import '../assets/styles.scss';
</style>
