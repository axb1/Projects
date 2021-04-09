<template>
    <ion-page>
        <ion-content>
            <ion-icon :icon="arrowBackOutline" @click="GoToWelcome"></ion-icon>
            <h1>Login med QuizNord</h1>
            <p id="margin"></p>
            <ion-label id="email">Email</ion-label>
            <ion-input v-model="email" required=true placeholder="Din email.."></ion-input>
            <ion-label>Password</ion-label>
            <ion-input v-model="password" type="password" required=true placeholder="Dit password.." v-on:keyup.enter="login"></ion-input>
            <h3 class="forgot-txt"><router-link to="/forgotpassword">Glemt password?</router-link></h3>

            <ion-button v-on:click="login">Login</ion-button>
            <div id="footer">
                <p id="noaccount">Har du ikke en konto?</p>
                <p id="signup"><router-link to="/register">Opret konto</router-link></p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonIcon, IonContent, IonInput, IonLabel} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import firebase from 'firebase';
export default {
    name: 'login',
    data: function() {
      return {
          email: '',
          password: '',
          arrowBackOutline
      };  
    },
    methods: {
        login: function() {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(
                    user => {
                        console.log(user);
                        // Reset input fields
                        this.email = '';
                        this.password = '';
                        this.$router.push('/games');
                    })
                .catch((error) => {
                    var errorMessage = error.message;
                    alert(errorMessage);
                })
            })  
        },
        GoToWelcome() {
            this.$router.push('/welcome')
        }

    },
    components: {
        IonPage,
        IonContent,
        IonIcon,
        IonInput,
        IonLabel,
    }
}
</script>
<style scoped>
.forgot-txt {
    color: #3C8AFF;
    text-align: right;
    font-size: 1rem;
    margin-right: 1vw;
    margin-left: 58vw;
    display: inline-block;
    margin-top: 1vh;
}

.forgot-txt a {
    color: #3C8AFF;
    text-decoration: none;
}


ion-button {
    --background: linear-gradient(to right, #0BA360, #3CBA92);
    --border-radius: 4px;
    display: block;
    margin-left: 5vw;
    margin-right: 5vw;
    margin-top: 4.5vh;
    height: 7.4vh;
}


ion-label {
    color: white;
    margin-left: 7vw;
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
    margin-top: 2vh;
    background-color: #262A34;
    color: white;
}

ion-icon {
    margin-top: 5vh;
    margin-left: 5vw;
    font-size: 5vh;
    color: white;
}

h1 {
    font-weight: bold;
    text-align: center;
    color: white;
    margin-top: 2.5vh;
    margin-bottom: 5vh;
}

#footer {
   position:fixed;
   bottom: 0;
   text-align: center;
}

#noaccount {
    color: white;
    margin-right: 3vw;
    display: inline-block;
    margin-left: 17vw;
}

#signup {
    display: inline-block;
}

#signup a {
    color: #3C8AFF;
    text-decoration: none;
}

#margin {
    margin-top: 10vh;
}







</style>