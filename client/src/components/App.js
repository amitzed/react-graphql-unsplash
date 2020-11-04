import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './App.css';

const GET_PHOTOS = gql`
  {
    photos {
      id
      title
      urls {
        regular
      }
      user {
        username
        portfolio_url
      }
    }
  }
`;

const Photo = ({ photo: { title,  urls: {regular}, user: {username, portfolio_url} } }) => (
  <div>
    <img src={regular} alt="Image" />
    <h4>{username}</h4>
    <a href={portfolio_url}>Portfolio</a>
  </div>
)

const App = () => {
  const { loading, error, data } = useQuery(GET_PHOTOS);
  // console.log(data)

  if(loading) return (
    <h1>Loading...</h1>
  )

  if(error) return (
    <h1>Something Went Wrong</h1>
  )

  return (
    <div>
      <h1>Photos</h1>
      {data.photos.map((photo, index) => (
        <Photo key={index} photo={photo} />
      ))}
    </div>
  )
}

export default App;
