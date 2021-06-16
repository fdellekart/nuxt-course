<template>
    <section class="posts-list">
      <post-preview-tile
        id="1"
        title="Ein leiwanda Post"
        previewText="A guada!"
        thumbnail="https://www.ikea.com/mx/en/images/products/pjaetteryd-picture-trolltunga-norway__0925582_pe788810_s5.jpg"
        :is-admin="isAdmin"
      />
      <post-preview-tile
        id="2"
        title="Nu ana"
        previewText="Ah a guada!"
        thumbnail="https://www.ikea.com/mx/en/images/products/pjaetteryd-picture-trolltunga-norway__0925582_pe788810_s5.jpg"
        :is-admin="isAdmin"
      />
    </section>
</template>

<script>
import PostPreviewTile from '@/components/posts/PostPreviewTile.vue'

export default {
  components: {
    PostPreviewTile
  },
  props: {
    isAdmin: {
      type: Boolean,
      requried: false,
      default: false
    }
  }
}
</script>

<style scoped>
.posts-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>