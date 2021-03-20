<template>
    <ion-page>
        <ion-content>
            <ion-icon :icon="arrowBackOutline" size="large" @click="GoBack"></ion-icon>
            <h3 class="login-txt">Create an account to continue</h3>
            <form action="/action_page.php">
                <label for="accountname" >Account Name</label>
                <input type="text" id="accountname" name="accountname" placeholder="Your account name.." v-model="accountname">

                <label for="Email">Email</label>
                <input type="text" id="email" name="email" placeholder="Your email.." v-model="email">

                <label for="password" >Password</label>
                <input type="password" id="password" name="password" placeholder="Your password.." v-model="password">

                <label for="confirmpassword">Confirm Password</label>
                <input type="password" id="confirmpassword" name="confirmpassword" placeholder="Your password.." v-model="confirmpassword">
            </form>
            <ion-button v-on:click="Register">Register</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton, IonIcon} from '@ionic/vue';
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
            }
            try {
                await UserService.createUser(this.accountname, this.email, "https://cdn.bulbagarden.net/upload/1/17/025Pikachu-Original.png");
            } catch (error) {
                alert("This accountname is already taken");
            }

            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(()=> {
                this.$router.push('/games');

                // Reset input fields
                this.email = '';
                this.password = '';
                this.accountname = '';
                this.confirmpassword = '';
            })
            err => {
                alert(err.message);
            }

        },
        GoBack() {
            this.$router.push('/login');
        }

    },
    components: {
        IonPage,
        IonContent,
        IonButton,
        IonIcon
    }
}
</script>
<style scoped>
.login-txt {
    color:white;
    text-align: center;
    font-size: 1.9rem;
    margin-top: 5vh;
    margin-bottom: 5vh;
}

.forgot-txt {
    color: #E91E63;
    text-align: right;
    font-size: 1rem;
    margin-right: 1rem;
    font-weight: bold;
}

ion-icon {
    margin-top: 4vh;
    margin-left: 5vw;
    color: white;
}

ion-title {
    font-weight: bolder;
    font-size: 1.2rem;
    color: white;
}

ion-label {
    font-weight: bold;
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
  height: 6vh;
  color: white;
}

input[type=password], select {
  width: 86vw;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #262A34;
  border-radius: 4px;
  box-sizing: border-box;
  margin-right: 7vw;
  margin-left: 7vw;
  margin-bottom: 2vh;
  margin-top: 2vh;
  background-color: #262A34;
  height: 6vh;
  color: white;
}

label {
    color:white;
    margin-left: 8vw;
}


</style>