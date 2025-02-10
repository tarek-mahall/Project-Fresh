import React from 'react';
import logo from '../../freshcart-logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { FaFacebook, FaTiktok, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { CiLinkedin } from 'react-icons/ci';

export default function Navbar() {
  const socialMediaLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com', target: '_blank' },
    { icon: <FaTiktok />, url: 'https://tiktok.com', target: '_blank' },
    { icon: <FaTwitter />, url: 'https://twitter.com', target: '_blank' },
    { icon: <FaInstagram />, url: 'https://instagram.com', target: '_blank' },
    { icon: <CiLinkedin />, url: 'https://linkedin.com', target: '_blank' },
    { icon: <FaYoutube />, url: 'https://youtube.com', target: '_blank' },
  ];
  const navLinks = [
    { to: '/', text: 'Home', hiddenOnMobile: true },
    { to: '/cart', text: 'Cart' },
    { to: '/products', text: 'Products' },
    { to: '/categories', text: 'Categories' },
    { to: '/brands', text: 'Brands' },
  ];

  const authLinks = [
    { to: '/login', text: 'Login' },
    { to: '/register', text: 'Register' },
    { to: '/login', text: 'SignOut', hiddenOnMobile: true },
  ];

  return (
    <nav className="top-0 left-0 right-0 bg-white border-gray-200 dark:bg-gray-900 z-50">
      <div className="max-w-screen-xl flex flex-wrap justify-between items-center mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-8" alt="FreshCart Logo" />
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="hidden w-full md:flex md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navLinks.map((link, index) => (
              <li key={index} className={link.hiddenOnMobile ? 'hidden md:block' : ''}>
                <NavLink
                  to={link.to}
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden w-full md:flex md:w-auto" id="navbar-social">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {socialMediaLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} target={link.target} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  {link.icon}
                </a>
              </li>
            ))}
            {authLinks.map((link, index) => (
              <li key={index} className={link.hiddenOnMobile ? 'hidden md:block' : ''}>
                <NavLink
                  to={link.to}
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
