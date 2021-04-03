<template>
    <ion-page>
        <ion-content>
            <div id="header">
                <div id="subheader">
                    <ion-icon v-on:click="LeaveGame()" :icon="arrowBackOutline" size="large" id="icon"></ion-icon>
                    <h1 id="quiz">Quiz</h1>
                </div>
                <div id="currentquestionlist">
                    <li>
                        <ion-badge id="badge1">1</ion-badge>
                        <ion-badge id="badge2">2</ion-badge>
                        <ion-badge id="badge3">3</ion-badge>
                        <ion-badge id="badge4">4</ion-badge>
                        <ion-badge id="badge5">5</ion-badge>
                    </li>
                </div>
            </div>
            <div v-if="currentQuestion.length != 0">
                <p id="category">{{currentQuestion[0].category}}</p>
                <p class="description">{{currentQuestion[0].description}}</p>                 
                <ion-button class="answer1" v-on:click="CheckAnswer(currentQuestion[0].option1)">{{currentQuestion[0].option1}}</ion-button>
                <ion-button class="answer2" v-on:click="CheckAnswer(currentQuestion[0].option2)">{{currentQuestion[0].option2}}</ion-button>
                <ion-button class="answer3" v-on:click="CheckAnswer(currentQuestion[0].option3)">{{currentQuestion[0].option3}}</ion-button>
                <ion-button class="answer4" v-on:click="CheckAnswer(currentQuestion[0].option4)">{{currentQuestion[0].option4}}</ion-button>
                <ion-progress-bar id="progress" value="1"></ion-progress-bar>
                <ion-button class="next-btn" v-on:click="GoToNextQuestion()">Næste spørgsmål</ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>




<script>
import { IonPage, IonContent, IonButton, IonBadge, IonIcon, IonProgressBar} from '@ionic/vue';
import QuestionService from '../../api/QuestionService';
import NotificationService from '../../api/NotificationService';
import {arrowBackOutline} from 'ionicons/icons';


