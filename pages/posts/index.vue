<template>
    <div class="posts_page">
    <PostList
        :posts="loadedPosts"
    />
    </div>
</template>

<script>
import PostList from '@/components/posts/PostList'

export default {
    components: {
        PostList
    },
    fetch(context) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
            resolve({
                posts: [
                {
                id: "1",
                title: "A Post!",
                previewText: "A guada!",
                thumbnail: "https://www.ikea.com/mx/en/images/products/pjaetteryd-picture-trolltunga-norway__0925582_pe788810_s5.jpg"
                },
                {
                id: "2",
                title: "A aundara Post!",
                previewText: "A Bessana!",
                thumbnail: "https://www.ikea.com/mx/en/images/products/pjaetteryd-picture-trolltunga-norway__0925582_pe788810_s5.jpg"
            }
        ]
      }) 
    }, 1500);
        }).then(data => {
            context.store.commit('setPosts', data.posts)
        })
  },
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