import { createStore, action, thunk, computed } from "easy-peasy";
import api from './api/posts'

export default createStore({
    //Configurate all state
    posts: [],
    setPosts : action((state, payload) => {
        state.posts = payload
    }),
    
    data: [],
    setData : action((state, payload) => {
        state.data = payload
    }),

    search: "",
    setSearch : action((state, payload) => {
        state.search = payload
    }),

    postTitle: '',
    setPostTitle : action((state, payload) => {
        state.postTitle = payload
    }),
    
    postBody: '',
    setPostBody : action((state, payload) => {
        state.postBody = payload
    }),

    editTitle: '',
    setEditTitle : action((state, payload) => {
        state.editTitle = payload
    }),
    
    editPostBody: '',
    setEditPostBody : action((state, payload) => {
        state.editPostBody = payload
    }),
    
    searchResult: [],
    setSearchResult : action((state, payload) => {
        state.searchResult = payload
    }),
    
    fetchError: null,
    setFetchError : action((state, payload) => {
        state.fetchError = payload
    }),
    
    isLoading: false,
    setIsLoading : action((state, payload) => {
        state.isLoading = payload
    }),

    //Configurate computed
    postCount : computed((state) => state.posts.length),
    getPostById: computed((state) => {
        return (id) => state.posts.find(item => (item.id).toString() === id)
    }),

    // configurate thunk
    savePost : thunk (async (actions, newPost, helpers) => {
        const {posts} = helpers.getState()
        try {
            const response = await api.post('/posts', newPost)
            if (response && response.data) actions.setPosts([...posts, newPost])
            actions.setPostBody('')
            actions.setPostTitle('')
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }),

    deletePost: thunk(async (actions, id, helpers) => {
        const {posts} = helpers.getState()
        try {
            await api.delete(`/posts/${id}`)
            const newPosts = posts.filter(item => (item.id !== id))
            actions.setPosts(newPosts)
            } catch (error) {
            console.log(`Error: ${error.message}`);
            }
    }),

    editPost: thunk (async (actions, updatePost, helpers) => {
        const {posts} = helpers.getState()
        const {id} = updatePost
        try {
            const response = await api.put(`/posts/${id}`, updatePost)
            if (response && response.data) actions.setPosts(posts.map(post => post.id === id ? {...response.data}:post))
            actions.setEditPostBody('')
            actions.setEditTitle('')
            } catch (error) {
            console.log(`Error: ${error.message}`);
            }
    })
})