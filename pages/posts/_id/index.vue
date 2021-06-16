<template>
    <div class="single-post-page container">
        <section class="post">
            <h1 class="post-title">{{ post.title }}</h1>
            <div class="post-details">
                <div class="post-detail">Last Updated on: {{ post.lastUpdatedDate }}</div>
                <div class="post-detail">Written By: {{ post.author }}</div>
            </div>
            <p>{{ post.content }}</p>
        </section>
        <section class="post-feedback">
            <p>Let me know what you think about my post per <a href="mailto:flo@blog.com">Mail</a></p>
        </section>
    </div>
</template>

<script>
export default {
    asyncData(context, callback) {
        setTimeout(() => {
            callback(null, {
                post: {
                id: "1",
                title: "A Post! (ID: " + context.params.id + ")",
                previewText: "A guada!",
                author: "Flo",
                lastUpdatedDate: new Date(),
                content: "Some content for the post",
                thumbnail: "https://www.ikea.com/mx/en/images/products/pjaetteryd-picture-trolltunga-norway__0925582_pe788810_s5.jpg"
            }
            })
        },
        1000)
    }
}
</script>

<style scoped>
    .single-post-page {
    padding: 30px;
    text-align: center;
    box-sizing: border-box;
    }

    .post {
    width: 100%;
    }

    @media (min-width: 768px) {
    .post {
        width: 600px;
        margin: auto;
    }
    }

    .post-title {
    margin: 0;
    }

    .post-details {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 3px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    }

    @media (min-width: 768px) {
    .post-details {
        flex-direction: row;
    }
    }

    .post-detail {
    color: rgb(88, 88, 88);
    margin: 0 10px;
    }

    .post-feedback a {
    color: red;
    text-decoration: none;
    }

    .post-feedback a:hover,
    .post-feedback a:active {
    color: salmon;
    }
</style>