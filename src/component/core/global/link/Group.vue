<template>
  <div>
    <router-link :to="'/groups/' + group.id" :style="{ color: group.color }">{{
      group.name
    }}</router-link>
    <div v-if="separator">,&nbsp;</div>
  </div>
</template>
<script>
// @vuese
// @group Core/Global/Link
export default {
  name: "GroupLink",
  props: {
    group: {
      required: false,
      type: Object
    },
    separator: {
      required: false,
      default: false,
      type: Boolean
    }
  }
};
</script>
<style lang="scss" scoped>
div {
  display: inline;
}
</style>
