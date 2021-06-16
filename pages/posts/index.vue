<template>
    <div class="posts_page">
    <PostList
        :posts="posts"
    />
    </div>
</template>

<script>
import PostList from '@/components/posts/PostList'

export default {
    components: {
        PostList
    },
    asyncData(context, callback) {
        console.log(context)
        setTimeout(() => {
        callback(null, {
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
    }, 1500)
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