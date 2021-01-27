import React from 'react'
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const PostCard = ({post: {body, createdAt, id, username, likeCount, commentCount, likes}}) => {

    const likePost = () => {
        console.log('Liked post!')
    }

    const commentPost = () => {
        console.log('comment post!')
    }

    return (
        <Card style={{backgroundColor: '#212121'}} fluid>
            <Card.Content>
                {/* <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                /> */}
                <Card.Header style={{color: 'white'}}>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`} style={{color: '#878787'}}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description style={{color: 'white'}}>{body}</Card.Description>
            </Card.Content>
        <Card.Content extra>
            <Button as='div' labelPosition='right' onClick={likePost}>
                <Button color='purple' basic>
                    <Icon name='heart' />
                </Button>
                    <Label as='a' color='purple' pointing='left'>
                            {likeCount}
                    </Label>
            </Button>

            <Button as='div' labelPosition='right' onClick={commentPost}>
                <Button color='teal' basic>
                    <Icon name='comments' />
                </Button>
                    <Label as='a' color='teal' pointing='left'>
                            {commentCount}
                    </Label>
            </Button>
        </Card.Content>
    </Card>
    )
}

export default PostCard
