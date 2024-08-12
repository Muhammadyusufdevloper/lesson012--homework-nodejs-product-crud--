import { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';

const EditBlogModal = ({ visible, onClose, onSave, blogData }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        author: '',
        views: 0,
        likes: 0,
    });

    useEffect(() => {
        if (blogData) {
            setFormData(blogData);
        }
    }, [blogData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Modal
            title="Edit Blog"
            visible={visible}
            onOk={handleSave}
            onCancel={onClose}
            okText="Save"
            cancelText="Cancel"
        >
            <div className="flex flex-col gap-4">
                <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Blog Title"
                />
                <Input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Blog Description"
                />
                <Input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                />
                <Input
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author"
                />
                <Input
                    name="views"
                    type="number"
                    value={formData.views}
                    onChange={handleChange}
                    placeholder="Views"
                />
                <Input
                    name="likes"
                    type="number"
                    value={formData.likes}
                    onChange={handleChange}
                    placeholder="Likes"
                />
            </div>
        </Modal>
    );
};

export default EditBlogModal;
