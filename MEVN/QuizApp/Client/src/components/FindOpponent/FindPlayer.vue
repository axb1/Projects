<template>
    <ion-page>
        <ion-header>
            <ion-toolbar mode="ios">
                <ion-title>Find modstander</ion-title>
                <ion-buttons slot="start">
                    <ion-icon :icon="arrowBackOutline" @click="GoBack"></ion-icon>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
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
    margin-left: 10vw;
    margin-right: 10vw;
}


ion-header {
    background: #181A20;
    position: relative;
    height: 16vh;
    border-bottom: 0.55px solid #14161B;

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

ion-buttons {
    color: white;
    padding-left: 6vw;
    padding-right: 6vw;
    font-size: 5vh;
}

ion-title {
    color: white;
    font-size: 1.4em;
}



</style>