import React from 'react'
import Post from './Post'
import { useStoreState } from 'easy-peasy'


const Home = () => {
  const searchResult = useStoreState((state) => state.searchResult)
  const fetchError = useStoreState((state) => state.fetchError)
  const isLoading = useStoreState((state) => state.isLoading)

  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading Posts ...</p>}
      {!isLoading && fetchError && <p className='statusMsg'>{fetchError}</p>}
      {!isLoading && !fetchError && (searchResult.length ? searchResult.map(post => (
          <Post key={post.id} post = {post}/>
        )): <p>No post to display</p>) }
    </main>
  )
}

export default Home