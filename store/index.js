import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store(
        {
            state: {
                loadedPosts: [],
                authToken: ''
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
                },
                setAuthToken(state, token) {
                   state.authToken = token
                }
            },
            actions: {
                nuxtServerInit(vuexContext, context) {
                    return context.app.$axios.get('posts.json')
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
                    return this.$axios.post('posts.json', newPost)
                    .then(res => {
                        vuexContext.commit('addPost', { ...newPost, id: res.data.name})
                    })
                    .catch(e => console.log(e))
                },
                editPost(vuexContext, editedPost) {
                    editedPost.lastUpdatedDate = new Date()
                    return this.$axios.put('posts/' + editedPost.id + '.json', editedPost)
                    .then(() => vuexContext.commit('editPost', editedPost))
                    .catch(e => console.log(e))
                },
                authenticateUser(vuexContext, userData) {
                    console.log('User Data:', userData)
                    const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
                    const signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
                    const authUrl = userData.isLogin ? loginUrl : signUpUrl
                    return this.$axios.post(authUrl + this.$config.FB_API_KEY,
                    {
                        email: userData.email,
                        password: userData.password,
                        returnSecureToken: true
                    }).then(res => {
                        vuexContext.commit('setAuthToken', res.data.idToken)
                    })
                }

            },
            getters: {
                loadedPosts(state) {
                    return state.loadedPosts
                },
                authToken(state) {
                    return state.authToken
                }
            }
            }
    )
}

export default createStore
