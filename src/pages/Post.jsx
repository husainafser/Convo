import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../config/configAppwrite";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    // console.log(userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    // console.log(isAuthor);
    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.image);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className=" flex justify-center ">
                    <div className="w-1/2">
                    <img
                        src={service.getFilePreview(post.image)}
                        alt={post.title}
                        className="rounded-xl w-25"
                    />
                    </div>
                    <div className="w-1/2 p-5">
                    {isAuthor && (
                        <div className="float-end">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-left capitalize ">{post.title}</h1>
                </div>
                <div className="browser-css text-left">
                    {parse(post.content)}
                    </div>
                    </div>
                    

                    
                    </div>
            </Container>
            
        </div>
    ) : null;
}