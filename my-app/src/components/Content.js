import React, { Component } from 'react';
import {savedPosts} from "../posts.json";
import css from "./css/Content.module.css";
import PostItem from './ PostItem';
import Loader from './Loader';

export class Content extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoaded: false,
      posts: []
    }
  }
  componentDidMount() {
    setTimeout(()=>{
        this.setState({
            isLoaded: true,
            posts: savedPosts
        })
    }, 2000)
  }
  HandleInput = (event) => {
    const name = event.target.value.toLowerCase()
    console.log(name)
    const filteredPosts = savedPosts.filter(posts => {
      return posts.name.toLowerCase().includes(name)
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
            <PostItem savedPosts={this.state.posts} />
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

export default Content