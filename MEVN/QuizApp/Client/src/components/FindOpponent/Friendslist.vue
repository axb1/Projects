<template>
    <ion-page>
        <ion-content>
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button class="iconbutton" @click="GoBack">
                            <ion-icon :icon="arrowBackOutline" size="large"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                    <ion-buttons slot="primary">
                        <ion-button class="iconbutton" @click="GoToAddFriend">
                            <ion-icon :icon="addCircleOutline" size="large"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                    <ion-title>Vælg ven at spille mod</ion-title>
                </ion-toolbar>
          </ion-header>
          <ion-list v-for="friend in friends" :key="friend._id">
              <InviteToGameAlert v-bind:player="friend"></InviteToGameAlert>
          </ion-list>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonIcon, IonButton, IonButtons, IonTitle, IonList} from '@ionic/vue';
import {arrowBackOutline, addCircleOutline} from 'ionicons/icons';
import InviteToGameAlert from './InviteToGameAlert';

export default {
    name: 'friendslist',
    data: function() {
      return {
        arrowBackOutline,
        addCircleOutline
      };  
    },
    computed: {
        friends() {
          return this.$store.getters.getFriends;
        },
    },
    components: {
        IonPage,
        IonContent,
        IonIcon,
        IonButton,
        IonButtons,
        IonTitle,
        IonList,
        InviteToGameAlert
    },
    methods: {
        GoBack() {
          this.$router.push('/findopponent');
        },
        GoToAddFriend() {
            this.$router.push('/addfriend');
        }
    },
    created() {
        this.$store.dispatch('setFriendSearchResult', "");
        this.$store.dispatch('setFriends');
    }

}
</script>
<style scoped>
ion-icon {
    color: white;
}

ion-button {
    --background: #262A34;
    height: 8.6vh;
    color: white;
    width: 90%;
}

ion-buttons {
    --background: #181A20;
}

.iconbutton {
    --background: #181A20;
}

h1 {
    color:white;
    text-align: center;
    margin-top: 1vh;
    margin-bottom: 4vh;
}

ion-header {
    position: relative;
    height: 14vh;
}

ion-toolbar {
    --background: #181A20;
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}

ion-title {
       --background: #141A33;
       color: white;
}

ion-list {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background: #181A20;
}


</style>