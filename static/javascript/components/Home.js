export let Home = {
  template: `<div></div>`,
  created () {
    this.fetchStatus();
  },
  methods: {
    fetchStatus: async function () {
      const rawResponse = await fetch('/api/get-active-profile');
      const profileResponse = await rawResponse.json();
      let redirectRoute;
      
      if (profileResponse.loggedIn === true && profileResponse.profile) {
        redirectRoute = 'catalog';
      }
      else if (profileResponse.loggedIn === true && !profileResponse.profile) {
        redirectRoute = 'choose-profile';
      }
      else {
        redirectRoute = 'login';
      }

      this.$router.push({ name: redirectRoute });
    }
  }
};