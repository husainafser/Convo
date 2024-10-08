import React, {useEffect, useState} from 'react'
import service from '../config/configAppwrite';
import {Container, PostCard} from '../components'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostStart,fetchPostSuccess,fetchPostFailure } from '../store/postSlice';


function Home() {
    // const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const {posts=[],loading,error} = useSelector((state)=>state.posts);
    useEffect(() => {
        if (posts.length === 0) {
            const fetchPosts = async () => {
                try {
                    dispatch(fetchPostStart());
                    const response = await service.getPosts();
                    dispatch(fetchPostSuccess(response.documents));
                } catch (err) {
                    dispatch(fetchPostFailure(err.message));
                    toast.error("Failed to load posts");
                }
            };
            fetchPosts();
    }
    }, [dispatch,posts.length])

    if (loading) {
        return (
            
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Loading...
                            </h1>
                        </div>
                    </div>
                </Container>
                <ToastContainer/>
            </div>
        )
    }
  
    if (error ||posts.length === 0) {
        return (
            
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Could't find any posts !
                            </h1>
                        </div>
                    </div>
                </Container>
                <ToastContainer/>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
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

export default Home