<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <img src="../../assets/settings.svg" alt="settings" v-on:click="GoToSettings()" id="settings" slot="start">
        <ion-title id="title">Quiz Nord</ion-title>
        <img v-on:click="GoToFindOpponent()" src="../../assets/plus.png" alt="add" id="add" slot="end">
      </ion-toolbar>
    </ion-header>
    <ion-content>
          <ion-spinner name="dots" v-if="lookingForRandomOpponent == true"></ion-spinner>
          <div v-if="currentUser != undefined">
            <div v-if="currentUser.invites != undefined && currentUser.invites.length != 0">
                <div id="invites">
                  <div class="squareinvites"></div>
                  <h1 id="invitestxt">Invitationer</h1>
                </div>
              <ion-list v-for="invite in currentUser.invites" :key="invite.inviteID">
                <InviteFriendAlert v-bind:invite="invite"></InviteFriendAlert>
              </ion-list>
            </div>       
          </div>
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
import {IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonSpinner} from '@ionic/vue';
import OngoingGame from './OngoingGame';
import firebase from 'firebase';
import { Plugins, } from '@capacitor/core';
import UserService from '@/api/UserService';
import InviteFriendAlert from './InviteFriendAlert.vue';
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
        IonSpinner,
        OngoingGame,
        InviteFriendAlert
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
              this.$store.dispatch('setOngoingGames');
              alert('Push received: ' + JSON.stringify(notification));
            }
          );

          // Method called when tapping on a notification
          PushNotifications.addListener('pushNotificationActionPerformed',
            (notification) => {
              this.$store.dispatch('setOngoingGames');
              alert('Push action performed: ' + JSON.stringify(notification));
            }
          );
        }
    },

    async ionViewWillEnter() {
      await this.$store.dispatch('setCurrentUser');
      await this.$store.dispatch('setOngoingGames');
      await this.$store.dispatch('setPreviousGames');
      await this.$store.dispatch('setCurrentTime');
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

.square{
    background: #43B15B;
    width: 5vw;
    height: 16vw;
    border-radius: 0 1vh 1vh 0;
}


.squareinvites {
  background: #1DA1F2;
  width: 5vw;
  height: 16vw;
  border-radius: 0 1vh 1vh 0;
}


#turn {
  color: white;
  margin-left: 5vw;
  font-size: 1.3rem;
}

#invites {
  margin-top: 2vh;
  margin-bottom: 2vh;
  display: flex;
  align-items: center;
}

#invites2 {
  margin-top: 2vh;
  margin-bottom: 2vh;
  display: flex;
  align-items: center;
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

#title {
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

#invitestxt {
  color: white;
  margin-left: 5vw;
  font-size: 1.3rem;
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

ion-spinner {
  --color: white;
  background: #181A20;
  width: 100%;
  transform: scale(2);

}





</style>