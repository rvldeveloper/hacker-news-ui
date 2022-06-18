import React from 'react';
import logo from './logo.svg';
import './App.css';
import Top10RandomStories from './content/Top10RandomStories';
import StoryCard from './components/StoryCard';
import PageFrame from './components/PageFrame';

function App() {
  return (
    <PageFrame>
      <StoryCard/>
      <StoryCard/>
      <StoryCard/>
      <StoryCard/>
    </PageFrame>
  );
}

export default App;
