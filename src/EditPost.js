import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect} from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

const EditPost = () => {
  const editTitle = useStoreState((state) => state.editTitle)
  const editPostBody = useStoreState((state) => state.editPostBody)
  const getPostById = useStoreState((state) => state.getPostById)
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle)
  const editPost = useStoreActions((actions) => actions.editPost)
  const setEditPostBody = useStoreActions((actions) => actions.setEditPostBody)

  const navigate = useNavigate()


  
  const handleEdit = (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatePost = {id, title : editTitle, datetime, body : editPostBody} 
    editPost(updatePost)
    navigate(`/post/${id}`)
}
  const {id} = useParams()
    const post = getPostById(id)

    useEffect(() => {
        if(post){
          setEditTitle(post.title)
          setEditPostBody(post.body)
        }
    }, [post, setEditTitle, setEditPostBody])

  return (
    <main className='NewPost'>
        {editTitle && 
            <>
            <h1>Edit Post</h1>
            <form className="newPostForm"  onSubmit={(e) => e.preventDefault()}> 
            <label htmlFor="postTitle">Title:</label>
            <input 
                type="text" 
                id="postTitle"
                required 
                value ={editTitle}
                onChange ={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea  
                id="postBody"
                required
                value={editPostBody}
                onChange ={(e) => setEditPostBody(e.target.value)}
            />
            <button type="button" onClick={() => handleEdit(post.id)}>Edit Post</button>
            </form>
        </>
        }

        {!editTitle && 
            <>
            <h2>Post Not Found</h2> 
            <p>Well, that's dissapointing</p>
            <p>
              <Link to='/'>Visit our Home Page</Link>
            </p>
        </>
        }
    </main>
  )
}

export default EditPost