<template>
    <div class="posts_page">
    <PostList
        :posts="loadedPosts"
    />
    </div>
</template>

<script>
export default {
  computed: {
      loadedPosts() {
          return this.$store.getters.loadedPosts
      }
  }
}
</script>

<style scoped>
    .posts_page {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>