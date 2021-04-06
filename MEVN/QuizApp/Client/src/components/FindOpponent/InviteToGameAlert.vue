<template>
  <ion-button @click="presentAlert">
    <div class="flex">
      <img :src="player.img" alt="pfp">
      <p>{{player.username}}</p>
      <p></p>
    </div>
  </ion-button>
</template>

<script>
import { IonButton, alertController} from '@ionic/vue';

import { defineComponent } from 'vue';
import NotificationService from '../../api/NotificationService';
export default defineComponent({
  components: { IonButton,},
  props: {player: Object},
  computed: {
        currentUser() {
            return this.$store.getters.getCurrentUser;
        }
    },
  methods: {
    async presentAlert() {
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Send game invite',
          buttons: [{
            text: 'Cancel',
            handler: blah => {
              console.log(blah);
              this.$router.push('/games')
            }
          }, {
              text: 'Accept',
              handler: async meh => {
                console.log(meh);
                if(this.player.username == this.currentUser.username) {
                  this.$router.push('/games');
                }
                else {
                  var username = this.currentUser.username;
                  var title = 'QuizNord';
                  var body = username + " har inviteret dig til at spille";
                  console.log(this.player);
                  await NotificationService.sendNotification(title, body, this.player.token);
                  this.$store.dispatch('addInviteToPlayersInvites', {receiverUsername: this.player.username, requesterUsername: this.currentUser.username, requesterImg: this.currentUser.img, token:this.currentUser.token});
                  this.$router.push('/games');
                }
              }
          }],
        });
      return alert.present();
    },
    
  },
});
</script>
<style scoped>
ion-button  {
    --background: #262A34 !important;
    color: white;
    height: 8.6vh;
    width: 80vw;
    border-radius: 1vw;
    margin-bottom: 1.5vh;
}

img {
    height: auto;
    max-width: 15%;
    border-radius: 50%;
}

p {
    font-size: 1.3em;
    margin-left: 5vw;
}

.flex {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>
