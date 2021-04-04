<template>
  <div class="flex">
      <ion-button @click="presentAlert">
      <div class="flex"></div>
      <ion-thumbnail><ion-img :src="invite.img"></ion-img></ion-thumbnail> 
        <ion-label class="name">{{invite.username}} </ion-label>
      </ion-button>
  </div>
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
                  this.$store.dispatch('createGameAgainstFriend', {username: this.invite.username, img: this.invite.img, token: this.invite.token});
              }
          }],
        });
      return alert.present();
    },
    
  },
});
</script>

<style scoped>
  ion-button {
    --background: #262A34;
    color: white;
    height: 8.6vh;
    width: 80vw;
    --border-radius: 1vw;
    margin-bottom: 1.5vh;
  }

.flex {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}

</style>