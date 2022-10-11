import React, {useState, useEffect} from 'react'
import {savedPosts} from "../posts.json";
import css from "./css/Content.module.css";
import PostItem from './ PostItem';
import Loader from './Loader';

function ContentHooks() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [fetchedPosts, setFetchedPosts] = useState([])

    useEffect(()=>{
        setTimeout(() => {
            setIsLoaded(true);
            setFetchedPosts(savedPosts);
        }, 2000)
    }, []);

    const HandleInput = (event) => {
        const name = event.target.value.toLowerCase()
        console.log(name)
        const filteredPosts = savedPosts.filter(posts => {
          return posts.name.toLowerCase().includes(name)
        })
        setFetchedPosts(filteredPosts)
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
                <h4>posts found:{fetchedPosts.length}</h4>
              </form>
          </div>
          <div className= {css.SearchResults}>
            {
              isLoaded ?
              <PostItem savedPosts={fetchedPosts} />
              : <Loader />
            }
          </div>
        </div>
      )
}

export default ContentHooks