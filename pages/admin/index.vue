<template>
    <div class="admin-page">
        <section class="new-post">
            <AppButton @click="$router.push('/admin/new-post')">Create Post</AppButton>
        </section>
        <section class="existing-posts">
            <h1>Existing posts</h1>
            <PostList :posts="posts" :is-admin="true"/>
        </section>
    </div>
</template>

<script>
import PostList from '@/components/posts/PostList'
import AppButton from '@/components/UI/AppButton'

export default {
    components: {
        PostList,
        AppButton
    },
    data() {
      return {
        posts: [
        {
          id: 1,
          title: "A Post!",
          previewText: "A guada!",
          thumbnail: "https://www.ikea.com/mx/en/images/products/pjaetteryd-picture-trolltunga-norway__0925582_pe788810_s5.jpg"
        },
        {
          id: 2,
          title: "A aundara Post!",
          previewText: "A Bessana!",
          thumbnail: "https://www.ikea.com/mx/en/images/products/pjaetteryd-picture-trolltunga-norway__0925582_pe788810_s5.jpg"
        }
      ]
      }
    }
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>
