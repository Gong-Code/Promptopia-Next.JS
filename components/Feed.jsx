"use client";

import { useEffect, useState } from "react"

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return(
    <div className="mt-16 prompt_layout">
      { data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      )) }
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  }
  
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setSearchText(tag);

  }

  const getFilteredPosts = () => {
    if(selectedTag) {
      return posts.filter(post => post.tag === selectedTag);
    }
    else if (searchText) {
      return posts.filter(post => post.creator.username.includes(searchText) || post.tag.includes(searchText));
    } else {
      return posts;
    }
  }


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    if(searchText === '') {
      fetchPosts();
    }

  }, [searchText]) 
  
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={getFilteredPosts()}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed