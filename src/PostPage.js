import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {useNavigate } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'

const PostPage = () => {
  const getPostById = useStoreState((state) => state.getPostById)
  const deletePost = useStoreActions((actions) => actions.deletePost)
  const navigate = useNavigate()


  const handleDelete = (id) => {
    deletePost(id)
    navigate('/')
  }
  
  const {id} = useParams()
  const post = getPostById(id)

  return (
    <main className='PostPage'>
        <article className='post'>
            {post && 
              <>
                  <h2>{post.title}</h2> 
                  <p className='PostDate'>{post.datetime}</p>
                  <p className='PostBody'>{post.body}</p>
                  <button className='deleButton' onClick={() => handleDelete(post.id)}>
                    Delete Post
                  </button>
                    <Link to={`/edit/${id}`}>
                      <button className='editButton'>
                          Edit Post
                      </button>
                    </Link>
              </>
            }

            {!post && 
              <>
                  <h2>Post Not Found</h2> 
                  <p>Well, that's dissapointing</p>
                  <p>
                    <Link to='/'>Visit our Home Page</Link>
                  </p>
              </>
            }
        </article>
    </main>
  )
}

export default PostPage