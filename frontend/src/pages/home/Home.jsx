import { Link } from "react-router-dom"
import Header from "../../components/header/Header"
import Products from "../../components/products/Products"

const Home = () => {
    return (
        <>
            <Header />
            <section className="mt-10">
                <div className="mx-auto max-w-screen-xl px-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">Products</h1>
                        <Link to="/admin/create" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add products</Link>
                    </div>
                    <Products />
                </div>
            </section>
        </>
    )
}

export default Home