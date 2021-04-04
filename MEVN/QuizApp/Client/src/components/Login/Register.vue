<template>
    <ion-page>
        <ion-content>
            <ion-icon :icon="arrowBackOutline" @click="GoBack"></ion-icon>
            <h3 class="login-txt">Opret en konto for at spille</h3>
            <ion-label>Brugernavn</ion-label>
            <ion-input v-model="accountname" required=true placeholder="Dit brugernavn.."></ion-input>
            <ion-label>Email</ion-label>
            <ion-input v-model="email" required=true placeholder="Din email.."></ion-input>
            <ion-label>Password</ion-label>
            <ion-input v-model="password" type="password" required=true placeholder="Dit password.."></ion-input>
            <ion-label>Bekræft password</ion-label>
            <ion-input v-model="confirmpassword" type="password" required=true placeholder="Dit password.." v-on:keyup.enter="Register"></ion-input>
            <ion-button v-on:click="Register">Opret bruger</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton, IonIcon, IonLabel, IonInput} from '@ionic/vue';
import firebase from 'firebase';
import { arrowBackOutline } from 'ionicons/icons';
import UserService from '../../api/UserService';
export default {
    name: 'register',
    data: function() {
      return {
          email: '',
          password: '',
          accountname: '',
          confirmpassword: '',
          arrowBackOutline
      };  
    },
    methods: {
        async Register(){
            if (this.confirmpassword != this.password) {
                alert('Passwords must match')
                return;
            }
            if(this.accountname.length > 16) {
                alert('Your account name must be 16 characters or below')
                return;
            }
            if(this.accountname.length < 3) {
                alert('Your account name must be at least 3 characters')
                return;
            }

            await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(async()=>  {
                await UserService.createUser(this.accountname, this.email, "https://cdn.bulbagarden.net/upload/1/17/025Pikachu-Original.png");
                this.$store.dispatch('setCurrentUser');

                // Reset input fields
                this.email = '';
                this.password = '';
                this.accountname = '';
                this.confirmpassword = '';
                this.$router.push('/games');
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage);
            })

        },
        GoBack() {
            this.$router.push('/login');
        }

    },
    components: {
        IonPage,
        IonContent,
        IonButton,
        IonIcon,
        IonLabel,
        IonInput
    }
}
</script>
<style scoped>
.login-txt {
    color:white;
    text-align: center;
    font-size: 1.9rem;
    margin-top: 2.5vh;
    margin-bottom: 5vh;
    margin-right: 10vw;
    margin-left: 10vw;
}


ion-icon {
    margin-top: 5vh;
    margin-left: 5vw;
    font-size: 5vh;
    color: white;
}


ion-button {
    --background: linear-gradient(to right, #0BA360, #3CBA92);
    --border-radius: 4px;
    display: block;
    margin-left: 5vw;
    margin-right: 5vw;
    margin-top: 4vh;
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


</style>