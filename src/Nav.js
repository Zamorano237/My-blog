import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

const Nav = () => {
  const search = useStoreState((state) => state.search)
  const posts = useStoreState((state) => state.posts)
  const setSearch = useStoreActions((actions) => actions.setSearch)
  const setSearchResult = useStoreActions((actions) => actions.setSearchResult)


  useEffect((() => {
    const filteredResult = posts.filter(item => (item.title).toLowerCase().includes(search.toLowerCase())) ||
    posts.filter(item => (item.body).toLowerCase().includes(search.toLowerCase()))
    setSearchResult(filteredResult.reverse())
}), [posts, search, setSearchResult])

  return (
    <nav className='Nav'>
        <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">Search Post</label>
            <input 
                type="text" 
                id="search" 
                placeholder='Search posts' 
                value = {search}
                onChange = {(e) => setSearch(e.target.value)}
            />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="post">Post</Link></li>
                <li><Link to="about">About</Link></li>
            </ul>
        </form>
    </nav>
  )
}

export default Nav