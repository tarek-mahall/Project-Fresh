import React, { useState } from 'react';
import logo from '../../freshcart-logo.svg';
import 'animate.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [ErrMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password must have special characters, capital letters, small letters, numbers, and min 8 characters'
      ),
    rePassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^01[0125][0-9]{8}$/, 'Phone must be a valid Egyptian number'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrMsg(null);

      try {
        const response = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/signup',
          values
        );

        if (response.status === 201) {
          navigate('/login');
        }
      } catch (error) {
        if (error.response) {
          setErrMsg(error.response.data.message); 
        } else if (error.request) {
          setErrMsg('No connection to the server. Please try again.'); 
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
        <title>Register</title>
      </Helmet>
      <section className="bg-gray-50 dark:bg-gray-900 p-10">
        <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0 animate__animated animate__bounce">
          <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="mr-2" src={logo} alt="logo" />
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 animate_animated animate_zoomInDown">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form onSubmit={formik.handleSubmit} className="space-y-2 md:space-y-4">
                {ErrMsg && (
                  <div className="text-red-500 text-sm mb-4 animate-fade-in">
                    {ErrMsg}
                  </div>
                )}
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your name"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500 text-sm animate-fade-in">
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
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
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm animate-fade-in">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="rePassword"
                    id="rePassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.rePassword}
                  />
                  {formik.touched.rePassword && formik.errors.rePassword ? (
                    <div className="text-red-500 text-sm animate-fade-in">
                      {formik.errors.rePassword}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="01234567899"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-red-500 text-sm animate-fade-in">
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="w-full bg-slate-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Register'}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}