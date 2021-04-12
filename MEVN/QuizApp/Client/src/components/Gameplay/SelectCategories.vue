<template>
  <ion-page>
    <ion-content>
      <ion-icon id="arrowback" :icon="arrowBackOutline" size="large" @click="GoBack"></ion-icon>
      <h1>Vælg 3 kategorier</h1>
      <ion-list v-for="category in randomCategories" v-bind:key="category">
        <div v-if="category.val == 'Sport'">
          <ion-item lines="none">
            <ion-label color="light">{{category.val}}</ion-label>
            <ion-icon :icon="americanFootballSharp" slot="start"></ion-icon>
            <ion-checkbox class="categoryCheckbox" @update:modelValue="category.isChecked = $event" :modelValue="category.isChecked"></ion-checkbox>
          </ion-item>
        </div>
        <div v-if="category.val == 'Naturvidenskab'">
          <ion-item lines="none">
            <ion-label color="light">{{category.val}}</ion-label>
            <ion-icon :icon="flaskSharp" slot="start"></ion-icon>
            <ion-checkbox class="categoryCheckbox" @update:modelValue="category.isChecked = $event" :modelValue="category.isChecked"></ion-checkbox>
          </ion-item>
        </div>
        <div v-if="category.val == 'Teknologi'">
          <ion-item lines="none">
            <ion-label color="light">{{category.val}}</ion-label>
            <ion-icon :icon="gameControllerSharp" slot="start"></ion-icon>
            <ion-checkbox class="categoryCheckbox" @update:modelValue="category.isChecked = $event" :modelValue="category.isChecked"></ion-checkbox>
          </ion-item>
        </div>
        <div v-if="category.val == 'Sprog'">
          <ion-item lines="none">
            <ion-label color="light">{{category.val}}</ion-label>
            <ion-icon :icon="chatbubbleSharp" slot="start"></ion-icon>
            <ion-checkbox class="categoryCheckbox" @update:modelValue="category.isChecked = $event" :modelValue="category.isChecked"></ion-checkbox>
          </ion-item>
        </div>
        <div v-if="category.val == 'Kunst'">
          <ion-item lines="none">
            <ion-label color="light">{{category.val}}</ion-label>
            <ion-icon :icon="colorPaletteSharp" slot="start"></ion-icon>
            <ion-checkbox class="categoryCheckbox" @update:modelValue="category.isChecked = $event" :modelValue="category.isChecked"></ion-checkbox>
          </ion-item>
        </div>
        <div v-if="category.val == 'Litteratur'">
          <ion-item lines="none">
            <ion-label color="light">{{category.val}}</ion-label>
            <ion-icon :icon="bookSharp" slot="start"></ion-icon>
            <ion-checkbox class="categoryCheckbox" @update:modelValue="category.isChecked = $event" :modelValue="category.isChecked"></ion-checkbox>
          </ion-item>
        </div>
        <div v-if="category.val == 'Film og TV'">
          <ion-item lines="none">
            <ion-label color="light">{{category.val}}</ion-label>
            <ion-icon :icon="videocamSharp" slot="start"></ion-icon>
            <ion-checkbox class="categoryCheckbox" @update:modelValue="category.isChecked = $event" :modelValue="category.isChecked"></ion-checkbox>
          </ion-item>
        </div>
        <div v-if="category.val == 'Mad'">
          <ion-item lines="none">
            <ion-label color="light">{{category.val}}</ion-label>
            <ion-icon :icon="restaurantSharp" slot="start"></ion-icon>
            <ion-checkbox class="categoryCheckbox" @update:modelValue="category.isChecked = $event" :modelValue="category.isChecked"></ion-checkbox>
          </ion-item>
        </div>
        <div v-if="category.val == 'Medicin'">
          <ion-item lines="none">
            <ion-label color="light">{{category.val}}</ion-label>
            <ion-icon :icon="medkitSharp" slot="start"></ion-icon>
            <ion-checkbox class="categoryCheckbox" @update:modelValue="category.isChecked = $event" :modelValue="category.isChecked"></ion-checkbox>
          </ion-item>
        </div>
        <div v-if="category.val == 'Politik'">
          <ion-item lines="none">
            <ion-label color="light">{{category.val}}</ion-label>
            <ion-icon :icon="idCardSharp" slot="start"></ion-icon>
            <ion-checkbox class="categoryCheckbox" @update:modelValue="category.isChecked = $event" :modelValue="category.isChecked"></ion-checkbox>
          </ion-item>
        </div>
        <div v-if="category.val == 'Religion'">
          <ion-item lines="none">
            <ion-label color="light">{{category.val}}</ion-label>
            <ion-icon :icon="handRightSharp" slot="start"></ion-icon>
            <ion-checkbox class="categoryCheckbox" @update:modelValue="category.isChecked = $event" :modelValue="category.isChecked"></ion-checkbox>
          </ion-item>
        </div>
        <div v-if="category.val == 'Geografi'">
          <ion-item lines="none">
            <ion-label color="light">{{category.val}}</ion-label>
            <ion-icon :icon="earthSharp" slot="start"></ion-icon>
            <ion-checkbox class="categoryCheckbox" @update:modelValue="category.isChecked = $event" :modelValue="category.isChecked"></ion-checkbox>
          </ion-item>
        </div>
        <div v-if="category.val == 'Historie'">
          <ion-item lines="none">
            <ion-label color="light">{{category.val}}</ion-label>
            <ion-icon :icon="hourglassSharp" slot="start"></ion-icon>
            <ion-checkbox class="categoryCheckbox" @update:modelValue="category.isChecked = $event" :modelValue="category.isChecked"></ion-checkbox>
          </ion-item>
        </div>
        <div v-if="category.val == 'Natur'">
          <ion-item lines="none">
            <ion-label color="light">{{category.val}}</ion-label>
            <ion-icon :icon="fishSharp" slot="start"></ion-icon>
            <ion-checkbox class="categoryCheckbox" @update:modelValue="category.isChecked = $event" :modelValue="category.isChecked"></ion-checkbox>
          </ion-item>
        </div>
        <div v-if="category.val == 'Erhverv'">
          <ion-item lines="none">
            <ion-label color="light">{{category.val}}</ion-label>
            <ion-icon :icon="logoAmazon" slot="start"></ion-icon>
            <ion-checkbox class="categoryCheckbox" @update:modelValue="category.isChecked = $event" :modelValue="category.isChecked"></ion-checkbox>
          </ion-item>
        </div>
        <div v-if="category.val == 'Design'">
          <ion-item lines="none">
            <ion-label color="light">{{category.val}}</ion-label>
            <ion-icon :icon="shirtSharp" slot="start"></ion-icon>
            <ion-checkbox class="categoryCheckbox" @update:modelValue="category.isChecked = $event" :modelValue="category.isChecked"></ion-checkbox>
          </ion-item>
        </div>
        <div v-if="category.val == 'Musik'">
          <ion-item lines="none">
            <ion-label color="light">{{category.val}}</ion-label>
            <ion-icon :icon="musicalNotesSharp" slot="start"></ion-icon>
            <ion-checkbox class="categoryCheckbox" @update:modelValue="category.isChecked = $event" :modelValue="category.isChecked"></ion-checkbox>
          </ion-item>
        </div>
      </ion-list>
      <ion-button v-on:click="StartTheGame()">Bekræft kategorier</ion-button>
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
  IonButton,
  IonList
} from "@ionic/vue";
import { arrowBackOutline, americanFootballSharp, flaskSharp, musicalNotesSharp, gameControllerSharp, chatbubbleSharp, colorPaletteSharp, bookSharp, videocamSharp, restaurantSharp,
      medkitSharp, idCardSharp, handRightSharp, earthSharp, hourglassSharp, fishSharp, logoAmazon, shirtSharp } from 'ionicons/icons';


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
        "Medicin"
      ],
      randomCategories: [],
      error: "",
      arrowBackOutline,
      flaskSharp,
      musicalNotesSharp,
      gameControllerSharp,
      chatbubbleSharp,
      colorPaletteSharp,
      bookSharp,
      videocamSharp,
      restaurantSharp,
      medkitSharp,
      idCardSharp,
      handRightSharp,
      earthSharp,
      hourglassSharp,
      fishSharp,
      logoAmazon,
      shirtSharp,
      americanFootballSharp

    };
  },
  components: {
    IonPage,
    IonContent,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonButton,
    IonList
  },

  ionViewWillEnter() {
    this.AssignRandomCategories();
  },

  ionViewDidLeave() {
    this.randomCategories = [];
  },



  methods: {
    AssignRandomCategories() {
      let randomNumbers = [];
      while (randomNumbers.length != 5) {
        let randomNumber = Math.floor(Math.random() * 17 + 0);
        if (!randomNumbers.includes(randomNumber)) {
          randomNumbers.push(randomNumber)
        } 
      }
      randomNumbers.forEach(element => {
        var category = {val: this.allCategories[element], isChecked: false};
        this.randomCategories.push(category);
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
        this.$store.dispatch('setCategories', selectedCategories);
        cboxes.forEach(element => {
          element.checked = false;
        });
        this.$router.push('quiz');
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
}

ion-icon {
  color: white;
}

ion-list {
  padding: 0;
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
  margin-left: 5vw;
  margin-right: 5vw;
}

h1 {
  color:white;
  text-align: center;
  margin-top: 2.5vh;
  margin-bottom: 4vh;
}

div {
  background-color: #181A20;
  margin-bottom: 1.5vh;
}

ion-list {
  background-color: #181A20;
}




</style>




