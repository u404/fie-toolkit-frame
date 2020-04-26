<template>
  <div class="page">
    <ul class="nav-bar" ref="navBar">
      <router-link tag="li" v-for="(v, k) in routeConfig" :key="k" class="nav" :to="{ name: k }">{{ k }}</router-link>
    </ul>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import routeConfig from "./route.config.json"

export default {
  data () {
    return {
      routeConfig
    }
  },
  methods: {
    go (k) {
      this.$router.push({ name: k })
    }
  },

  mounted () {
    this.$router.afterEach((to, from) => {
      this.$nextTick(() => {
        const $nav = this.$refs.navBar.querySelector(".router-link-active")
        // const left = $nav.offsetLeft
        // const width = $nav.offsetWidth
        // const viewWidth = document.documentElement.clientWidth
        // const scrollLeft = this.$refs.navBar.scrollLeft

        console.log($nav.offset)
      })
    })
  }
}
</script>

<style lang="scss">
.page {
  height: 100%;
  @include flex(column, flex-start, stretch);
  .nav-bar {
    flex: 0 0 auto;
    width: 100%;
    line-height: rem(40);
    overflow: auto;
    border-bottom: 1px solid #dedede;
    @include flex();
    .nav {
      flex: 0 0 auto;
      padding: 0 rem(15);
      border-right: 1px solid #dedede;
      &:last-of-type {
        border-right: none;
      }
      &.router-link-active {
        background: #ccc;
      }
    }
  }
  .main {
    flex: 1 1 auto;
  }
}

</style>
