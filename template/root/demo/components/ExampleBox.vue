<template>
  <div class="example-box">
    <div class="title" v-if="name">
      {{ name }}
    </div>
    <div class="example-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String
  }
}
</script>

<style lang="scss" scoped>
.example-box {
  height: 100%;
  @include flex(column, flex-start, stretch);
  overflow: auto;
  .title {
    flex: 0 0 auto;
    line-height: rem(30);
    font-size: rem(18);
    font-weight: bold;
  }
  .example-content {
    flex: 1 1 auto;
    transform: translateZ(0);
    @include flex(column, flex-start, stretch);
  }
  /deep/ .example-box {
    flex: 1 1 auto;
    .title {
      font-size: rem(14);
    }
  }
}
</style>
