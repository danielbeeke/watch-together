Vue.component('netflix-video', {
  props: ['video'],
  template: `<div class="netflix-video">
    <img :src="video.url">
  </div>`
});
