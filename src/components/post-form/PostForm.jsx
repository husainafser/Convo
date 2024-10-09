import React,{useCallback} from 'react'
import { useForm } from 'react-hook-form'
import {Button,Input,Select,RTE} from "../index";
import service from '../../config/configAppwrite';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { fetchPostFailure, fetchPostStart, fetchPostSuccess } from '../../store/postSlice';

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loader} = useSelector((state) => state.posts);
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        // console.log(data)
        if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

            if (file) {
                // console.log(post.image);
                // console.log(file);
                service.deleteFile(post.image);
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                image: file ? file.$id : undefined,
            });

            if (dbPost) {
                
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await service.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.image = fileId;
                // console.log(data);
                try {
                    dispatch(fetchPostStart());
                    console.log(userData);
                    const dbPost = await service.createPost({ ...data, userId: userData.$id });
                if (dbPost) {
                    dispatch(fetchPostSuccess(dbPost));
                    toast.success('Your post added !');
                    navigate(`/post/${dbPost.$id}`);
                }
                } catch (error) {
                    dispatch(fetchPostFailure(error.message));
                    console.log(error.message);
                    toast.error('Something went wrong !');
                }
                
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <ToastContainer/>
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.image)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full" disabled = {loader}>
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}