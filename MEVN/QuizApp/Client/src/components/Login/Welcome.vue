<template>
    <ion-page>
        <ion-content>
            <h1>Velkommen til QuizNord</h1>
            <div class="container">
                <ion-item @click="SignInAsGuest" id="person" lines="none">
                    <ion-label >Spil som gæst</ion-label>
                    <ion-icon :icon="personCircle" slot="start"></ion-icon>
                </ion-item>
                <ion-item @click="GoToLogin" id="email" lines="none">
                    <ion-label >Login med email</ion-label>
                    <ion-icon :icon="mail" slot="start"></ion-icon>
                </ion-item>
                <ion-item @click="SignInWithFacebook" id="facebook" lines="none">
                    <ion-label >Login med Facebook</ion-label>
                    <ion-icon :icon="logoFacebook" slot="start"></ion-icon>
                </ion-item>
                <ion-spinner name="crescent" v-if="shouldLoad == true"></ion-spinner>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonItem, IonLabel, IonIcon, IonSpinner} from '@ionic/vue';
import firebase from 'firebase';
import UserService from '../../api/UserService'
import {logoFacebook, mail, personCircle} from 'ionicons/icons';

export default {
    name: 'welcome',
    data: function() {
      return {
          logoFacebook,
          mail,
          personCircle,
          shouldLoad: false
      };  
    },
    methods: {
        SignInWithFacebook() {
            var provider = new firebase.auth.FacebookAuthProvider();

            // Allow access to Facebook friends
            provider.addScope('user_friends');
                    firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then(async (result) => {
                        /** @type {firebase.auth.OAuthCredential} */
                        var credential = result.credential;
                        // The signed-in user info.
                        var user = result.user;

                        // Create user on server if doesn't exist
                        await UserService.createUser(user.displayName + user.uid, user.email, "https://cdn.bulbagarden.net/upload/1/17/025Pikachu-Original.png");
                        await this.$store.dispatch('setFBAccessToken', credential.accessToken);
                        await this.$store.dispatch('setCurrentUser');
                

                    })
                    .catch((error) => {
                        console.log(error);

                        // ...
                    });
        },
        async SignInAsGuest() {
            this.shouldLoad = true;
            // This isn't okay (but I'm still gonna do it)
            var guests = await UserService.getGuests();
            var amountOfGuests = guests.length;
            await firebase.auth().createUserWithEmailAndPassword("guest" + String(amountOfGuests+1) + "@test.com", Math.random().toString(36).substr(2, 7))
            .then(async()=>  {
                await UserService.createUser("Guest" + String(amountOfGuests+1), "guest" + String(amountOfGuests+1) + "@test.com", "https://cdn.bulbagarden.net/upload/1/17/025Pikachu-Original.png");
                await this.$store.dispatch('setCurrentUser');
                this.$router.push('/games');
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage);
            })
   
        },
        GoToLogin() {
            this.$router.push('/login');
        },
    },
    ionViewDidLeave() {
        this.shouldLoad = false;
    },
    components: {
        IonPage,
        IonContent,
        IonItem,
        IonLabel,
        IonIcon,
        IonSpinner
    }
}
</script>
<style scoped>
h1 {
    font-weight: bold;
    text-align: center;
    color: white;
    margin-top: 14vh;
    margin-bottom: 5vh;
}

.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

#facebook {
    --background: #1778F2;
    --padding-top: 1vh;
    --padding-bottom: 1vh;
    --border-radius: 4px;
    margin-top: 1.5vh;
    margin-left: 5vw;
    margin-right: 5vw;
    width: 80vw;
}

#email {
    --background: #262A34;
    --padding-top: 1vh;
    --padding-bottom: 1vh;
    --border-radius: 4px;
    margin-top: 1.5vh;
    margin-left: 5vw;
    margin-right: 5vw;
    width: 80vw;
}

#person {
    --background: #262A34;
    --padding-top: 1vh;
    --padding-bottom: 1vh;
    --border-radius: 4px;
    margin-top: 1.5vh;
    margin-left: 5vw;
    margin-right: 5vw;
    width: 80vw;
}

ion-icon {
    color: white;
}

ion-label {
    --color: white;
}

ion-spinner {
  --color: white;
  background: #181A20;
  width: 100%;
  transform: scale(2);
  margin-top: 5vh;

}

ion-item {
    --color: white;
}

</style>