export default {
    name: 'quiz',
    computed: {
        currentGame() {
            return this.$store.getters.getCurrentGame;
        },
        currentUser() {
            return this.$store.getters.getCurrentUser;
        },
        token() {
            return this.$store.getters.getToken;
        }
    },
    props: ['items'],
    data: function() {
      return {
        questions: [],
        currentQuestion: [],
        currentQuestionIndex: 0,
        correctAnswers: 0,
        error: '',
        arrowBackOutline,
        currentPercentage: '1',
        decrement: '0.0033',
        timer: '',

      };  
    },
    components: {
        IonPage,
        IonContent,
        IonButton,
        IonBadge,
        IonIcon,
        IonProgressBar
    },
    methods: {
        CheckAnswer(answer){
            clearInterval(this.timer);
            let rightAnswer = this.currentQuestion[0].answer;
            // Set green color on button that contains the right answer
            if (this.currentQuestion[0].option1 == rightAnswer) {
                document.getElementsByClassName('answer1')[0].setAttribute("id", "style1");
                this.DisableAnswers();
                this.GreyOutOtherAnswers('answer2', 'answer3', 'answer4');
            } else if (this.currentQuestion[0].option2 == rightAnswer) {
                document.getElementsByClassName('answer2')[0].setAttribute("id", "style1");
                this.DisableAnswers();
                this.GreyOutOtherAnswers('answer1', 'answer3', 'answer4');
            } else if (this.currentQuestion[0].option3 == rightAnswer) {
                document.getElementsByClassName('answer3')[0].setAttribute("id", "style1");
                this.DisableAnswers();
                this.GreyOutOtherAnswers('answer1', 'answer2', 'answer4');
            } else if (this.currentQuestion[0].option4 == rightAnswer) {
                document.getElementsByClassName('answer4')[0].setAttribute("id", "style1");
                this.DisableAnswers();
                this.GreyOutOtherAnswers('answer1', 'answer2', 'answer3');
            }

            if(answer == rightAnswer) {
                this.correctAnswers = this.correctAnswers + 1;
            }
        },
        LeaveGame() {
            this.$router.push('/games');
        },
        TimedOut() {
            let rightAnswer = this.currentQuestion[0].answer;
            // Set green color on button that contains the right answer
            if (this.currentQuestion[0].option1 == rightAnswer) {
                document.getElementsByClassName('answer1')[0].setAttribute("id", "style1");
                this.DisableAnswers();
                this.GreyOutOtherAnswers('answer2', 'answer3', 'answer4');
            } else if (this.currentQuestion[0].option2 == rightAnswer) {
                document.getElementsByClassName('answer2')[0].setAttribute("id", "style1");
                this.DisableAnswers();
                this.GreyOutOtherAnswers('answer1', 'answer3', 'answer4');
            } else if (this.currentQuestion[0].option3 == rightAnswer) {
                document.getElementsByClassName('answer3')[0].setAttribute("id", "style1");
                this.DisableAnswers();
                this.GreyOutOtherAnswers('answer1', 'answer2', 'answer4');
            } else if (this.currentQuestion[0].option4 == rightAnswer) {
                document.getElementsByClassName('answer4')[0].setAttribute("id", "style1");
                this.DisableAnswers();
                this.GreyOutOtherAnswers('answer1', 'answer2', 'answer3');
            }
        },

        DisableAnswers() {
            document.getElementsByClassName('answer1')[0].disabled = true;
            document.getElementsByClassName('answer2')[0].disabled = true;
            document.getElementsByClassName('answer3')[0].disabled = true;
            document.getElementsByClassName('answer4')[0].disabled = true;
        },

        EnableAnswers() {
            document.getElementsByClassName('answer1')[0].disabled = false;
            document.getElementsByClassName('answer2')[0].disabled = false;
            document.getElementsByClassName('answer3')[0].disabled = false;
            document.getElementsByClassName('answer4')[0].disabled = false;
        },

        GreyOutOtherAnswers(button1, button2, button3) {
            document.getElementsByClassName(button1)[0].style.opacity = "0.7";
            document.getElementsByClassName(button2)[0].style.opacity = "0.7";
            document.getElementsByClassName(button3)[0].style.opacity = "0.7";
        },

        RestoreOpacityOfAnswers() {
            document.getElementsByClassName('answer1')[0].style.opacity = "1";
            document.getElementsByClassName('answer2')[0].style.opacity = "1";
            document.getElementsByClassName('answer3')[0].style.opacity = "1";
            document.getElementsByClassName('answer4')[0].style.opacity = "1";
        },

        async SendNotification(token) {
            var username = this.currentUser.username;
            var title = 'QuizNord';
            var body = username + " svarede rigtigt på " + this.correctAnswers + " spørgsmål";
            await NotificationService.sendNotification(title, body, token);
            
        },

        GoToNextQuestion() {
            // Remove style (id) from right answer
            var element = document.getElementById('style1');
            element.removeAttribute('id');

            // Enable buttons
            this.EnableAnswers();

            // Set opacity back
            this.RestoreOpacityOfAnswers();


            var updatedGame = this.currentGame;

            // Check if it was last question. If it was last question go to results page, if no then load next question
            if (this.currentQuestionIndex < 2) {
                // Reset progress bar
                this.currentPercentage = '1';
                document.getElementById('progress').setAttribute('value', 1);
                clearInterval(this.timer);
                
                // Start progress bar
                this.ProgressBarCountdown();

                
                // Remove badge style from last question
                var badge = "badge"+ String(this.currentQuestionIndex+1);
                document.getElementById(badge).style.background = "#181A20";

                //
                this.currentQuestionIndex = this.currentQuestionIndex + 1;
                this.currentQuestion.length = 0;
                this.currentQuestion.push(this.questions[this.currentQuestionIndex][0]);

                var badgeNext = "badge" + String(this.currentQuestionIndex+1);
                document.getElementById(badgeNext).style.background = "#56BE65";
            }

            else {
                // Reset progress bar
                this.currentPercentage = '1';
                document.getElementById('progress').setAttribute('value', 1);
                clearInterval(this.timer);


                if (this.currentUser.username == updatedGame.player1.username) {
                    updatedGame.player1.correctAnswers.push(this.correctAnswers);
                    updatedGame.player1.myTurn = false;
                    updatedGame.player1.dateOfLastTurn = new Date();
                    updatedGame.player1.roundsPlayed = updatedGame.player1.roundsPlayed +1;
                    updatedGame.player2.myTurn = true;
                }
                else {
                    updatedGame.player2.correctAnswers.push(this.correctAnswers);
                    updatedGame.player2.myTurn = false;
                    updatedGame.player2.dateOfLastTurn = new Date();
                    updatedGame.player2.roundsPlayed = updatedGame.player2.roundsPlayed +1;
                    updatedGame.player1.myTurn = true;
                }
                // Set current score
                var scoreCurrentUser = 0;
                var scoreOpponent = 0;
                var opponent = '';
                var opponentToken = '';
                var gameIsOver = 'false';

                if(updatedGame.player1.roundsPlayed == 2 && updatedGame.player2.roundsPlayed == 2) {
                    console.log(updatedGame.player1.roundsPlayed);
                    console.log(updatedGame.player2.roundsPlayed);
                    gameIsOver = 'true';
                }

                if (updatedGame.player1.username != this.currentUser.username) {
                    opponent = updatedGame.player1.username;
                    opponentToken = updatedGame.player1.token;
                    updatedGame.player1.correctAnswers.forEach(element => {
                        scoreOpponent = scoreOpponent + element;
                    });
                    updatedGame.player2.correctAnswers.forEach(element => {
                        scoreCurrentUser = scoreCurrentUser + element;
                    });
                }
                else {
                    opponent = updatedGame.player2.username;
                    opponentToken = updatedGame.player2.token;
                    updatedGame.player2.correctAnswers.forEach(element => {
                        scoreOpponent = scoreOpponent + element;
                    });
                    updatedGame.player1.correctAnswers.forEach(element => {
                        scoreCurrentUser = scoreCurrentUser + element;
                    });
                }
                
                // Send notification
                this.SendNotification(opponentToken);


                this.$store.dispatch('updateOngoingGamesAfterRound', updatedGame);
                this.$router.push({
                    name: 'results',
                    params: {
                        correctAnswers: this.correctAnswers,
                        scoreCurrentUser: scoreCurrentUser,
                        scoreOpponent: scoreOpponent,
                        currentUser: this.currentUser.username,
                        opponent: opponent,
                        gameIsOver: gameIsOver
                    }
                })
            }
        },
        ProgressBarCountdown() {
            this.timer = setInterval(() => {
                if (this.currentPercentage != '-0.0031999999999971565') {
                    this.currentPercentage = this.currentPercentage -this.decrement;
                    document.getElementById('progress').setAttribute('value', this.currentPercentage);
                }
                else {
                    clearInterval(this.timer);
                    this.TimedOut();
                }
            }, 100)
        }

    },

  ionViewDidEnter() {
    this.currentQuestionIndex = 0;
    this.correctAnswers = 0;
    this.ProgressBarCountdown();
  },

  async ionViewWillEnter() {
        // Read the categories from the "items" prop that is passed from SelectCategories
        // Get questions from database with corresponding categories
        // Using this type of for-syntax is required as we can't use async await within a foreach
        for (const item of this.items) {
            var questions = await QuestionService.getQuestionsByCategory(item);
            this.questions.push(questions);
        }
        this.currentQuestion.push(this.questions[0][0]);

        // Set styling on first badge
        document.getElementById("badge1").style.background = "#56BE65";
  },

  ionViewDidLeave() {
      document.getElementById("badge3").style.background = "#181A20";
  },

  updated(){
  }
}
</script>
<style scoped>


