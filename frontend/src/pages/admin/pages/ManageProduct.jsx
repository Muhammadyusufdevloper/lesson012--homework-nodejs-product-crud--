import { Link } from "react-router-dom";
import { useState } from "react";
import { useDeleteProductMutation, useGetProductsQuery } from "../../../context/api/productsApi";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";

const ManageProduct = () => {
    const { data } = useGetProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleDelete = (id) => {
        setSelectedProductId(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (selectedProductId) {
            deleteProduct(selectedProductId);
            setIsDeleteModalOpen(false);
            setSelectedProductId(null);
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setSelectedProductId(null);
    };

    const openEditModal = (product) => {
        setSelectedProductId(product);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedProductId(null);
    };

    return (
        <>
            <div className="mt-16">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <Link to="/admin/create" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add products
                    </Link>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">Images</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Available</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Stock</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Old price</th>
                            <th scope="col" className="px-6 py-3">Edit</th>
                            <th scope="col" className="px-6 py-3">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.payload?.map((product) => (
                            <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={product?.images[0]} alt={product?.title} />
                                    </div>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {product?.title}
                                </th>
                                <td className="px-6 py-4">{product?.available ? "Yes" : "No"}</td>
                                <td className="px-6 py-4">{product?.category}</td>
                                <td className="px-6 py-4">{product?.stock}</td>
                                <td className="px-6 py-4 text-green-700">${product?.price}</td>
                                <td className="px-6 py-4 text-red-600">${product?.oldPrice}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => openEditModal(product)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleDelete(product._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isDeleteModalOpen && (
                <DeleteModal
                    confirmDelete={confirmDelete}
                    cancelDelete={cancelDelete}
                />
            )}
            {isEditModalOpen && (
                <EditModal
                    productId={selectedProductId}
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                />
            )}
        </>
    );
};

export default ManageProduct;
