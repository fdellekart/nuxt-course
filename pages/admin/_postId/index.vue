<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :post="loadedPost"/>
        </section>
    </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
    components: {
        AdminPostForm
    },
    data() {
        return {
            author: "Flo",
            title: "Awesome toast",
            content: "Some stufftuff",
            thumbnailLink: "../flo.jpg"
        }
    }
}
</script>
