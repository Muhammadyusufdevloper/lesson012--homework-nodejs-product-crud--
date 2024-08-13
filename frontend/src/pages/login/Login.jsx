import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../../context/api/userApi";
import { useDispatch } from "react-redux";
import { memo, useEffect } from "react";
import { setToken } from "../../context/slices/authSlice";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const Login = () => {
    const [signUser, { data, isSuccess }] = useSignInMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data?.payload));
            navigate('/');
        }
    }, [isSuccess]);

    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const handleSubmit = (values) => {
        signUser(values);
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Login
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <Formik
                                initialValues={{ username: '', password: '' }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ errors, touched }) => (
                                    <Form className="space-y-4 md:space-y-6">
                                        <div>
                                            <label
                                                htmlFor="username"
                                                className={`block mb-2 text-sm font-medium ${errors.username && touched.username
                                                    ? 'text-red-600'
                                                    : 'text-gray-900 dark:text-white'
                                                    }`}
                                            >
                                                Your username
                                            </label>
                                            <Field
                                                name="username"
                                                type="text"
                                                className={`bg-gray-50 border ${errors.username && touched.username
                                                    ? 'border-red-600'
                                                    : 'border-gray-300'
                                                    } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                                placeholder="muhammadyusuf_deve"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className={`block mb-2 text-sm font-medium ${errors.password && touched.password
                                                    ? 'text-red-600'
                                                    : 'text-gray-900 dark:text-white'
                                                    }`}
                                            >
                                                Password
                                            </label>
                                            <Field
                                                name="password"
                                                type="password"
                                                placeholder="••••••••"
                                                className={`bg-gray-50 border ${errors.password && touched.password
                                                    ? 'border-red-600'
                                                    : 'border-gray-300'
                                                    } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <Field
                                                        name="remember"
                                                        type="checkbox"
                                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>
                                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                                Forgot password?
                                            </a>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        >
                                            Sign in
                                        </button>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Don’t have an account yet?{' '}
                                            <Link to={"/register"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                                Sign up
                                            </Link>
                                        </p>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default memo(Login);
