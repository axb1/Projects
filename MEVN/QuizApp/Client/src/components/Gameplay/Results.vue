<template>
    <ion-page>
        <ion-content>
            <h1>Resultat</h1>
            <h2>Du svarede rigtigt på {{correctAnswers}}/3 spørgsmål</h2>

            <div v-if="gameIsOver == 'true'">
                <div v-if="scoreCurrentUser > scoreOpponent">
                    <h1>Du vandt!</h1>
                </div>
                <div v-else-if="scoreCurrentUser == scoreOpponent">
                    <h1>Det blev uafgjort</h1>
                </div>
                <div v-else>
                    <h1>Du tabte</h1>
                </div>
            </div>
            <div v-else>
                <h1>Stillingen er</h1>
                <h2>{{currentUser}}: {{scoreCurrentUser}}</h2>
                <h2>{{opponent}}: {{scoreOpponent}}</h2>
            </div>

            <ion-button expand="block" @click="GoToMainPage">Gå tilbage</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton,} from '@ionic/vue';
import { person } from 'ionicons/icons';

export default {
    name: 'results',
    props: {
        scoreCurrentUser: Number,
        scoreOpponent: Number,
        correctAnswers: Number,
        currentUser: String,
        opponent: String,
        gameIsOver: Boolean
    },
    data: function() {
      return {
          person
      };  
    },
    components: {
        IonPage,
        IonContent,
        IonButton
    },
    methods: {
        GoToMainPage() {
            this.$router.push("/games");
        }
    },

    }
</script>
<style scoped>

h1 {
    font-weight: bold;
    text-align: center;
    color: white;
    margin-top: 14vh;
    margin-bottom: 1vh;

}

h2 {
    text-align: center;
    color: white;
    margin-left: 10vw;
    margin-right: 10vw;
    margin-top: 1vh;
}

a {
    color: white;
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



</style>