import React, { useContext} from 'react'
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { AuthContext } from '../Context/auth'
import LikeButton from './LikeButton'

const PostCard = ({post: {body, createdAt, id, username, likeCount, commentCount, likes}}) => {

    const { user } = useContext(AuthContext)

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
            <LikeButton user={user} post={{ id, likes, likeCount }} />

            <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                <Button color='teal' basic>
                    <Icon name='comments' />
                </Button>
                    <Label color='teal' pointing='left'>
                            {commentCount}
                    </Label>
            </Button>
            {user && user.username === username && (
                <Button as="div" color="red" floated="right" onClick={() => console.log('Delete Post')}>
                    <Icon name="trash" style={{margin: 0}} />
                </Button>
            )}
        </Card.Content>
    </Card>
    )
}

export default PostCard
