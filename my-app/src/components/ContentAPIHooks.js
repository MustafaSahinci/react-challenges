import React, {useState, useEffect} from 'react'
import css from "./css/Content.module.css";
import PostItemAPI from './PostItemAPI';
import Loader from './Loader';
import axios from 'axios';
import API_KEY from '../secrets';

function ContentAPIHooks() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [posts, setPosts] = useState([])
    const [savedPosts, setSavedPosts] = useState([])

    useEffect(() => {
        fetchImages()
    }, [])

    const fetchImages = async () => {
        const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&per_page=100`);
        const fetchedPosts = response.data.hits;
        console.log(response)
        setIsLoaded(true)
        setPosts(fetchedPosts)
        setSavedPosts(fetchedPosts)
    }

    const HandleInput = (event) => {
        const name = event.target.value.toLowerCase()
        console.log(name)
        const filteredPosts = savedPosts.filter(posts => {
          return posts.user.toLowerCase().includes(name)
        })
        setPosts(filteredPosts)
      }

    return (
        <div className= {css.Content}>
          <div className= {css.TitleBar}>
              <h1>My Photos</h1>
              <form>
                <label htmlFor='searchInput'>Search</label>
                <input onChange={(event) => HandleInput(event)}
                       type="search" 
                       id= "searchInput" 
                       placeholder="By Author" />
                <h4>posts found:{posts.length}</h4>
              </form>
          </div>
          <div className= {css.SearchResults}>
            {
              isLoaded ?
              <PostItemAPI savedPosts={posts} />
              : <Loader />
            }
          </div>
        </div>
      )
}

export default ContentAPIHooks