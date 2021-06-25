import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store(
        {
            state: {
                loadedPosts: []
            },
            mutations: {
                setPosts(state, posts) {
                    state.loadedPosts = posts
                },
                addPost(state, post) {
                    state.loadedPosts.push(post)
                },
                editPost(state, editedPost) {
                    const postIndex = state.loadedPosts.findIndex(post => post.id == editedPost.id)
                    this._vm.$set(state.loadedPosts, postIndex, editedPost)
                }
            },
            actions: {
                nuxtServerInit(vuexContext, context) {
                    return axios.get(process.env.baseUrl + 'posts.json')
                        .then(response => {
                            let postsArray = []
                            for (let key in response.data) {
                                postsArray.push({...response.data[key], id:key})
                            }
                            vuexContext.commit('setPosts', postsArray)
                        })
                        .catch(e => console.log(e))
                },
                setPosts(vuexContext, posts) {
                    vuexContext.commit('setPosts', posts)
                },
                addPost(vuexContext, post) {
                    const newPost = { ...post, lastUpdatedDate: new Date()}
                    return axios.post(process.env.baseUrl + 'posts.json', newPost)
                    .then(res => {
                        vuexContext.commit('addPost', { ...newPost, id: res.data.name})
                    })
                    .catch(e => console.log(e))
                },
                editPost(vuexContext, editedPost) {
                    editedPost.lastUpdatedDate = new Date()
                    return axios.put(process.env.baseUrl + 'posts/' + editedPost.id + '.json', editedPost)
                    .then(() => vuexContext.commit('editPost', editedPost))
                    .catch(e => console.log(e))
                }

            },
            getters: {
                loadedPosts(state) {
                    return state.loadedPosts
                }
            }
            }
    )
}

export default createStore
