<template>
    <ion-page>
        <ion-content>
            <ion-icon :icon="arrowBackOutline" size="large" @click="GoBack"></ion-icon>
            <h1>Settings</h1>
            <ion-button @click="SignOut" expand="full">Sign out</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import { Plugins, } from '@capacitor/core';
const { PushNotifications } = Plugins;
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
    created() {
        var user = firebase.auth().currentUser;

        if (user) {
        console.log("User is signed in");

        } else {
        console.log("No user is signed in");
        }
        },
    mounted() {
            // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification) => {
          this.$router.push('games');
        alert('Push received: ' + JSON.stringify(notification));
      }
    );
    }
    }
</script>
<style scoped>

ion-icon {
    margin-top: 4vh;
    margin-left: 4vw;
    color: white;
}

ion-button {
    color: white;
    margin: 0;
    position: absolute;
    top: 90%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    --background: linear-gradient(to right, #0BA360, #3CBA92);
}

h1 {
    color:white;
    text-align: center;
    margin-top: 2vh;
}



</style>