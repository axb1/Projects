<template>
    <ion-page>
        <ion-content>
            <h1>Velkommen til QuizNord</h1>
            <form action="/action_page.php">
                <label for="Email" id="emailtxt">Email</label>
                <input type="text" id="email" name="email" placeholder="Din email.." v-model="email">

                <label for="password" id="passwordtxt">Password</label>
                <input type="password" id="password" name="password" placeholder="Dit password.." v-model="password">
            </form>
            <h3 class="forgot-txt"><router-link to="/forgotpassword">Glemt password?</router-link></h3>

            <ion-button v-on:click="login">Login</ion-button>
            <h2 id="noaccount">Har du ikke en konto?</h2>
            <h2 id="signup"><router-link to="/register">Opret konto</router-link></h2>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent} from '@ionic/vue';
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

input[type=text], select {
  width: 86vw;
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

input[type=password], select {
  width: 86vw;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #262A34;
  border-radius: 4px;
  box-sizing: border-box;
  margin-left: 7vw;
  margin-right: 7vw;
  margin-bottom: 1vh;
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