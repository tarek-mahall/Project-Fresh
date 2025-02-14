import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import 'animate.css';

export default function VerifyCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [ErrMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required('Code is required')
      .length(6, 'Code must be 6 digits')
      .matches(/^[0-9]+$/, 'Code must be numeric'),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrMsg(null);

      if (!values.resetCode) {
        setErrMsg("Code is required");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/verifyresetCode',
          {
            resetCode: values.resetCode, 
          }
        );

        if (response.status === 200) {
          navigate("/resetpassword"); 
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
        <title>Verify Code</title>
      </Helmet>
      <section className="bg-gray-50 dark:bg-gray-900 p-10">
        <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0 animate__animated animate__bounce">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Verify your code
              </h1>
              <form onSubmit={formik.handleSubmit} className="space-y-2 md:space-y-4">
                {ErrMsg && (
                  <div className="text-red-500 text-sm mb-4 animate-fade-in">
                    {ErrMsg}
                  </div>
                )}
                <div>
                  <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Enter verification code
                  </label>
                  <input
                    type="text"
                    name="resetCode"
                    id="resetCode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="123456"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.resetCode}
                  />
                  {formik.touched.resetCode && formik.errors.resetCode ? (
                    <div className="text-red-500 text-sm animate-fade-in">
                      {formik.errors.resetCode}
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="w-full bg-slate-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled={isLoading}
                >
                  {isLoading ? 'Verifying ...' : 'Verify Code'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
