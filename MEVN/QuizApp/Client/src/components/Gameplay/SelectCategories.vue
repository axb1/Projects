<template>
  <ion-page>
    <ion-content>
      <ion-icon id="arrowback" :icon="arrowBackOutline" size="large" @click="GoBack"></ion-icon>
      <h1>Select 3 categories</h1>
      <ion-item lines="none" v-for="category in randomCategories" v-bind:key="category">
        <ion-label color="light">{{category.val}}</ion-label>
        <ion-icon :icon="americanFootballSharp" id="americanfootball" slot="start"></ion-icon>
        <ion-checkbox class="categoryCheckbox"
          @update:modelValue="category.isChecked = $event"
          :modelValue="category.isChecked">
        </ion-checkbox>
      </ion-item>
      <ion-button v-on:click="StartTheGame()">Confirm categories</ion-button>
    </ion-content>
  </ion-page>
</template>




<script>
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonButton
} from "@ionic/vue";
import { arrowBackOutline, americanFootballSharp } from 'ionicons/icons';


export default {
  name: "selectcategories",
  data: function () {
    return {
      allCategories: [
        "Mad",
        "Sport",
        "Politik",
        "Religion",
        "Geografi",
        "Teknologi",
        "Historie",
        "Naturvidenskab",
        "Natur",
        "Sprog",
        "Litteratur",
        "Film og TV",
        "Musik",
        "Kunst",
        "Erhverv",
        "Design",
        "Samfund"
      ],
      randomCategories: [],
      error: "",
      arrowBackOutline,
      americanFootballSharp,
    };
  },
  components: {
    IonPage,
    IonContent,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonButton
  },

  mounted() {
    this.AssignRandomCategories();
  },



  methods: {
    AssignRandomCategories() {
      let randomNumbers = [];
      while (randomNumbers.length != 5) {
        let randomNumber = Math.floor(Math.random() * 12 + 0);
        if (!randomNumbers.includes(randomNumber)) {
          randomNumbers.push(randomNumber)
        } 
      }
      randomNumbers.forEach(element => {
        var category = {val: this.allCategories[element], isChecked: false};
        this.randomCategories.push(category);
        console.log(category);
      });
    },

    // Check how many checkboxes are checked, if 3 then go to the Quiz page and push categories into items prop for use on next page
    StartTheGame() {
      var cboxes = document.getElementsByClassName('categoryCheckbox');
      var len = cboxes.length;
      var amountOfCheckedCheckboxes = 0;
      var selectedCategories = [];
      
      for (var i=0; i<len; i++) {
        if (cboxes[i].checked) {
          selectedCategories.push(cboxes[i].parentElement.textContent.trim());
          amountOfCheckedCheckboxes = amountOfCheckedCheckboxes + 1;
        }
      }
      if (amountOfCheckedCheckboxes > 3) {
        alert("Du kan maksimalt vælge 3 kategorier");
      }
      else if (amountOfCheckedCheckboxes < 3) {
        alert("Du skal vælge 3 kategorier");
      }
      else {
        // Un check checkboxes and go to quiz
        cboxes.forEach(element => {
          element.checked = false;
        });
        this.$router.push({
          name: 'quiz',
          params: {
            items: selectedCategories
          }
        })
      }
    },
    GoBack() {
      this.$router.push('/games');
    }
  },


};
</script>
<style scoped>


#arrowback {
    margin-top: 4vh;
    margin-left: 4vw;
    color: white;
}

#americanfootball {
  color: white;
}


ion-button {
    --background: linear-gradient(to right, #0BA360, #3CBA92);
    --border-radius: 4px;
    display: block;
    margin-left: 5vw;
    margin-right: 5vw;
    margin-top: 4.5vh;
    height: 7.4vh;
}


ion-item {
  --background: #262A34;
  --padding-top: 1.5vh;
  --padding-bottom: 1.5vh;
  --border-radius: 6px;
  margin-top: 1.5vh;
  margin-left: 5vw;
  margin-right: 5vw;
}

h1 {
  color:white;
  text-align: center;
  margin-top: 2vh;
  margin-bottom: 4vh;
}




</style>




