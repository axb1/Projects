<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <img src="../../assets/settings.svg" alt="settings" v-on:click="GoToSettings()" id="settings" slot="start">
        <ion-title>QuizNord</ion-title>
        <img v-on:click="GoToFindOpponent()" src="../../assets/plus.png" alt="add" id="add" slot="end">
      </ion-toolbar>
    </ion-header>
    <ion-content>
            <div v-if="ongoingGames != undefined">
              <div v-if="ongoingGames.length != 0">
                <div id="yourturn">
                <div class="square"></div>
                <h1 id="turn">Din tur</h1>
                </div>
              <ion-list v-for="ongoingGame in ongoingGames" :key="ongoingGame._id">
                <OngoingGame v-if="(ongoingGame.player2.myTurn == true && ongoingGame.player2.username == currentUser.username)" v-bind:ongoingGame="ongoingGame"></OngoingGame>
                <OngoingGame v-if="(ongoingGame.player1.myTurn == true && ongoingGame.player1.username == currentUser.username)" v-bind:ongoingGame="ongoingGame"></OngoingGame>
              </ion-list>
              </div>

            </div>
          <div v-if="ongoingGames != undefined">
            <div v-if="ongoingGames.length != 0">
              <div id="theirturn">
              <div class="square"></div>
              <h1 id="turn">Deres tur</h1>
              </div>
              <ion-list v-for="ongoingGame in ongoingGames" :key="ongoingGame._id">
              <OngoingGame v-if="(ongoingGame.player2.myTurn == false && ongoingGame.player2.username == currentUser.username)" v-bind:ongoingGame="ongoingGame"></OngoingGame>
              <OngoingGame v-if="(ongoingGame.player1.myTurn == false && ongoingGame.player1.username == currentUser.username)" v-bind:ongoingGame="ongoingGame"></OngoingGame>
              </ion-list>
            </div>
          </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonList} from '@ionic/vue';
import OngoingGame from './OngoingGame';
import firebase from 'firebase';
import { Plugins, } from '@capacitor/core';
import UserService from '@/api/UserService';
const { PushNotifications } = Plugins;

export default {
    name: 'games',
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
        didRegisterForNotifications() {
          return this.$store.getters.getDidRegisterForNotifications;
        }
    },
    data: function() {
      return {
        timer: '',
      };  
    },
    components: {
        IonPage,
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
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

        async RegisterForPushNotifications() {
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
            async (token) => {
              await UserService.updateToken(this.currentUser.username, token.value);
              this.$store.dispatch('setDidRegisterForNotifications', true);
              
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
        }
    },

    async ionViewWillEnter() {
      this.$store.dispatch('setCurrentUser');
      this.$store.dispatch('setOngoingGames');
      this.$store.dispatch('setPreviousGames');

      this.timer = setInterval(() => {
        this.$store.dispatch('setOngoingGames');
        this.$store.dispatch('setPreviousGames');
      }, 30000)
    
    },
    ionViewDidLeave() {
      clearInterval(this.timer);
    },

    async ionViewDidEnter() {

      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          console.log("Logged in");
        }
        else {
          console.log("Not logged in");
        }
      })

      // This is SUPER sketchy
      var user = await UserService.getUserByUsername(this.currentUser.username);
      var counter = 0;
      while(user.length == 0 && this.didRegisterForNotifications == false) {
        user = await UserService.getUserByUsername(this.currentUser.username);
        counter = counter + 1;
        console.log(counter);
      }
      if (user[0].token == "") {
         this.RegisterForPushNotifications();
      }
    },
    
    beforeUnmount() {
      clearInterval(this.window);
    },
}
</script>
<style scoped>

.square {
    background: #43B15B;
    width: 5vw;
    height: 16vw;
    border-radius: 0 1vh 1vh 0;
}


#turn {
  color: white;
  margin-left: 5vw;
  font-size: 1.3rem;
}

#title {
  color: white;
  font-size: 1.6rem;
}


ion-list {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #181A20;
  padding: 0;
}

ion-title {
  --background: #141A33;
  color: white;
  text-align: center;
  font-size: 1.5rem;
}

#yourturn {
  margin-top: 2vh;
  margin-bottom: 2vh;
  display: flex;
  align-items: center;
}

#theirturn {
  margin-top: 2vh;
  margin-bottom: 2vh;
  display: flex;
  align-items: center;
}

#add {
  margin-right: 10vw;
  padding: 0;
  height: 4.2vh;
}

#settings {
  margin-left: 10vw;
  padding: 0;
  height: 4.2vh;
}

ion-header {
    background: #181A20;
    position: relative;
    height: 16vh;
}

ion-toolbar {
  --background: #181A20;
  margin: 0;
  position: absolute;
  top: 55%;
  -ms-transform: translateY(-45%);
  transform: translateY(-45%);
}


</style>