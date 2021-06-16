<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the lastest news!</h1>
    </section>
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
  .intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
  background-image: url('~assets/images/main-page-background.jpg');
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}
</style>