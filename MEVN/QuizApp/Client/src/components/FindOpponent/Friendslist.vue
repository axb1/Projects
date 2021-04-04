<template>
    <ion-page>
        <ion-header>
            <ion-toolbar mode="ios">
                <ion-title>Vælg ven at spille mod</ion-title>
                <ion-buttons slot="start">
                    <ion-icon :icon="arrowBackOutline" @click="GoBack"></ion-icon>
                </ion-buttons>
                <ion-buttons slot="end">
                    <ion-icon :icon="addCircleOutline" @click="GoToAddFriend"></ion-icon>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list v-for="friend in friends" :key="friend._id">
              <InviteToGameAlert v-bind:player="friend"></InviteToGameAlert>
          </ion-list>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle, IonList} from '@ionic/vue';
import {arrowBackOutline, addCircleOutline} from 'ionicons/icons';
import InviteToGameAlert from './InviteToGameAlert';

export default {
    name: 'friendslist',
    data: function() {
      return {
        arrowBackOutline,
        addCircleOutline
      };  
    },
    computed: {
        friends() {
          return this.$store.getters.getFriends;
        },
    },
    components: {
        IonPage,
        IonContent,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonIcon,
        IonTitle,
        IonList,
        InviteToGameAlert
    },
    methods: {
        GoBack() {
          this.$router.push('/findopponent');
        },
        GoToAddFriend() {
            this.$router.push('/addfriend');
        }
    },
    ionViewWillEnter() {
        this.$store.dispatch('setFriendSearchResult', "");
        this.$store.dispatch('setFriends');
    }

}
</script>
<style scoped>
ion-buttons {
    color: white;
    padding-left: 6vw;
    padding-right: 6vw;
    font-size: 5vh;
}

ion-button {
    --background: #262A34;
    height: 8.6vh;
    color: white;
    width: 90%;
}

ion-title {
    --background: #141A33;
    color: white;
    font-size: 1.1em;
    margin: 0;
    padding: 0;
}

ion-list {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
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




</style>