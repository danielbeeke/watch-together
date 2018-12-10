export let Catalog = {
  template: `<div class="catalog-wrapper">
    <header class="categories-wrapper">
      <span class="title">Categories</span>
      <div class="categories-inner">
        <span
          class="category"
          v-for="(category, categoryId) in categories"
          :class="{'active': currentCategory == categoryId}"
          @click="switchCategory(categoryId)"
          v-html="category">
        </span>      
      </div>
    </header>

    <div v-infinite-scroll="fetchData"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="10"
         infinite-scroll-immediate-check="false">
      <isotope :list="videos" :options="isotopeOptions()">
        <div class="netflix-video" v-for="video in filteredVideos" :key="video.id">
          <img :src="video.url">
        </div>
      </isotope>
    </div>
  </div>`,

  data () {
    return {
      currentPage: 0,
      currentCategory: 6548,
      videos: [],
      blacklist: [],
      room: 'Room name',
      categories: {
        1365: 'Action',
        3063: 'Anime',
        6548: 'Comedies',
        5824: 'Crime',
        3979: 'Critics Picks',
        2243108: 'Documentaries',
        5763: 'Dramas',
        10606: 'Dutch',
        107985: 'Festive Favourites',
        8711: 'Horror',
        7077: 'Independent',
        78367: 'International',
        783: 'Kids &amp; Family',
        52852: 'Music &amp; Musicals',
        8883: 'Romance',
        1492: 'Sci-Fi',
        4370: 'Sports',
        11559: 'Stand-up Comedy',
        8933: 'Thrillers',
      }
    }
  },
  created: async function () {
    setTimeout(() => {
      this.fetchData();
    }, 600);

    let websocket = new WebSocket('ws://localhost:8003/' + this.room);
    let rawResponse = await fetch('/api/get-watched');
    const watchedVideoIds = await rawResponse.json();

    websocket.addEventListener('message', (event) => {
      this.blacklist = event.data.split(',').map(value => parseInt(value));
    });

    websocket.send(watchedVideoIds);
  },

  computed: {
    filteredVideos: function () {
      return this.videos.filter(video => !this.blacklist.includes(video.id))
    }
  },

  methods: {
    switchCategory: function (categoryId) {
      this.currentCategory = categoryId;
      this.videos.splice(0, this.videos.length);
      this.currentPage = 0;
      this.fetchData();
    },

    fetchData: async function () {
      if (this.currentPage === -1) { return }

      let rawResponse = await fetch(`/api/browse/${this.currentCategory}/${this.currentPage}/20`);
      const videos = await rawResponse.json();

      if (videos instanceof Array) {
        videos.forEach(video => {
          if (!this.videos.find(findVideo => findVideo.id === video.id)) {
            this.videos.push(video)
          }
        });
        this.currentPage++;
      }
      else {
        this.currentPage = -1;
      }
    },

    isotopeOptions: function () {
      return {
        masonry: {
          gutter: 0,
        },
        getSortData: {
          id: 'id'
        },
        getFilterData: {}
      }
    },

  }
};