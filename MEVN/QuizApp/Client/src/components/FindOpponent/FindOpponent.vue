<template>
    <ion-page>
        <ion-content>
          <ion-icon :icon="arrowBackOutline" @click="GoBack" id="arrow"></ion-icon>
          <h1>Hvem vil du spille mod?</h1>
            <ion-item lines="none">
              <ion-label color="light" @click="GoToRandomOpponent">Tilfældig modstander</ion-label>
              <ion-icon :icon="helpOutline" slot="start"></ion-icon>
            </ion-item>
            <ion-item lines="none">
              <ion-label color="light" @click="GoToFriendslist">QuizNordven</ion-label>
              <ion-icon :icon="personSharp" slot="start"></ion-icon>
            </ion-item>
            <ion-item lines="none">
              <ion-label color="light">Facebookven</ion-label>
              <ion-icon :icon="logoFacebook" slot="start"></ion-icon>
            </ion-item>
            <ion-item lines="none">
              <ion-label color="light" @click="GoToFindPlayer">Find modstander</ion-label>
              <ion-icon :icon="search" slot="start"></ion-icon>
            </ion-item>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonLabel, IonIcon, IonItem} from '@ionic/vue';
import { helpOutline, personSharp, logoFacebook, search, arrowBackOutline} from 'ionicons/icons';

export default {
    name: 'findopponent',
    data: function() {
      return {
        helpOutline,
        personSharp,
        logoFacebook,
        search,
        arrowBackOutline,
      };  
    },
    components: {
        IonPage,
        IonContent,
        IonLabel,
        IonIcon,
        IonItem,
    },
    methods: {
        GoBack() {
          var lookingForRandomOpponent = true;
                this.$router.push({
                name: 'games',
                params: {
                items: lookingForRandomOpponent
               }
              })
        },

        GoToRandomOpponent() {
          this.$router.push('/randomopponent');
        },
        GoToFriendslist() {
          this.$router.push('/friendslist');
        },
        GoToFindPlayer() {
          this.$router.push('/findplayer');
        }
    },
        ionViewWillEnter() {
        this.$store.dispatch('setPlayerSearchResult', "");
    }
}
</script>
<style scoped>
ion-title {
    font-weight: bolder;
    text-align: center;
    margin-right: 5vh;
    margin-left: 5vh;
    font-size: 1.2rem;
    color: white;
}

ion-item {
  --background: #262A34;
  --padding-top: 1.5vh;
  --padding-bottom: 1.5vh;
  --border-radius: 6px;
  margin-top: 1.5vh;
  margin-left: 5vw;
  margin-right: 5vw;
}


ion-icon {
    color: white;
}

ion-label {
  --color: white;
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

h1 {
    color:white;
    text-align: center;
    margin-top: 10vh;
    margin-bottom: 4vh;
    margin-left: 5vw;
    margin-right: 5vw;
}

a {
    text-decoration: none;
    color: white;
}

#arrow {
    margin-top: 5.6vh;
    margin-left: 5vw;
    font-size: 5vh;
    color: white;
}


</style>