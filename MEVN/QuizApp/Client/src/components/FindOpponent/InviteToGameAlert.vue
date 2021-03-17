<template>
<ion-button @click="presentAlert">
    <ion-thumbnail><ion-img :src="player.img"></ion-img></ion-thumbnail> 
        <ion-label class="name">{{player.username}} </ion-label>
</ion-button>
</template>

<script>
import { IonButton, alertController, IonThumbnail, IonLabel, IonImg} from '@ionic/vue';

import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonButton, IonThumbnail, IonLabel, IonImg},
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
              handler: meh => {
                console.log(meh);
                if(this.player.username == this.currentUser.username) {
                  this.$router.push('/friendslist');
                }
                else {
                  this.$store.dispatch('addInviteToPlayersInvites', {receiverUsername: this.player.username, requesterUsername: this.currentUser.username, requesterImg: this.currentUser.img});
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
