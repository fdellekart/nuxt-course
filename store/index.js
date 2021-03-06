import Vuex from 'vuex'
import Vue from 'vue'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store(
        {
            state: {
                loadedPosts: [],
                authToken: null
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
                },
                clearAuthToken(state) {
                    state.authToken = null
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
                    return this.$axios.post('posts.json?auth=' + vuexContext.state.authToken, newPost)
                    .then(res => {
                        vuexContext.commit('addPost', { ...newPost, id: res.data.name})
                    })
                    .catch(e => console.log(e))
                },
                editPost(vuexContext, editedPost) {
                    editedPost.lastUpdatedDate = new Date()
                    return this.$axios.put('posts/' + editedPost.id + '.json?auth=' + vuexContext.state.authToken, editedPost)
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
                        localStorage.setItem('authToken', res.data.idToken)
                        Cookie.set('jwt', res.data.idToken)
                        localStorage.setItem('authTokenExpiresIn', new Date().getTime() + +res.data.expiresIn * 1000)
                        Cookie.set('expirationDate', new Date().getTime() + +res.data.expiresIn * 1000)
                    })
                },
                clearAuthToken(vuexContext) {
                    if (process.client) {
                        localStorage.removeItem('authToken')
                        localStorage.removeItem('authTokenExpiresIn')
                    }
                    Cookie.remove('jwt')
                    Cookie.remove('expirationDate')
                    vuexContext.commit('clearAuthToken')
                },
                initAuth(vuexContext, req) {
                    let token
                    let expirationDate
                    if (req) {
                        if (!req.headers.cookie) {
                            return
                        }
                        const jwtCookie = req.headers.cookie
                            .split(';')
                            .find(c => c.trim().startsWith('jwt='))
                        if (!jwtCookie) {
                            return
                        }
                        token = jwtCookie.split('=')[1]
                        const expirationCookie = req.headers.cookie
                            .split(';')
                            .find(c => c.trim().startsWith('expirationDate='))
                        expirationDate = expirationCookie.split('=')[1]
                    } else {
                        token = localStorage.getItem('authToken')
                        if (!token) {
                            return
                        }
                        expirationDate = localStorage.getItem('authTokenExpiresIn')
                    }

                    if (new Date().getTime() > +expirationDate || !token){
                        vuexContext.dispatch('clearAuthToken')
                        return
                    }
                    vuexContext.commit('setAuthToken', token)
                }

            },
            getters: {
                loadedPosts(state) {
                    return state.loadedPosts
                },
                authToken(state) {
                    return state.authToken
                },
                isAuthenticated(state) {
                    return state.authToken != null
                }
            }
            }
    )
}

export default createStore
