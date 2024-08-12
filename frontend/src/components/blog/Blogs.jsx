import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import female from "../../assets/female.webp";
import Pagination from '@mui/material/Pagination';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoHeartCircleSharp } from "react-icons/io5";
import { useDeleteBlogMutation, useGetBlogsQuery, useUpdateBlogMutation } from '../../context/api/blogsApi';
import { Button, Modal } from 'antd';
import EditBlogModal from '../edit-modal/BlogEditModal';
import { useGetProfileQuery } from '../../context/api/userApi';

const limit = 2;

const Blogs = () => {
    const { data: profileData } = useGetProfileQuery();
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useGetBlogsQuery({ page, limit });
    const [deleteBlog] = useDeleteBlogMutation();
    const [totalPages, setTotalPages] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [editBlog, { isSuccess }] = useUpdateBlogMutation();
    console.log(profileData);

    useEffect(() => {
        if (data?.totalCount) {
            setTotalPages(Math.max(1, Math.ceil(data.totalCount / limit)));
        }
    }, [data]);

    useEffect(() => {
        if (isSuccess) {
            setIsEditModalOpen(false);
        }
    }, [isSuccess]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const showDeleteModal = (blogId) => {
        setSelectedBlogId(blogId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteOk = async () => {
        await deleteBlog(selectedBlogId);
        setIsDeleteModalOpen(false);
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
    };

    const showEditModal = (blog) => {
        setSelectedBlog(blog);
        setIsEditModalOpen(true);
    };

    const handleEditSave = async (updatedBlog) => {
        await editBlog({ id: selectedBlog._id, body: updatedBlog });
    };

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading blogs.</p>;

    return (
        <section>
            <div className="px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl mt-5 font-extrabold tracking-tight text-gray-900 sm:text-2xl md:text-3xl">Blogs</h1>
                    {
                        profileData?.payload?.role === 'owner' ?
                            <Button
                                type="primary"
                                onClick={() => showEditModal(null)}
                            >
                                Create Blog
                            </Button>
                            : <></>
                    }
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {data?.payload?.length ? (
                        data.payload.map((blog) => (
                            <div key={blog._id} className="flex items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex w-60 h-60 items-center justify-center p-4 overflow-hidden">
                                    <img className="w-full h-full" src={female} alt={`${blog.title}`} />
                                </div>
                                <div className='flex flex-row justify-between flex-grow'>
                                    <div className="p-4">
                                        <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h3>
                                        <p className="mb-1 text-base font-bold tracking-tight text-gray-900 dark:text-gray-400">{blog.description}</p>
                                        <p className="mb-1 text-base font-bold tracking-tight text-gray-900 dark:text-gray-400">{blog.category}</p>
                                        <p className="mb-1 text-base font-bold tracking-tight text-gray-900 dark:text-gray-400">{blog.author}</p>
                                        <p className="mb-1 text-base font-bold tracking-tight text-gray-900 dark:text-gray-400 flex items-center gap-2"><MdOutlineRemoveRedEye /> {blog.views}</p>
                                        <p className="mb-5 text-base font-bold tracking-tight text-gray-900 dark:text-gray-400 flex items-center gap-2"><IoHeartCircleSharp /> {blog.likes}</p>
                                        {
                                            profileData?.payload?.role === 'owner' ?
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        className="text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                        onClick={() => showDeleteModal(blog._id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                    <Button onClick={() => showEditModal(blog)} className="text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Edit
                                                    </Button>
                                                </div>
                                                :
                                                <></>
                                        }
                                    </div>
                                    <div className="p-4">
                                        <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.userId?.fname}</h3>
                                        <p className="mb-1 text-base font-bold tracking-tight text-gray-900 dark:text-gray-400">{blog.userId?.username}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No blogs found.</p>
                    )}
                </div>
                <div className="flex justify-center mt-3">
                    <Pagination count={totalPages} page={page} onChange={handleChange} />
                </div>
            </div>

            <Modal
                title="Delete Blog"
                open={isDeleteModalOpen}
                onOk={handleDeleteOk}
                onCancel={handleDeleteCancel}
                okText="Yes, Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this blog?</p>
            </Modal>

            <EditBlogModal
                visible={isEditModalOpen}
                onClose={handleEditCancel}
                onSave={handleEditSave}
                blogData={selectedBlog}
            />
        </section>
    );
};

Blogs.propTypes = {
    profileData: PropTypes.object.isRequired,
};

export default Blogs;
