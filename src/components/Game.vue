<template>
  <h1>cheaple</h1>
  <p>{{ gameState }}</p>
  <div class="game">
    <div class="trials">
      <div class="trial" :key="i" v-for="(trial, i) in trials">
        <div class="letter" v-for="(letter, j) in trial" :key="j">
          <p :class="[letterColors[i][j]]">{{ letter }}</p>
        </div>
      </div>
    </div>
  </div>

  <div v-if="gameState === 'Game is open'">
    <label for="guess">Make a guess:</label>
    <input
      id="guess"
      type="text"
      v-model="currentGuess"
      maxlength="5"
      @keyup.enter="submitGuess()"
      placeholder="apple"
    />
  </div>

  <button @click="gameStore.$reset()" v-else>Start new game</button>

  <p v-if="gameState === 'You lose'">The word was: {{ gameStore.targetWord }}</p>
</template>

<script>
import { useStore } from "../store";

export default {
  name: "Game",
  setup() {
    const gameStore = useStore();

    return {
      gameStore,
      currentGuess: "",
      submitGuess() {
        if (this.currentGuess.length != 5) {
          return;
        }

        if (this.gameStore.makeGuess(this.currentGuess)) {
          this.currentGuess = "";
        }
      },
    };
  },
  computed: {
    gameState() {
      return this.gameStore.gameState;
    },

    trials() {
      return this.gameStore.trials;
    },

    letterColors() {
      return this.gameStore.letterColors;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.game
  display: flex
  justify-content: center
  align-items: center

  .trials
    display: flex
    flex-direction: column
    font-size: 2rem
    max-width: 768px

    .trial
      display: flex

      p
        margin: 1em
        padding: 1em

    .yellow
      background-color: orange
      color: white

    .green
      background-color: green

    .grey
      background-color: grey
      color: white
</style>
