import React, { useState } from 'react';
import logo from '../../freshcart-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import 'animate.css';
export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [ErrMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Email is requierd')
      .email('invaild email address'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrMsg(null);

      try {
        const response = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/forgotpasswords',
          values
        );

        if (response.status === 200) {
          setErrMsg('Please check your email to reset your password');
          navigate("/verifycode");
        }
      } catch (error) {
        if (error.response) {
          setErrMsg(error.response.data.message);
        } else {
          setErrMsg('An unexpected error occurred. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title> Forgot password</title>
      </Helmet>
      <section className="bg-gray-50 dark:bg-gray-900 p-10">
        <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0 animate__animated animate__bounce">
          <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="mr-2" src={logo} alt="Logo " />
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 animate_animated animate_zoomInDown">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                forgot password
              </h1>
              <form onSubmit={formik.handleSubmit} className="space-y-2 md:space-y-4">
                {ErrMsg && (
                  <div className="text-red-500 text-sm mb-4 animate-fade-in">
                    {ErrMsg}
                  </div>
                )}
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                     e-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@company.com"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm animate-fade-in">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="w-full bg-slate-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled={isLoading} 
                >
                  {isLoading ? 'loading ...' : 'send code'}
                </button>
                
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Remember your password{' '}
                  <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
login                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}