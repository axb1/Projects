import { createRouter, createWebHistory } from '@ionic/vue-router';
import firebase from 'firebase';
import Login from '../components/Login/Login.vue';
import Register from '../components/Login/Register.vue';
import ForgotPassword from '../components/Login/ForgotPassword.vue';
import Games from '../components/MainPage/Games.vue';
import Quiz from '../components/Gameplay/Quiz.vue';
import SelectCategories from '../components/Gameplay/SelectCategories.vue';
import Results from '../components/Gameplay/Results.vue';
import FindOpponent from '../components/FindOpponent/FindOpponent.vue';
import RandomOpponent from '../components/FindOpponent/RandomOpponent.vue';
import Settings from '../components/MainPage/Settings.vue';
import Friendslist from '../components/FindOpponent/Friendslist.vue';
import AddFriend from '../components/FindOpponent/AddFriend.vue';
import Invites from '../components/MainPage/Invites.vue';
import OngoingGame from '../components/MainPage/OngoingGame.vue';
import PreviousGame from '../components/MainPage/PreviousGame.vue';
import InviteFriendAlert from '../components/MainPage/InviteFriendAlert.vue';
import FindPlayer from '../components/FindOpponent/FindPlayer.vue';
import Store from '../store/store';


const routes = [
  {
    path: '',
    redirect: '/login',
  },
  {
    path:'/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path:'/register',
    name: 'register',
    component: Register
  },
  {
    path:'/forgotpassword',
    name: 'forgotpassword',
    component: ForgotPassword
  },
  {
    path:'/games',
    name: 'games',
    component: Games,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path:'/quiz',
    name: 'quiz',
    component: Quiz,
    props: true
  },
  {
    path:'/selectcategories',
    name: 'selectcategories',
    component: SelectCategories,
    props: true
  },
  {
    path:'/results',
    name: 'results',
    component: Results,
    props: true
  }, 
  {
    path:'/findopponent',
    name: 'findopponent',
    component: FindOpponent,
    props: true
  },
  {
    path:'/randomopponent',
    name: 'randomopponent',
    component: RandomOpponent,
    props: true
  },
  {
    path:'/settings',
    name: 'settings',
    component: Settings,
  },
  {
    path:'/friendslist',
    name: 'friendslist',
    component: Friendslist,
    props: true
  },
  {
    path:'/addfriend',
    name: 'addfriend',
    component: AddFriend,
    props: true
  },
  {
    path:'/invites',
    name: 'invites',
    component: Invites,
    props: true
  },
  {
    name: 'ongoinggame',
    component: OngoingGame,
    props: true
  },
  {
    name: 'previousgame',
    component: PreviousGame,
    props: true
  },
  {
    name: 'invitefriendalert',
    component: InviteFriendAlert,
    props: true
  },
  {
    path:'/findplayer',
    name: 'findplayer',
    component: FindPlayer,
    props: true
  },
]


let firebaseUser = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function(user) {
  console.log(user);
  firebaseUser = user;
});

firebase.auth().onAuthStateChanged(newUserState => {
  firebaseUser = newUserState;
  if(firebaseUser) {
    router.push('/games');
  }
})

router.beforeEach((to, from, next) => {
  console.log(firebaseUser);
  if (!firebaseUser && to.meta.requiresAuth) {
    next('login');
  } else {
    next();
  }
})

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  Store
})





export default router
