Vue.component('category-switcher', {
  template: `<div class="categories-wrapper">
  <span class="title">Categories</span>
    <div class="categories-inner">
      <span
        class="category"
        v-for="(category, categoryId) in categories"
        :class="{'active': selected == categoryId}"
        @click="switchCategory(categoryId)"
        v-html="category">
      </span>      
    </div>
  </div>`,

  methods: {
    switchCategory: function (categoryId) {
      this.selected = categoryId;
      this.$root.$emit('categorySelected', this.selected);
    },
  },

  data: function () {
    return {
      selected: 6548,
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
  }
});

