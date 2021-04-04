<template>
    <ion-page>
        <ion-header>
            <ion-toolbar mode="ios">
                <ion-title>Tilføj ven</ion-title>
                <ion-buttons slot="start" @click="GoBack">
                    <ion-icon :icon="arrowBackOutline" size="large"></ion-icon>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ConfirmAddFriendAlert v-if="friendSearchResult.length !=0" v-bind:friend="friendSearchResult[0]"></ConfirmAddFriendAlert>
            <ion-input v-model="emailOrUsername" required=true placeholder="Email/brugernavn" v-on:keyup.enter="SearchForFriend"></ion-input>
            <ion-button @click="SearchForFriend" expand="block">Søg efter ven</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonHeader, IonToolbar, IonIcon, IonButton, IonButtons, IonTitle, IonInput} from '@ionic/vue';
import {arrowBackOutline} from 'ionicons/icons';
import ConfirmAddFriendAlert from './ConfirmAddFriendAlert.vue';

export default {
    name: 'addfriend',
    data: function() {
      return {
        arrowBackOutline,
        emailOrUsername: ''
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
        IonInput,
        ConfirmAddFriendAlert
    },
    computed: {
        friendSearchResult() {
          return this.$store.getters.getFriendSearchResult;
        },
        friends() {
          return this.$store.getters.getFriends;
        },
    },
    methods: {
        GoBack() {
            this.$router.push('/friendslist');
        },
        SearchForFriend() {
            this.$store.dispatch('setFriendSearchResult', this.emailOrUsername);
        }
    },
}
</script>
<style scoped>
ion-icon {
    color: white;
    margin-left: 5vw;
}

ion-button {
    --background: linear-gradient(to right, #0BA360, #3CBA92);
    --border-radius: 4px !important;
    height: 6vh;
    margin-top: 2vh;
    margin-left: 10vw;
    margin-right: 10vw;
    width: 80vw;
}

ion-title {
    --background: #141A33;
    color: white;
    text-align: center;
    font-size: 1.5rem;
}

ion-input{
  width: 80%;
  border-radius: 4px;
  box-sizing: border-box;
  height: 4vh;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #262A34;
  background-color: #262A34;
  color: white;
  margin-top: 10vh;
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



</style>