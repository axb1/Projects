<template>
    <ion-page>
        <ion-header>
            <ion-toolbar mode="ios">
                <ion-title>Vælg ven at spille mod</ion-title>
                <ion-buttons slot="start">
                    <ion-icon :icon="arrowBackOutline" @click="GoBack"></ion-icon>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
          </ion-list>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle, IonList} from '@ionic/vue';
import FacebookService from '../../api/FacebookService';
import {arrowBackOutline} from 'ionicons/icons';

export default {
    name: 'facebookfriendslist',
    computed: {
        FBAccessToken() {
            return this.$store.getters.getFBAccessToken;
        },
    },
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
        IonButtons,
        IonIcon,
        IonTitle,
        IonList,
    },
    methods: {
        GoBack() {
          this.$router.push('/findopponent');
        },
    },
    async ionViewWillEnter() {
        var friends = await FacebookService.getFriendsThatHaveApp(this.FBAccessToken);
        console.log(friends);
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