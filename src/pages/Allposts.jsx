import React, { useState, useEffect } from 'react'
import { PostCard as PostCardComponent, Container } from '../Components/Index'
import DatabaseService from '../Appwrite/Database_Service'
function Allposts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        DatabaseService.GetPosts([]).then((post) => {
            if (post) {
                setPosts(post.documents)
            }
        })
    }, [])
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div>
                            <PostCardComponent key={post.$id} post={post} className='py-2 w-1/4'></PostCardComponent>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Allposts
