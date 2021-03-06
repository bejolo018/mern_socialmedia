import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Label } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

const LikeButton = ({user, post: {id, likeCount, likes}}) => {
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true)
        } else setLiked(false)
    }, [])

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id}
    })

    const likeButton = user ? (
        liked ? (
                <Button color='purple' basic>
                    <Icon name='heart' />
                </Button>
        ) : (
                <Button color='purple' basic>
                    <Icon name='heart' />
                </Button>
        )
    ) : (
        <Button as={Link} to={"/login"} color='purple' basic>
            <Icon name='heart' />
        </Button>
    )

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
                {likeButton}
                    <Label color='purple' pointing='left'>
                            {likeCount}
                    </Label>
            </Button>
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id username
            }
            likeCount
        }
    }
`

export default LikeButton