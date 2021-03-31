<template>
    <ion-page>
        <ion-content>
            <ion-icon :icon="arrowBackOutline" size="large" @click="GoBack"></ion-icon>
            <h1>Indstillinger</h1>
            <ion-button @click="SignOut" expand="full">Log ud</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
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
        IonButton
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

ion-icon {
    margin-top: 5.6vh;
    margin-left: 5vw;
    color: white;
}

ion-button {
    --background: linear-gradient(to right, #0BA360, #3CBA92);
    --border-radius: 4px;
    display: block;
    margin-left: 12vw;
    margin-right: 12vw;
    margin-top: 2vh;
    height: 6.8vh;
    border-radius: 4px;
    box-shadow: 4px;
    margin-top: 60vh;
}

h1 {
    color:white;
    text-align: center;
    margin-top: 2vh;
}



</style>