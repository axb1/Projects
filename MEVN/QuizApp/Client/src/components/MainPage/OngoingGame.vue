<template>
    <button v-if="(ongoingGame.player1.myTurn == false && ongoingGame.player1.username == currentUser.username)" class="notmyturn">
        <img :src="ongoingGame.player2.img" alt="pfp">
        <p>{{ongoingGame.player2.username}}</p>
        <p>{{Math.floor(Math.floor((currentTime-Date.parse(ongoingGame.player2.dateOfLastTurn)))/(1000*60)) +"m"}}</p>
    </button>
    <button v-else-if="(ongoingGame.player1.myTurn == true && ongoingGame.player1.username == currentUser.username)" @click="GoToGame(ongoingGame)">
        <img :src="ongoingGame.player2.img" alt="pfp">
        <p>{{ongoingGame.player2.username}}</p>
        <p>{{"0m"}}</p>
    </button>
    <button v-else-if="(ongoingGame.player2.myTurn == true && ongoingGame.player2.username == currentUser.username)" @click="GoToGame(ongoingGame)">
        <img :src="ongoingGame.player1.img" alt="pfp">
        <p>{{ongoingGame.player1.username}}</p>
        <p>{{"0m"}}</p>
    </button>
    <button v-else-if="(ongoingGame.player2.myTurn == false && ongoingGame.player2.username == currentUser.username)" class="notmyturn">
        <img :src="ongoingGame.player1.img" alt="pfp">
        <p>{{ongoingGame.player1.username}}</p>
        <p>{{Math.floor(Math.floor((currentTime-Date.parse(ongoingGame.player1.dateOfLastTurn)))/(1000*60)+"m")}}</p>
    </button>
</template>


<script>
export default {
    name: 'ongoinggame',
    props: {ongoingGame: Object},
    computed: {
        currentUser() {
            return this.$store.getters.getCurrentUser;
        },
        currentTime() {
            return this.$store.getters.getCurrentTime;
        }
    },
    data: function() {
      return {
      };  
    },
    methods: {
        GoToGame(currentGame) {
            this.$store.dispatch('setCurrentGame', currentGame);
            this.$router.push('/selectcategories');
        }
    },
}
</script>

<style scoped>
button  {
    background: #262A34;
    color: white;
    height: 8.6vh;
    width: 80vw;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 1vw;
    margin-bottom: 1.5vh;
}

img {
    height: auto;
    max-width: 15%;
    border-radius: 50%;
}

p {
    font-size: 1.3em;
}

.notmyturn {
    opacity: 0.5;
}

</style>