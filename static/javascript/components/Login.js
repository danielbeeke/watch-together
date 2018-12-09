export let Login = {
  template: `<form class="login-form" @submit="login">
    <div class="field">
      <label class="field-label">Email</label>  
      <input class="text-field" type="email" v-model="email" required>    
    </div>

    <div class="field">
      <label class="field-label">Password</label>  
      <input class="text-field" type="password" v-model="password" required>
    </div>

    <button class="button" type="submit">Login</button>
  </form>`,

  data () {
    return {
      failed: false,
      isBusy: false,
      email: '',
      password: ''
    }
  },

  methods: {
    login: async function () {

      // Reset the login tryout.
      this.failed = false;

      const rawResponse = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });

      const loginResponse = await rawResponse.json();

      if (loginResponse.loggedIn === true) {
        const redirectRoute = loginResponse.profile === null ? 'choose-profile' : 'catalog';
        this.$router.push({ name: redirectRoute });
      }
      else {
        this.failed = true;
      }
    }
  }
};