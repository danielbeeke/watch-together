// Route components
import { Login } from './components/Login.js';
import { Catalog } from './components/Catalog.js';
import { Home } from './components/Home.js';
import { ChooseProfile } from './components/ChooseProfile.js';

// Components
import './components/NetflixVideo.js';
import './components/CategorySwitcher.js';
import './components/NetflixAvatar.js';

const routes = [
  { name: 'home', path: '/', component: Home },
  { name: 'login', path: '/login', component: Login },
  { name: 'catalog', path: '/catalog', component: Catalog },
  { name: 'choose-profile', path: '/choose-profile', component: ChooseProfile }
];

const router = new VueRouter({ routes: routes });
new Vue({ router: router }).$mount('#app');