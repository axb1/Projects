<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button class="iconbutton" @click="GoBack">
                        <ion-icon :icon="arrowBackOutline" size="large"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <ion-title>Tilføj ven</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
                <div>
                    <form action="/action_page.php">
                        <input type="text" id="searchinput" name="searchinput" placeholder="Email/brugernavn">
                    </form>
                </div>
                <ion-button @click="SearchForFriend">Søg efter ven</ion-button>
                <ConfirmAddFriendAlert v-if="friendSearchResult.length !=0" v-bind:friend="friendSearchResult[0]"></ConfirmAddFriendAlert>


        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonHeader, IonToolbar, IonIcon, IonButton, IonButtons, IonTitle} from '@ionic/vue';
import {arrowBackOutline} from 'ionicons/icons';
import ConfirmAddFriendAlert from './ConfirmAddFriendAlert.vue';

export default {
    name: 'addfriend',
    data: function() {
      return {
        arrowBackOutline,
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
        ConfirmAddFriendAlert
    },
    computed: {
        friendSearchResult() {
          return this.$store.getters.getFriendSearchResult;
        },
    },
    methods: {
        GoBack() {
            this.$router.push('/friendslist');
        },
        SearchForFriend() {
            this.$store.dispatch('setFriendSearchResult', document.getElementById('searchinput').value);
        }
    },
}
</script>
<style scoped>
ion-icon {
    color: white;
}

ion-button {
  --background: #262A34;
  --padding-top: 1.5vh;
  --padding-bottom: 1.5vh;
  --border-radius: 6px;
  margin-top: 1.5vh;
  margin-left: 5vw;
  margin-right: 5vw;
}

ion-buttons {
    --background: #181A20;
}

.iconbutton {
    --background: #181A20;
}

ion-title {
    --background: #141A33;
    color: white;
    text-align: center;
    font-size: 1.5rem;
}

input[type=text], select {
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