ion-button {
    --background: #262A34;
    border-radius: 4px;
    box-shadow: 4px;
}

ion-icon {
    color: white;
}

#quiz {
    display: inline-block;
}

#icon {
    display: inline-block;
    margin-right: 29%;
    margin-left: 6%;
}

li { 
    list-style-type: none;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

ion-badge {
    background: #181A20;
    width: 3vh; 
    height: 3vh;
    border-radius: 50%;
    display: flex; /* or inline-flex */
    align-items: center; 
    justify-content: center;

}


.next-btn {
    --background: linear-gradient(to right, #0BA360, #3CBA92);
    --border-radius: 4px;
    display: block;
    margin-left: 12vw;
    margin-right: 12vw;
    margin-top: 2vh;
    height: 6.8vh;
}

.iconbutton {
    --background: #181A20;
}

.answer1, .answer2, .answer3, .answer4 {
    display: flex;
    background: #262A34;
    left: 6.4%;
    right: 6.4%;
    margin-bottom: 2vh;
    margin-left: 7vw;
    margin-right: 7vw;
    height: 8vh;
}

ion-button:disabled,
ion-button[disabled]{
    opacity: 1;
}

.description {
    color:white;
    font-size: 1.2rem;
    margin-left: 10vw;
    margin-right: 6vw;
    margin-top: 0;
    font-weight: bold;
}



#category {
    font-weight: bold;
    text-transform: uppercase;
    text-align: left;
    color: #56BE65;
    margin-left: 10vw;
    font-style: normal;
    margin-top: 2vh;
    margin-bottom: 1vh;
}


ion-progress-bar {
    --background: #262152;
    --progress-background: #0BA360;
    width: 90%;
    border-radius: 14px;
    height: 1vh;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5vh;
}

#header {
    background: #181A20;
    border-bottom: 0.55px solid #14161B;
    height: 16vh;
}

#subheader {
    margin-top: 4%;
    display: flex;
    align-items: center;
}


#currentquestionlist {
    margin-bottom: 1vh;
    margin-top: 4%;
}

h1 {
    color: white;
}

#style1{
    --background: green;
    border-radius: 4px;
    box-shadow: 4px;
}

</style>




