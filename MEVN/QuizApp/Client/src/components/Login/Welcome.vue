<template>
    <ion-page>
        <ion-content>
            <h1>Velkommen til QuizNord</h1>
            <div class="container">
                <ion-item @click="SignInWithFacebook" id="facebook" lines="none">
                    <ion-label color="light">Login med Facebook</ion-label>
                    <ion-icon :icon="logoFacebook" slot="start"></ion-icon>
                </ion-item>
                <ion-item @click="GoToLogin" id="email" lines="none">
                    <ion-label color="light">Login med email</ion-label>
                    <ion-icon :icon="mail" slot="start"></ion-icon>
                </ion-item>
                <ion-item id="person" lines="none">
                    <ion-label color="light">Spil som gæst</ion-label>
                    <ion-icon :icon="personCircle" slot="start"></ion-icon>
                </ion-item>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonItem, IonLabel, IonIcon} from '@ionic/vue';
import firebase from 'firebase';
import {logoFacebook, mail, personCircle} from 'ionicons/icons';

export default {
    name: 'welcome',
    data: function() {
      return {
          logoFacebook,
          mail,
          personCircle
      };  
    },
    methods: {
        SignInWithFacebook() {
            var provider = new firebase.auth.FacebookAuthProvider();
                    firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then((result) => {
                        /** @type {firebase.auth.OAuthCredential} */
                        var credential = result.credential;

                        // The signed-in user info.
                        var user = result.user;
                        console.log(user);

                        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                        var accessToken = credential.accessToken;
                        console.log(accessToken);
                        // ...
                    })
                    .catch((error) => {
                        console.log(error);

                        // ...
                    });
        },
        GoToLogin() {
            this.$router.push('/login');
        }
    },
    components: {
        IonPage,
        IonContent,
        IonItem,
        IonLabel,
        IonIcon
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
</style>