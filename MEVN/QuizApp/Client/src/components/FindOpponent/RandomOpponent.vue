<template>
    <ion-page>
        <ion-content>
          <ion-icon :icon="arrowBackOutline" @click="GoBack" id="arrow"></ion-icon>
          <h1>Vælg sprog</h1>
          <ion-item>
                <ion-label>Sprog</ion-label>
                <ion-select interface="popover">
                    <ion-select-option value="danish">Dansk</ion-select-option>
                    <ion-select-option value="english">Svensk</ion-select-option>
                    <ion-select-option value="english">Norsk</ion-select-option>
                    <ion-select-option value="english">Engelsk</ion-select-option>
                </ion-select>
          </ion-item>
          <div>
            <SearchingForGameAlert></SearchingForGameAlert>
          </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonIcon, IonItem, IonLabel, IonSelectOption, IonSelect} from '@ionic/vue';
import {arrowBackOutline} from 'ionicons/icons';
import SearchingForGameAlert from './SearchingForGameAlert.vue';

export default {
    name: 'randomopponent',
    data: function() {
      return {
        arrowBackOutline
      };  
    },
    components: {
        IonPage,
        IonContent,
        IonIcon,
        SearchingForGameAlert,
        IonItem,
        IonLabel,
        IonSelectOption,
        IonSelect
    },
    methods: {
        GoBack() {
            this.$router.push('/findopponent');
        }
    }
}
</script>
<style scoped>

ion-content {
    position: relative;
}

h1 {
    color:white;
    text-align: center;
    margin-top: 10vh;
    margin-bottom: 4vh;
}

div {
    display: flex;
    justify-content: center;
}

#arrow {
    margin-top: 5.6vh;
    margin-left: 5vw;
    font-size: 5vh;
    color: white;
}

ion-item {
    margin-left: 10vw;
    margin-right: 10vw;
}


</style>