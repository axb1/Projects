<template>
    <ion-page>
        <ion-content>
          <div class="header">
            <img src="../../assets/settings.svg" alt="settings" v-on:click="GoToSettings()" id="settings">
            <h1>QuizNord</h1>
            <img v-on:click="GoToFindOpponent()" src="../../assets/plus.png" alt="add" id="add">
            <ion-badge v-if="currentUser.invites!=undefined && currentUser.invites.length!=0" v-on:click="GoToInvites()">{{currentUser.invites.length}}</ion-badge>
          </div>
          <h1 id="yourturn">Din tur</h1>
            <div v-if="ongoingGames != undefined">
              <ion-list v-for="ongoingGame in ongoingGames" :key="ongoingGame._id">
                <OngoingGame v-if="(ongoingGame.player2.myTurn == true && ongoingGame.player2.username == currentUser.username)" v-bind:ongoingGame="ongoingGame"></OngoingGame>
                <OngoingGame v-if="(ongoingGame.player1.myTurn == true && ongoingGame.player1.username == currentUser.username)" v-bind:ongoingGame="ongoingGame"></OngoingGame>
              </ion-list>
            </div>
          <h1>Deres tur</h1>
          <div v-if="ongoingGames != undefined">
            <ion-list v-for="ongoingGame in ongoingGames" :key="ongoingGame._id">
              <OngoingGame v-if="(ongoingGame.player2.myTurn == false && ongoingGame.player2.username == currentUser.username)" v-bind:ongoingGame="ongoingGame"></OngoingGame>
              <OngoingGame v-if="(ongoingGame.player1.myTurn == false && ongoingGame.player1.username == currentUser.username)" v-bind:ongoingGame="ongoingGame"></OngoingGame>
            </ion-list>
          </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonBadge, IonList} from '@ionic/vue';
import OngoingGame from './OngoingGame';
import firebase from 'firebase';
import { Plugins, } from '@capacitor/core';
const { PushNotifications } = Plugins;

export default {
    name: '',
    computed: {
        ongoingGames() {
          return this.$store.getters.getOngoingGames;
        },
        previousGames() {
          return this.$store.getters.getPreviousGames;
        },
        lookingForRandomOpponent() {
          return this.$store.getters.getLookingForRandomOpponent;
        },
        currentUser() {
          return this.$store.getters.getCurrentUser;
        },
    },
    data: function() {
      return {
      };  
    },
    components: {
        IonPage,
        IonContent,
        IonBadge,
        IonList,
        OngoingGame,
    },
    methods: {
        GoToInvites() {
          this.$router.push({path: 'invites'});
        },

        GoToFindOpponent() {
          this.$router.push({path: 'findopponent'});
        },

        GoToSettings() {
          this.$router.push('/settings');
        },
    },

    async mounted() {
      this.$store.dispatch('setCurrentUser');
      this.$store.dispatch('setOngoingGames');
      this.$store.dispatch('setPreviousGames');

      window.setInterval(() => {
        this.$store.dispatch('setOngoingGames');
        this.$store.dispatch('setPreviousGames');
      }, 30000)
        // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token) => {
        this.$store.dispatch('setToken', token.value);
        alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
    
    },

    created() {
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          console.log("Logged in");
        }
        else {
          console.log("Not logged in");
        }
      })
    },
    
    beforeUnmount() {
      clearInterval(this.window);
    },
}
</script>
<style scoped>
.header {
  display: flex;
  flex-direction: row;     
  justify-content: space-around; 
  align-items: center; 
  height: 14vh;
  background-color: #181A20;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
}

h1 {
  color: white;
  margin-left: 5vw;
}


ion-list {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #181A20;
}

ion-badge {
  background: #FC0007;
  width: 4vh; 
  height: 4vh;
  border-radius: 50%;
  display: flex; /* or inline-flex */
  align-items: center; 
  justify-content: center;
  margin: 0;
}

#yourturn {
  margin-top: 1.5vh;
}

#add {
  margin: 0;
  padding: 0;
  height: 4vh;
}

#settings {
  margin: 0;
  padding: 0;
  height: 4vh;
}


</style>