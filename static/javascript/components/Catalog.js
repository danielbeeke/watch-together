export let Catalog = {
  template: `<div class="catalog-wrapper">

    <header class="catalog-header">
      <category-switcher />
      
      <div class="connected-profiles">
          <netflix-avatar v-for="person in roomData" v-if="person" :key="person.profile.guid" :profile="person.profile" />
      </div>    
      
      <input type="text" v-model="roomName">
    </header>
    
    <div v-infinite-scroll="fetchData"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="10"
         infinite-scroll-immediate-check="false">
         
      <isotope :list="videos" :options="isotopeOptions()">
        <netflix-video 
          class="netflix-video" 
          :video="video" 
          v-for="video in filteredVideos" 
          :key="video.id" />
      </isotope>
      
    </div>
  </div>`,

  data () {
    return {
      roomData: [],
      currentCategory: 6548,
      currentPage: 0,
      videos: [],
      blacklist: [],
      roomName: 'Room name',
    }
  },
  created: function () {
    setTimeout(() => {
      this.fetchData();
      this.connectWebsocket();
    }, 600);

    this.$root.$on('categorySelected', (categoryId) => {
      this.currentCategory = categoryId;
      this.fetchData();
    });
  },

  computed: {
    filteredVideos: function () {
      return this.videos.filter(video => !this.blacklist.includes(video.id))
    }
  },

  methods: {
    /**
     * Downloads the videos.
     * @returns {Promise<void>}
     */
    fetchData: async function () {
      if (this.currentPage === -1) { return }
      this.videos = [];
      this.currentPage = 0;
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

    /**
     * Isotope options
     * @returns {{masonry: {gutter: number}, getSortData: {id: string}, getFilterData: {}}}
     */
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

    /**
     * Websockets initialisation.
     */
    connectWebsocket: async function () {
      let websocket = new WebSocket('ws://localhost:8003/' + this.roomName);

      websocket.addEventListener('message', (event) => {
        this.roomData = JSON.parse(event.data);
      });

      let rawResponse = await fetch('/api/get-watched');
      const watchedVideoIds = await rawResponse.json();

      rawResponse = await fetch('/api/get-active-profile');
      const activeProfile = await rawResponse.json();

      websocket.send(JSON.stringify({
        profile: activeProfile.profile,
        watched: watchedVideoIds
      }));
    }
  }
};