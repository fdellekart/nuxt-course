<template>
    <div class="posts_page">
    <section class="posts-list">
      <post-preview-tile
        id="1"
        title="Flotschi"
        previewText="A Fescha Kerl!"
        thumbnail="../flo.jpg"
      />
      <post-preview-tile
        id="2"
        title="Julchen"
        previewText="A Fesches Mädl!"
        thumbnail="../jules.jpg"
      />
    </section>
    </div>
</template>

<script>
import PostPreviewTile from '@/components/posts/PostPreviewTile'

export default {
    components: {
        PostPreviewTile
    }
}
</script>

<style scoped>
    .posts_page {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .posts-list {
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
</style>