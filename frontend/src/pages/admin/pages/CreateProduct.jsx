import { useEffect, useState } from 'react';
import { useCreateProductMutation } from '../../../context/api/productsApi';
import { useNavigate } from 'react-router-dom';

const initialState = {
    title: '',
    description: '',
    images: [],
    price: '',
    oldPrice: '',
    category: '',
    stock: '',
}

const CreateProduct = () => {
    const [productData, setProductData] = useState(initialState);
    const [createProduct, { isSuccess }] = useCreateProductMutation();
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'images') {
            setProductData({
                ...productData,
                [name]: Array.from(files),
            });
        } else {
            setProductData({
                ...productData,
                [name]: value,
            });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setProductData(initialState);
            navigate('/admin/product')
        }
    }, [isSuccess]);

    const handleCreate = (e) => {
        e.preventDefault();
        const form = new FormData();

        form.append("title", productData.title);
        form.append("price", +productData.price);
        form.append("oldPrice", +productData.oldPrice);
        form.append("category", productData.category);
        form.append("stock", productData.stock);
        form.append("description", productData.description);
        form.append("info", JSON.stringify({}));

        productData.images.forEach((img) => {
            form.append("images", img, img.name);
        });

        createProduct(form);
    }

    return (
        <div className="mt-16 max-w-xl bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-6">Create Product</h2>
            <form onSubmit={handleCreate}>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Product Title</label>
                    <input
                        required
                        type="text"
                        name="title"
                        value={productData.title}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Price</label>
                    <input
                        required
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Old Price</label>
                    <input
                        required
                        type="number"
                        name="oldPrice"
                        value={productData.oldPrice}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Category</label>
                    <input
                        required
                        type="text"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Stock</label>
                    <input
                        required
                        type="number"
                        name="stock"
                        value={productData.stock}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images</label>
                    <input
                        required
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                    {productData.images.length > 0 && (
                        <div className="mt-2">
                            {productData.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(img)}
                                    alt={`Preview ${index}`}
                                    className="w-full h-20 object-cover rounded mb-2"
                                />
                            ))}
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
