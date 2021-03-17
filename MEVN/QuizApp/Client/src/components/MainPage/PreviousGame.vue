<template>
<button v-if="(previousGame.player1.username == currentUser.username)">
    <img :src="previousGame.player2.img" alt="pfp">
    <p>{{previousGame.player2.username}}</p>
    <p>You lost</p>
</button>
<button v-else>
    <img :src="previousGame.player1.img" alt="pfp">
    <p>{{previousGame.player1.username}}</p>
    <p>You won!</p>
</button>
</template>

<script>
export default {
    name: 'previousgame',
    props: {previousGame: Object},
    data: function() {
      return {
          today: Date
      };  
    },
    computed: {
        currentUser() {
          return this.$store.getters.getCurrentUser;
        },
    },
    created() {
        this.today = new Date();
    }
    }
</script>

<style scoped>
button {
    background: #262A34;
    color: white;
    height: 8.6vh;
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 6px;
    margin-bottom: 1vh;
}

img {
    height: 40px;
    width: 40px;
    margin-left: 15vw;
}

p {
    font-size: 1.3em;
}

</style>