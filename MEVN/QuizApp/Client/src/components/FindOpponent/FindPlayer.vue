<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button class="iconbutton" @click="GoBack">
                        <ion-icon :icon="arrowBackOutline" size="large"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>Find modstander</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <h1>Modstandere</h1>
            <InviteToGameAlert v-if="playerSearchResult.length !=0" v-bind:player="playerSearchResult[0]"></InviteToGameAlert>
            <ion-input v-model="search" placeholder="Søg efter modstander.." v-on:keyup.enter="SearchForOpponent"></ion-input>
            <ion-button expand="block" v-on:click="SearchForOpponent">Søg efter modstander</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonHeader, IonToolbar, IonIcon, IonButton, IonButtons, IonTitle, IonInput} from '@ionic/vue';
import {arrowBackOutline} from 'ionicons/icons';
import InviteToGameAlert from '../FindOpponent/InviteToGameAlert.vue';

export default {
    name: 'findplayer',
    data: function() {
      return {
        arrowBackOutline,
        search: ""
      };  
    },
    components: {
        IonPage,
        IonContent,
        IonHeader,
        IonToolbar,
        IonIcon,
        IonButton,
        IonButtons,
        IonTitle,
        InviteToGameAlert,
        IonInput
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
            this.$store.dispatch('setPlayerSearchResult', this.search);
        },
    },
    ionViewWillEnter() {
        this.$store.dispatch('setPlayerSearchResult', "");
    }
}
</script>
<style scoped>

ion-icon {
    color: white;
}

ion-title {
    color: white;
    font-size: 1.3rem;
}



ion-buttons {
    --background: #181A20;
    padding: 0;
    margin: 0;
}

.iconbutton {
    --background: #181A20;
}

ion-header {
    background: #181A20;
    position: relative;
    height: 16vh;
    border-bottom: 0.55px solid #14161B;
}

h1 {
    color: white;
    margin-left: 5vw;
    margin-top: 2vh;
}
ion-toolbar {
  --background: #181A20;
  --border-style: none;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

ion-input {
    --padding-top: 1.0vh;
    --padding-bottom: 1.0vh;
    --padding-start: 1.5vh;
    --padding-end: 1.5vh;
    width: 80vw;
    border: 1px solid #262A34;
    border-radius: 4px;
    margin-left: 10vw;
    margin-right: 10vw;
    margin-bottom: 2vh;
    margin-top: 10vh;
    background-color: #262A34;
    color: white;
}

ion-button {
    --background: linear-gradient(to right, #0BA360, #3CBA92);
    --border-radius: 4px !important;
    height: 6vh;
    margin-top: 2vh;
    margin-left: 5.6vw;
    margin-right: 10vw;
}


</style>