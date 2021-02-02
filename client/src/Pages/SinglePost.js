import React, { useContext } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { Card, CardContent, Grid, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment'

import { AuthContext } from '../Context/auth'
import LikeButton from '../Components/LikeButton';
import DeleteButton from '../Components/DeleteButton';

const SinglePost = (props) => {
    
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext)
    console.log(postId)

    const { data: {getPost} = {}} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    const deleteButtonCallback = () => {
        props.history.push('/')
    }

    let postMarkup;
    if(!getPost){
        postMarkup = <p>Loading post...</p>
    } else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount} = getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <CardContent>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </CardContent>
                            <hr/>
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likeCount, likes }} />
                                <Button as='div' labelPosition='right' onClick={console.log('comment')}>
                                    <Button basic color="teal">
                                        <Icon name="comments" />
                                    </Button>
                                    <Label basic color="teal" pointing="left">
                                        {commentCount}
                                    </Label>
                                </Button>
                                {user && user.username === username && <DeleteButton postId={id} callback={deleteButtonCallback}/>}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return postMarkup;
}

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id body createdAt username likeCount
            likes{
                username
            }
            commentCount
            comments{
                id username createdAt body
            }
        }
    }
`

export default SinglePost
