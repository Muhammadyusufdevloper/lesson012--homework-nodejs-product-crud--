import React, { useEffect, useState } from 'react';
import { Button, Input, Select } from 'antd';
import { useCreateBlogMutation } from '../../context/api/blogsApi';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateBlog = () => {
    const [createBlog, { isSuccess }] = useCreateBlogMutation()
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: '',
        author: '',
        views: 0,
        likes: 0,
    });
    let navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            navigate('/blogs')
        }
    }, [isSuccess])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleCategoryChange = (value) => {
        setForm({ ...form, category: value });
    };

    const handleSubmit = () => {
        createBlog(form)
        console.log('Form data:', form);
    };

    return (
        <div className="max-w-xl  p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Blog</h2>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <Input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter blog title"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <Input.TextArea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Enter blog description"
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <Select
                    value={form.category}
                    onChange={handleCategoryChange}
                    className="w-full"
                    placeholder="Select category"
                >
                    <Option value="Web Development">Web Development</Option>
                    <Option value="UI/UX Design">UI/UX Design</Option>
                    <Option value="Data Science">Data Science</Option>
                </Select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Author</label>
                <Input
                    type="text"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Enter author name"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex gap-4 mb-6">
                <div className="w-1/2">
                    <label className="block text-gray-700 mb-2">Views</label>
                    <Input
                        type="number"
                        name="views"
                        value={form.views}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="w-1/2">
                    <label className="block text-gray-700 mb-2">Likes</label>
                    <Input
                        type="number"
                        name="likes"
                        value={form.likes}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <Button
                type="primary"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
                onClick={handleSubmit}
            >
                Create Blog
            </Button>
        </div>
    );
};

export default CreateBlog;
