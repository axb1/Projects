<template>
    <ion-page>
        <ion-header>
            <ion-toolbar mode="ios">
                <ion-title>Indstillinger</ion-title>
                <ion-buttons slot="start">
                    <ion-icon :icon="arrowBackOutline" @click="GoBack"></ion-icon>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <button @click="GoToPreviousGames">Tidligere spil</button>
                <button>Whatever</button>
                <button>Whatever 2</button>
                <button>Whatever 3</button>
                <button>Whatever 4</button>
                <button>Whatever 5</button>
            </ion-list>
            <ion-button id="signout" @click="SignOut" expand="full">Log ud</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonList, IonButton, IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle} from '@ionic/vue';
import {arrowBackOutline} from 'ionicons/icons';
import firebase from 'firebase';

export default {
    name: 'settings',
    data: function() {
      return {
          loggedIn: false,
          arrowBackOutline
      };  
    },
    components: {
        IonPage,
        IonContent,
        IonList,
        IonButton,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonIcon,
        IonTitle
    },
    methods: {
        async SignOut() {
            try {
                const data = await firebase.auth().signOut();
                console.log(data);
                this.$router.push("/login");

            } catch (error) {
                console.log(error);
            }
        },
        GoBack() {
            this.$router.push('games');
        },
        GoToPreviousGames() {
            this.$router.push('previousgames');
        }
    },
    ionViewDidEnter() {
        var user = firebase.auth().currentUser;

        if (user) {
        console.log("User is signed in");

        } else {
        console.log("No user is signed in");
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

ion-button {
    --background: linear-gradient(to right, #0BA360, #3CBA92);
    --border-radius: 4px !important;
    height: 6vh;
    position: absolute;
    bottom: 10%;
    width: 80%;
    margin-left: 10vw;
}

button {
    width: 80vw;
    height: 8vh;
    border-radius: 1vh;
    background: #262A34;
    color: white;
    font-size: 1em;
    margin-top: 1vh;
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