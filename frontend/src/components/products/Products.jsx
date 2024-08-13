import { memo } from "react"
import { Link } from "react-router-dom"
import { useGetProductsQuery } from "../../context/api/productsApi"

const Products = () => {
    const { data } = useGetProductsQuery()
    console.log(data);

    let ProductCard = data?.payload?.map((product) => (
        <div key={product._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
            <Link to={""} >
                <div className="h-[230px] w-full bg-slate-300">
                    <img className="rounded-t-lg" src={product?.images[0]} alt={product?.title} />
                </div>
            </Link>
            <div className="p-5">
                <Link to={""}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product?.title}</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product?.description}</p>
                <Link to={""} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </div>
    ))
    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                {ProductCard}
            </div>
        </>
    )
}

export default memo(Products)