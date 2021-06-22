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
                } 
            },
            actions: {
                nuxtServerInit(vuexContext, context) {
                    return axios.get('https://flo-blog-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
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
