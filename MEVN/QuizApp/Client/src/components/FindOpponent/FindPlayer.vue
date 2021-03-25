<template>
    <ion-page>
        <ion-content>
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-icon :icon="arrowBackOutline" size="large" @click="GoBack"></ion-icon>
                    </ion-buttons>
                    <ion-title>Find modstander</ion-title>
                </ion-toolbar>
          </ion-header>
                <div>
                    <form action="/action_page.php">
                        <input type="text" id="searchinput" name="searchinput" placeholder="Email/brugernavn">
                    </form>
                </div>
                <div class="container">
                    <ion-button id="search" @click="SearchForOpponent">Søg efter modstander</ion-button>
                </div>
                <InviteToGameAlert v-if="playerSearchResult.length !=0" v-bind:player="playerSearchResult[0]"></InviteToGameAlert>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonIcon, IonButton, IonButtons, IonTitle} from '@ionic/vue';
import {arrowBackOutline} from 'ionicons/icons';
import InviteToGameAlert from '../FindOpponent/InviteToGameAlert.vue';

export default {
    name: 'findplayer',
    data: function() {
      return {
        arrowBackOutline,
      };  
    },
    components: {
        IonPage,
        IonContent,
        IonIcon,
        IonButton,
        IonButtons,
        IonTitle,
        InviteToGameAlert
    },
    computed: {
        playerSearchResult() {
          return this.$store.getters.getPlayerSearchResult;
        },
    },
    methods: {
        GoBack() {
            this.$router.push('/findopponent');
        },
        SearchForOpponent() {
            this.$store.dispatch('setPlayerSearchResult', document.getElementById('searchinput').value);
        },
    },
    created() {
        this.$store.dispatch('setPlayerSearchResult', "");
    }
}
</script>
<style scoped>
ion-icon {
    color: white;
    margin-left: 5vw;
}

ion-title {
    color: white;
}

h1 {
    text-align: center;
    color: white
}

input[type=text], select {
  width: 80%;
  margin-top: 3vh;
  border-radius: 4px;
  box-sizing: border-box;
  height: 4vh;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #262A34;
  background-color: #262A34;
  color: white;
}

.container {
    display: flex;
    justify-content: center;
    margin-top: 2vh;
}

ion-buttons {
    --background: #181A20;
}

.iconbutton {
    --background: #181A20;
}

ion-header {
    position: relative;
    height: 14vh;
}

ion-toolbar {
    --background: #181A20;
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}

ion-button {
    --background: linear-gradient(to right, #0BA360, #3CBA92);
    --border-radius: 4px !important;
    width: 75vw;
    height: 6vh;
}


</style>