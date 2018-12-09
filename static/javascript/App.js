import { Login } from './components/Login.js';
import { Catalog } from './components/Catalog.js';
import { ChooseProfile } from './components/ChooseProfile.js';

const routes = [
  { name: 'login', path: '/login', component: Login },
  { name: 'catalog', path: '/catalog', component: Catalog },
  { name: 'choose-profile', path: '/choose-profile', component: ChooseProfile }
];

const router = new VueRouter({ routes: routes });
new Vue({ router: router }).$mount('#app');