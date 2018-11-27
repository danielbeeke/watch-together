new Vue({
  el: document.querySelector('.catalog-wrapper'),
  data: {
    currentPage: 0,
    currentCategory: 6548,
    videos: [],
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
  },
  created () {
    setTimeout(() => {
      this.fetchData();
    }, 600);
  },
  methods: {
    switchCategory: function (categoryId) {
      this.currentCategory = categoryId;
      this.videos.splice(0, this.videos.length);
      this.currentPage = 0;
      this.fetchData();
    },

    fetchData: function () {
      if (this.currentPage === -1) { return }

      fetch(`/api/browse/${this.currentCategory}/${this.currentPage}`)
      .then(response => response.json())
      .then(videos => {
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
      });
    },

    getOption: function () {
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
});