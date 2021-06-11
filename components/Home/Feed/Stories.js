import React from 'react'
import StoryCard from './StoryCard'
const Stories = () => {
  const stories = [
    {
      name: 'Bill',
      src: 'https://links.papareact.com/xql',
      profile: 'https://links.papareact.com/snf'
    },
    {
      name: 'Kate',
      src: 'https://links.papareact.com/xql',
      profile: 'https://links.papareact.com/snf'
    },
    {
      name: 'Billy',
      src: 'https://links.papareact.com/xql',
      profile: 'https://links.papareact.com/snf'
    },
  ]
  return (
    <div>
      <div className="flex mx-auto space-x-3 justify-center">
      {stories.map(story =>(
          <StoryCard key={story.name} name={story.name} src={story.src} profile={story.profile}/>
          ))
      }
      </div>

    </div>
  )
}

export default Stories
