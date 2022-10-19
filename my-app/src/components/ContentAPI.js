import React, { Component } from 'react';
import css from "./css/Content.module.css";
import PostItemAPI from './PostItemAPI';
import Loader from './Loader';
import axios from "axios"
import API_KEY from '../secrets';

export class ContentAPI extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoaded: false,
      posts: [],
      savedPosts: []
    }
  }
  componentDidMount() {
    this.fetchImages();
  }
  async fetchImages() {
    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&per_page=100`);
    const fetchedPosts = response.data.hits;
    console.log(response)
    this.setState({
        isLoaded: true,
        posts: fetchedPosts,
        savedPosts: fetchedPosts
    })
  }
  HandleInput = (event) => {
    const name = event.target.value.toLowerCase()
    console.log(name)
    const filteredPosts = this.state.savedPosts.filter(posts => {
      return posts.user.toLowerCase().includes(name)
    })
    this.setState({
      posts: filteredPosts
    })
  }
  render() {
    return (
      <div className= {css.Content}>
        <div className= {css.TitleBar}>
            <h1>My Photos</h1>
            <form>
              <label htmlFor='searchInput'>Search</label>
              <input onChange={(event) => this.HandleInput(event)}
                     type="search" 
                     id= "searchInput" 
                     placeholder="By Author" />
              <h4>posts found:{this.state.posts.length}</h4>
            </form>
        </div>
        <div className= {css.SearchResults}>
          {
            this.state.isLoaded ?
            <PostItemAPI savedPosts={this.state.posts} />
            : <Loader />
          }
        </div>
        {/* <div>
        {savedPosts.map(post => {
            return (
                <div key={post.title} className= {css.SearchItem}>
                    <p>{post.title}</p>
                    <p>{post.name}</p>
                    <img src={post.image} alt="random" />
                    <p>{post.description}</p>
                </div>
            )
        })}
        </div> */}
      </div>
    )
  }
}

export default ContentAPI