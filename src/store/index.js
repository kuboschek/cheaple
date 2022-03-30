import { slotFlagsText } from '@vue/shared'
import { defineStore } from 'pinia'

import listOfWords from './words'


export const useStore = defineStore('main', {
    state: () => {
        return {
            targetWord: listOfWords[Math.floor(Math.random()*listOfWords.length)], // everything is lowercase
            trials: []
        }
    },
    actions: {
        makeGuess(guessWord) {
            if (guessWord.length != 5) {
                return false
            }

            if (!listOfWords.includes(guessWord)) {
                return false
            }

            this.trials.push(guessWord.toLowerCase())

            return true
        },
    },
    getters: {
        gameState: (state) => {
            for(var i = 0; i < state.trials.length; i++) {
                if(state.trials[i] === state.targetWord) {
                    return "You win"
                }
            }

            if(state.trials.length === 6) {
                return "You lose"
            }

            return "Game is open"
        },

        letterColors: (state) => {
            return state.trials.map((trial) => {
                var colors = []

                for(var i = 0; i < trial.length; i++) {
                    if(state.targetWord.charAt(i) === trial.charAt(i)) {
                        colors.push("green")
                    } else if(state.targetWord.includes(trial.charAt(i))) {
                        colors.push("yellow")
                    } else {
                        colors.push("grey")
                    }
                }

                return colors
            })
        }
    }
})