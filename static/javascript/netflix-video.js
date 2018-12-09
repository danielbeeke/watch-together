Vue.component('netflix-video', {
  props: ['video'],
  template: `<a class="netflix-video" :href="'https://www.netflix.com/title/' + video.id" target="_blank">
    <img :src="video.url">
  </a>`
});