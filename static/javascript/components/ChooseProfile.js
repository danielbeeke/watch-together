export let ChooseProfile = {
  template: `<div class="profile-chooser">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="profiles" class="profiles">
      <div class="profile" v-for="profile in profiles" @click="chooseProfile(profile.guid)">
        <img class="avatar" :src="profile.avatarImages['320']">
        <span class="name">{{ profile.rawFirstName }}</span>    
      </div>
    </div>
  </div>`,

  data () {
    return {
      loading: false,
      profiles: null
    }
  },
  created () {
    this.fetchProfiles()
  },
  methods: {
    fetchProfiles: async function () {
      this.profiles = null;
      this.loading = true;

      try {
        const rawResponse = await fetch('/api/profiles');
        const profileResponse = await rawResponse.json();
        this.loading = false;
        this.profiles = profileResponse;
      }
      catch (error) {
        this.loading = false;
        this.$router.push({ name: 'logout' })
      }
    },

    chooseProfile: async function (guid) {
      const rawResponse = await fetch('/api/choose-profile', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          guid: guid
        })
      });

      const chooseProfileResponse = await rawResponse.json();

      if (chooseProfileResponse.switched === true) {
        this.$router.push({ name: 'catalog' })
      }
    }
  }
};