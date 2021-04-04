<template>
<ion-button @click="presentAlert">
    <ion-thumbnail><ion-img :src="friend.img"></ion-img></ion-thumbnail> 
        <ion-label class="name">{{friend.username}} </ion-label>
</ion-button>
</template>

<script>
import { IonButton, alertController} from '@ionic/vue';

import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonButton},
  props: {friend: Object},
  methods: {
    async presentAlert() {
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Add friend to friends list?',
          buttons: [{
            text: 'Cancel',
            handler: blah => {
              console.log(blah);
              this.$router.push('/addfriend')
            }
          }, {
              text: 'Accept',
              handler: meh => {
                  console.log(meh);
                  this.$store.dispatch('addFriendToFriendslist', {username: this.friend.username, img: this.friend.img});
                  this.$router.push('/friendslist');
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
</style>
