import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import 'animate.css';

export default function ResetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [ErrMsg, setErrMsg] = useState(null);
    const [SuccessMsg, setSuccessMsg] = useState(null);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        newPassword: Yup.string()
            .required("The new password is required")
            .min("8, The password must be at least 8 characters long"),
        confirmPassword: Yup.string()
            .required("The password confirmation is required")
            .oneOf([Yup.ref("newPassword")], "The two passwords do not match")
    });
    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            setErrMsg(null);
            setSuccessMsg(null);

            try {
                const response = await axios.put(
                    "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                    {
                        newPassword: values.newPassword,
                    }
                );

                if (response.status === 200) {
                    setSuccessMsg("Password has been reset successfully!");
                    setTimeout(() => navigate("/login"), 2000);
                }
            } catch (error) {
                if (error.response) {
                    setErrMsg(error.response.data.message);
                } else {
                    setErrMsg("An unexpected error occurred. Please try again.");
                }
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <>
            <Helmet>
                <title>Reset Password</title>
            </Helmet>
            <section className="bg-gray-50 dark:bg-gray-900 p-10">
                <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0 animate__animated animate__bounce">
                    <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Reset Password
                            </h1>
                            <form onSubmit={formik.handleSubmit} className="space-y-4">
                                {ErrMsg && (
                                    <div className="text-red-500 text-sm mb-4">
                                        {ErrMsg}
                                    </div>
                                )}
                                {SuccessMsg && (
                                    <div className="text-green-500 text-sm mb-4">
                                        {SuccessMsg}
                                    </div>
                                )}
                                <div>
                                    <label
                                        htmlFor="newPassword"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                    New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        id="newPassword"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="********"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.newPassword}
                                    />
                                    {formik.touched.newPassword && formik.errors.newPassword ? (
                                        <div className="text-red-500 text-sm">
                                            {formik.errors.newPassword}
                                        </div>
                                    ) : null}
                                </div>
                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="********"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.confirmPassword}
                                    />
                                    {formik.touched.confirmPassword &&
                                        formik.errors.confirmPassword ? (
                                        <div className="text-red-500 text-sm">
                                            {formik.errors.confirmPassword}
                                        </div>
                                    ) : null}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-slate-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Saving..." : "Reset Password"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
