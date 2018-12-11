Vue.component('netflix-avatar', {
  props: ['profile'],
  template: `<div class="netflix-avatar">
    <span class="name">{{ profile.rawFirstName }}</span>
    <img :src="profile.avatarImages['64']">
  </div>`
});
