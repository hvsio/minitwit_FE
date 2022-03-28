<template>
  <div id="AvatarComponent">
    <img
      v-if="image.error"
      :src="image.error"
      :style="{ height: height, width: width }"
    />
    <div
      v-if="image.isLoading && !image.error"
      :style="{ height: height, width: width }"
    >
      <va-progress-circle
        indeterminate
        color="black"
        :thickness="0.2"
        size="large"
      />
    </div>
    <img
      v-if="!image.error && !image.isLoading"
      :src="image.avatar"
      :style="{ height: height, width: width }"
    />
  </div>
</template>

<script>
export default {
  name: "AvatarComponent",
  props: {
    image: {
      type: Object,
      required: true,
      default: {},
    },
    height: {
      type: String,
      required: false,
      default: "100px",
    },
    width: {
      type: String,
      required: false,
      default: "100px",
    },
  },
  components: {},
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#AvatarComponent {
}
</style>
