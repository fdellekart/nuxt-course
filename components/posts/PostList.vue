<template>
    <section class="posts-list">
      <post-preview-tile
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :title="post.title"
        :previewText="post.previewText"
        :thumbnail="post.thumbnail"
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
      required: false,
      default: false
    },
    posts: {
      type: Array,
      required: true
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