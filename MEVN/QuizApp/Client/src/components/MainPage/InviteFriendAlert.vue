<template>
    <ion-button @click="presentAlert">
    <ion-thumbnail><ion-img :src="this.invite.img"></ion-img></ion-thumbnail> 
        <ion-label class="name">{{this.invite.username}} </ion-label>
    </ion-button>
</template>

<script>
import { IonButton, alertController, IonThumbnail, IonImg, IonLabel} from '@ionic/vue';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'invitefriendalert',
  components: { IonButton, IonThumbnail, IonImg, IonLabel},
  props: {invite: Object},
  methods: {
    async presentAlert() {
      const alert = await alertController
        .create({
          header: 'Do you want to play?',
          buttons: [{
            text: 'Decline',
            handler: blah => {
              console.log(blah);
              this.$store.dispatch('removeInvite', this.invite.inviteID);
            }
          }, {
              text: 'Accept',
              handler: meh => {
                  console.log(meh);
                  this.$store.dispatch('removeInvite', this.invite.inviteID);
                  this.$store.dispatch('createGameAgainstFriend', {username: this.invite.username, img: this.invite.img});
              }
          }],
        });
      return alert.present();
    },
    
  },
});
</script>