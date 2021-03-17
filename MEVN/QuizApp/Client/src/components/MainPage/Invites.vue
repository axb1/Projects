<template>
    <ion-page>
        <ion-content>
            <ion-icon :icon="arrowBackOutline" size="large" @click="GoBack"></ion-icon>
            <ion-list v-for="invite in currentUser.invites" :key="invite.inviteID">
                <InviteFriendAlert v-bind:invite="invite"></InviteFriendAlert>
            </ion-list>
                
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonIcon, IonList} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import InviteFriendAlert from './InviteFriendAlert.vue';

export default {
    name: 'invites',
    computed: {
        currentUser() {
          return this.$store.getters.getCurrentUser;
        },
    },
    data: function() {
      return {
          arrowBackOutline
      };  
    },
    components: {
        IonPage,
        IonContent,
        IonIcon,
        InviteFriendAlert,
        IonList
    },
    methods: {
        GoBack() {
            this.$router.push('games');
        }
    },
    }
</script>
<style scoped>

ion-icon {
    margin-top: 4vh;
    margin-left: 4vw;
    color: white;
}

ion-button {
    --background: #262A34;
    height: 8.6vh;
    color: white;
    width: 90%;
}

ion-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #181A20;
}

h1 {
    color:white;
}




</style>