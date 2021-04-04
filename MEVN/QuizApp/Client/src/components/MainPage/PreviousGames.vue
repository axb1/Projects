<template>
    <ion-page>
        <ion-header>
            <ion-toolbar mode="ios">
                <ion-title>Tidligere spil</ion-title>
                <ion-buttons slot="start">
                    <ion-icon :icon="arrowBackOutline" @click="GoBack"></ion-icon>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list v-for="previousGame in previousGames" :key="previousGame._id">
              <PreviousGame v-bind:previousGame="previousGame"></PreviousGame>
              </ion-list>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonIcon, IonList, IonTitle} from '@ionic/vue';
import {arrowBackOutline} from 'ionicons/icons';
import PreviousGame from './PreviousGame';

export default {
    name: 'previousgames',
        computed: {
        previousGames() {
          return this.$store.getters.getPreviousGames;
        },
        currentUser() {
          return this.$store.getters.getCurrentUser;
        },
    },
    data: function() {
      return {
          arrowBackOutline
      };  
    },
    components: {
        IonPage,
        IonContent,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonIcon,
        IonList,
        PreviousGame,
        IonTitle
    },
    methods: {
        GoBack() {
            this.$router.push('settings');
        }
    },
}
</script>
<style scoped>


ion-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #181A20;
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