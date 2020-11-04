import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './App.css';

const GET_PHOTOS = gql`
  {
    photos {
      id
      description
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

const Photo = ({ photo: { description,  urls: {regular}, user: {username, portfolio_url} } }) => (


  <React.Fragment>
    <div className="col-sm-6 col-md-4">
      <div className="thumbnail">
        <img src={regular} alt="Image" />
        <div className="caption">
          <h3>{description}</h3>
          <p>User: {username}</p>
          <p><a href={portfolio_url} className="btn btn-primary" role="button" target="_blank">Portfolio</a></p>
        </div>
      </div>
    </div>
  </React.Fragment>

)

const App = () => {
  const { loading, error, data } = useQuery(GET_PHOTOS);
  // console.log(data)

  if(loading) return (
    <h1>Loading...</h1>
  )

  if(error) return (
    <h1>Something Went Wrong...</h1>
  )

  return (
    <div className="container">
      <div className="row">
        <div className="jumbotron text-center">
          <h1>Photos</h1>
          <p><a className="btn btn-primary btn-lg" href="https://github.com/amitzed" target="_blank" role="button">Learn more</a></p>
        </div>
        {data.photos.map((photo, index) => (
          <Photo key={index} photo={photo} />
        ))}
      </div>
    </div>
  )
}

export default App;
