<template>
  <nav class="nav flex-column justify-content-between">
   <div>
    <router-link
        exact
        :key="i"
        exact-active-class="active"
        class="nav-link"
        :to="{name: router.name }"
        v-for="(router, i) in routerlinks"
    >
      <i class="fa" :class="`fa-${router.meta.icon}`"></i>
      {{ router.meta.title }}
    </router-link>
    <hr>
    <LayoutNewExpenses/>
   </div>
   <LayoutLogout/>
  </nav>
</template>

<script>
import LayoutLogout from './LayoutLogout'
import LayoutNewExpenses from './LayoutNewExpenses'

export default {
  components: {
    LayoutLogout,
    LayoutNewExpenses
  },
  computed: {
    routerlinks () {
      return this.$router.options.routes.filter(r => r.name !== 'Login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    margin-left: -15px;
    height: calc(100vh - 49px);
    width: calc(100% + 30px);
  }
  .nav-link {
      color: var(--light);
      transition: .3s;
    &.active {
        color: var(--featured);
        background-color: transparent;
      }
    &:hover {
      color: var(--dark);
      background-color: var(--featured);
    }
  }

</style>
