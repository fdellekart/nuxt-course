<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :post="loadedPost" @submit="onSubmitted($event)"/>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
    layout: 'admin',
    components: {
        AdminPostForm
    },
    asyncData(context) {
        return axios.get('https://flo-blog-default-rtdb.europe-west1.firebasedatabase.app/posts/' + context.params.postId + '.json')
            .then(res => {
                return {
                    loadedPost: res.data
                }
            })
            .catch(e => context.error(e))
    },
    methods: {
        onSubmitted(postData) {
            axios.put('https://flo-blog-default-rtdb.europe-west1.firebasedatabase.app/posts/' + this.$route.params.postId + '.json', postData)
            .then(res => console.log(res))
            .catch(e => console.log(e))
            this.$router.push('/admin')
        }
    }

}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
