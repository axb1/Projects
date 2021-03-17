<template>
    <ion-page>
        <ion-content>
            <ion-icon :icon="arrowBackOutline" size="large" @click="GoBack"></ion-icon>
            <h1>Forgot password?</h1>
            <h3>Confirm your email and we'll send the instructions.</h3>
            <form action="/action_page.php">
                <label for="Email">Email</label>
                <input type="text" id="email" name="email" placeholder="Your email.." v-model="email">
            </form>
            <ion-button v-on:click="SendPasswordResetEmail(email)">Reset Password</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton, IonIcon} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import firebase from 'firebase';
export default {
    name: 'forgotPassword',
    data: function() {
      return {
          arrowBackOutline
      };  
    },
    components: {
        IonPage,
        IonContent,
        IonButton,
        IonIcon,
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
    margin-bottom: 5.5vh;
}


ion-label {
    font-weight: bold;
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


input[type=text], select {
  width: 86%;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #262A34;
  border-radius: 4px;
  box-sizing: border-box;
  margin-left: 7vw;
  margin-right: 7vw;
  margin-bottom: 2vh;
  margin-top: 2vh;
  background-color: #262A34;
  color: white;
}

label {
    color:white;
    margin-left: 8vw;
}

ion-icon {
    margin-top: 4vh;
    margin-left: 4vw;
    color: white;
}






</style>