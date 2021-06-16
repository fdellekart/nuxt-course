import Vuex from 'vuex'

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
                    return new Promise((resolve, reject) => { 
                        vuexContext.commit('setPosts', 
                        [
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
                        ])
                        resolve() 
                })
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
