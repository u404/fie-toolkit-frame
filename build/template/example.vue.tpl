<template>
  <example-box name="<%= CompName %>">
    <<%= prefix %>-<%= compname %>></<%= prefix %>-<%= compname %>>
  </example-box>
</template>

<script>
  import ExampleBox from "./ExampleBox"
  // import <%= CompName %> from "@src/components/<%= CompName %>"
  export default {
    components: {
      ExampleBox
      // <%= CompName %>
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style lang="scss">
</style>