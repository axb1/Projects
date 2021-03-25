<template>
  <ion-button @click="presentAlert">Søg efter modstander
  </ion-button>
</template>

<script>
import { IonButton, alertController} from '@ionic/vue';

import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonButton},
  methods: {
    async presentAlert() {
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Vi leder efter et spil. Det kan tage lidt tid',
          buttons: [{
            text: 'Ok',
            handler: blah => {
              console.log(blah);
              this.$store.dispatch('lookForGameAgainstRandomOpponent');
              this.$router.push('/games')
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
    --background: linear-gradient(to right, #0BA360, #3CBA92);
    --border-radius: 4px !important;
    width: 75vw;
    height: 6vh;
    margin-top: 2vh;
}
</style>