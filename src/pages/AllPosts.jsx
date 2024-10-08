import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import service from '../config/configAppwrite';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';


function AllPosts() {
    // const [posts, setPosts] = useState([])
    const {posts} = useSelector((state)=>state.posts);

    // useEffect(() => {
        // service.getPosts([]).then((posts) => {
        //     if (posts) {
                
        //         setPosts(posts.documents)
        //     }else{
        //     toast.error("Something went wrong !", {
        //                         position: "top-right"
        //                       });
        //     }
        // })
    // }, [])
    
    
  return (
    <div className='w-full py-8'>
                    <ToastContainer />

        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts