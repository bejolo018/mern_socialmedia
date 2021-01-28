import React, { useContext } from 'react'
import { Grid, Transition } from 'semantic-ui-react'
import { useQuery } from '@apollo/client';

import { AuthContext } from '../Context/auth'
import PostCard from '../Components/PostCard'
import PostForm from '../Components/PostForm'
import { FETCH_POSTS_QUERY } from '../util/graphql'

const Home = () => {
    const { user } = useContext(AuthContext)

    const { loading, data: {getPosts: posts} = {} } = useQuery(FETCH_POSTS_QUERY)

    return (
        <Grid columns={3}>
          <Grid.Row className="page-title">
            <h1 style={{color: 'white'}}>Recent Posts</h1>
          </Grid.Row>
          <Grid.Row>
            {user && (
              <Grid.Column>
                <PostForm />
              </Grid.Column>
            )}
            {loading ? (
              <h1>loading posts...</h1>
            ) : (
              <Transition.Group>
              {posts && posts.map(post =>(
                <Grid.Column key={post.id} style={{marginBottom: '20px'}}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
              </Transition.Group>
            )}
          </Grid.Row>
        </Grid>
      )
}

export default Home
