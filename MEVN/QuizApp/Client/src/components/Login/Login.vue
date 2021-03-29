<template>
    <ion-page>
        <ion-content>
            <h1>Velkommen til QuizNord</h1>
            <ion-label>Email</ion-label>
            <ion-input v-model="email" required=true placeholder="Din email.."></ion-input>
            <ion-label>Password</ion-label>
            <ion-input v-model="password" type="password" required=true placeholder="Dit password.." v-on:keyup.enter="login"></ion-input>
            <h3 class="forgot-txt"><router-link to="/forgotpassword">Glemt password?</router-link></h3>

            <ion-button v-on:click="login">Login</ion-button>
            <h2 id="noaccount">Har du ikke en konto?</h2>
            <h2 id="signup"><router-link to="/register">Opret konto</router-link></h2>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonInput, IonLabel} from '@ionic/vue';
import firebase from 'firebase';
export default {
    name: 'login',
    data: function() {
      return {
          email: '',
          password: ''
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
                    }
                )
            })
        },

    },
    components: {
        IonPage,
        IonContent,
        IonInput,
        IonLabel
    }
}
</script>
<style scoped>
.login-txt {
    text-align: center;
    font-size: 1.3rem;
    color: white;
    margin-bottom: 3vh;
}
#emailtxt {
    margin-left: 8vw;
    color: white;
}

#passwordtxt {
    margin-left: 8vw;
    color: white;
}

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


#noaccount {
    color: white;
    display: inline-block;
    margin-top: 26vh;
    font-size: 1rem;
    margin-left: 20vw;
}

#signup {
    display: inline-block;
}

#signup a {
    color: #3C8AFF;
    text-decoration: none;
    font-size: 1rem;
    margin-left: 4vw;
}

.rememeberme {
    margin-left: 4vw;
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


h1 {
    font-weight: bold;
    text-align: center;
    color: white;
    margin-top: 14vh;
    margin-bottom: 5vh;
}








</style>