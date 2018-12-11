Vue.component('netflix-avatar', {
  props: ['profile'],
  template: `<div class="netflix-avatar">
    <img :src="profile.avatarImages['64']">
    <span class="name">{{ profile.rawFirstName }}</span>
  </div>`
});
