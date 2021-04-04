<template>
    <ion-page>
        <ion-content>
            <ion-icon :icon="arrowBackOutline" @click="GoBack"></ion-icon>
            <h1>Forgot password?</h1>
            <h3>Confirm your email and we'll send the instructions.</h3>
            <ion-input v-model="email" required=true placeholder="Din email.." v-on:keyup.enter="SendPasswordResetEmail(email)"></ion-input>
            <ion-button v-on:click="SendPasswordResetEmail(email)">Reset Password</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton, IonIcon, IonInput} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import firebase from 'firebase';
export default {
    name: 'forgotPassword',
    data: function() {
      return {
          arrowBackOutline,
          email: '',
      };  
    },
    components: {
        IonPage,
        IonContent,
        IonButton,
        IonIcon,
        IonInput
    },
    methods: {
        SendPasswordResetEmail(emailAddress) {
            var auth = firebase.auth();

            auth.sendPasswordResetEmail(emailAddress).then(function() {
            // Email sent.
            }).catch(function(error) {
            // An error happened.
            console.log(error);
            });
        },

        GoBack() {
            this.$router.push('/login');
        }
    }
}
</script>
<style scoped>
.login-txt {
    text-align: center;
    font-size: 1.4rem;
}

h1 {
    margin-top: 16vh;
    color: white;
    text-align: center;
    font-weight: bold;
}

h3 {
    font-size: 0.9rem;
    text-align: center;
    color: #A3A3A6;
    margin-bottom: 5vh;
}



ion-input {
    --padding-top: 1.8vh;
    --padding-bottom: 1.8vh;
    --padding-start: 1.5vh;
    --padding-end: 1.5vh;
    width: 86vw;
    border: 1px solid #262A34;
    border-radius: 4px;
    margin-left: 7vw;
    margin-right: 7vw;
    margin-bottom: 2vh;
    margin-top: 1vh;
    background-color: #262A34;
    color: white;
}

ion-button {
    --background: linear-gradient(to right, #0BA360, #3CBA92);
    --border-radius: 4px;
    display: block;
    margin-left: 7vw;
    margin-right: 7vw;
    margin-top: 4vh;
    height: 7.5vh;
}


label {
    color:white;
    margin-left: 8vw;
}

ion-icon {
    margin-top: 5vh;
    margin-left: 5vw;
    font-size: 5vh;
    color: white;
}






</style>