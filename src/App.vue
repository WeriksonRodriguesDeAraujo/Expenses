<template>
  <div id="app">
    <base-spinner/>
    <layout-notification/>
    <div class="container-fluid" v-if="isLogged">
      <div class="row">
        <div class="col-2 navigation-sidebar">
          <h1 class="app-title">Expenses</h1>
          <layout-navigation/>
        </div>
        <div class="col-10">
          <router-view/>
        </div>
      </div>
    </div>
   <router-view v-else/>
  </div>
</template>

<script>
import BaseSpinner from './components/global/BaseSpinner'
import LayoutNavigation from './components/layout/LayoutNavigation'
import LayoutNotification from './components/layout/LayoutNotification'

export default {
  components: {
    'base-spinner': BaseSpinner,
    'layout-navigation': LayoutNavigation,
    'layout-notification': LayoutNotification
  },

  data: () => ({ isLogged: false }),

  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null
      this.isLogged = !!user

      this.$router.push({ name: window.uid ? 'Home' : 'Login' })

      setTimeout(() => {
        this.$root.$emit('Spinner::hide')
      }, 300)
    })
  }
}
</script>

<style lang="scss">

  #app {
    min-height: 100vh;
    color: var(--light);
    background-color: var(--darker);
    .navigation-sidebar {
      background-color: var(--dark-medium);
      .app-title {
        font-size: 20pt;
        text-align: center;
        margin-top: 10px;
      }
    }
  }

</style>
