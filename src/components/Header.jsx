import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const navLinkClass = ({ isActive }) =>
        isActive ? 'btn btn-ghost btn-lg btn-active w-full' : 'btn btn-ghost btn-lg w-full';

    const closeModal = () => {
        document.getElementById('mobile-menu-modal').close();
    };

    return (
        <>
            <header className="navbar bg-base-200 shadow-lg sticky top-0 z-50">
                <div className="navbar-start">
                    {/* Modal open button */}
                    <button
                        className="btn btn-ghost lg:hidden"
                        onClick={() => document.getElementById('mobile-menu-modal').showModal()}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"></path>
                        </svg>
                    </button>
                    {/* Logo */}
                    <Link to="/" className="btn btn-ghost text-xl normal-case">
                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2zM15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
                        </svg>
                        NewsFeeds
                    </Link>
                </div>

                {/* Desktop navigation */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        <li><NavLink to="/" className={({ isActive }) => isActive ? 'btn btn-ghost btn-sm btn-active' : 'btn btn-ghost btn-sm'}>Home</NavLink></li>
                        <li><NavLink to="/topics" className={({ isActive }) => isActive ? 'btn btn-ghost btn-sm btn-active' : 'btn btn-ghost btn-sm'}>Topics</NavLink></li>
                        <li><NavLink to="/about" className={({ isActive }) => isActive ? 'btn btn-ghost btn-sm btn-active' : 'btn btn-ghost btn-sm'}>About</NavLink></li>
                        <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'btn btn-ghost btn-sm btn-active' : 'btn btn-ghost btn-sm'}>Contact</NavLink></li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <label className="swap swap-rotate btn btn-ghost btn-circle">
                        <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
                        <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                </div>
            </header>

            {/* Modal */}
            <dialog id="mobile-menu-modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Menu</h3>
                    <div className="flex flex-col gap-2">
                        <NavLink to="/" className={navLinkClass} onClick={closeModal}>Home</NavLink>
                        <NavLink to="/topics" className={navLinkClass} onClick={closeModal}>Topics</NavLink>
                        <NavLink to="/about" className={navLinkClass} onClick={closeModal}>About</NavLink>
                        <NavLink to="/contact" className={navLinkClass} onClick={closeModal}>Contact</NavLink>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}

// import React, { useContext } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { ThemeContext } from '../contexts/ThemeContext';

// export default function Header() {
//     const { theme, toggleTheme } = useContext(ThemeContext);

//     const navLinkClass = ({ isActive }) =>
//         isActive ? 'btn btn-ghost btn-sm btn-active' : 'btn btn-ghost btn-sm';

//     return (
//         <div className="drawer">
//             <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
            
//             <div className="drawer-content flex flex-col">
//                 <header className="navbar bg-base-200 shadow-lg sticky top-0 z-50">
//                     <div className="navbar-start">
//                         {/* Drawer toggle button */}
//                         <label htmlFor="mobile-drawer" className="btn btn-ghost drawer-button lg:hidden">
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"></path>
//                             </svg>
//                         </label>
//                         {/* Logo */}
//                         <Link to="/" className="btn btn-ghost text-xl normal-case">
//                             <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                                 <path d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2zM15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
//                             </svg>
//                             NewsFeeds
//                         </Link>
//                     </div>

//                     {/* Desktop navigation */}
//                     <div className="navbar-center hidden lg:flex">
//                         <ul className="menu menu-horizontal px-1 gap-2">
//                             <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
//                             <li><NavLink to="/topics" className={navLinkClass}>Topics</NavLink></li>
//                             <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
//                             <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
//                         </ul>
//                     </div>

//                     <div className="navbar-end">
//                         <label className="swap swap-rotate btn btn-ghost btn-circle">
//                             <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
//                             <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                                 <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
//                             </svg>
//                             <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                                 <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
//                             </svg>
//                         </label>
//                     </div>
//                 </header>
//             </div>

//             {/* Drawer sidebar */}
//             <div className="drawer-side z-[100]">
//                 <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
//                 <ul className="menu p-4 w-64 min-h-full bg-base-200">
//                     <li className="menu-title">
//                         <span>Navigation</span>
//                     </li>
//                     <li><NavLink to="/" onClick={() => document.getElementById('mobile-drawer').checked = false}>Home</NavLink></li>
//                     <li><NavLink to="/topics" onClick={() => document.getElementById('mobile-drawer').checked = false}>Topics</NavLink></li>
//                     <li><NavLink to="/about" onClick={() => document.getElementById('mobile-drawer').checked = false}>About</NavLink></li>
//                     <li><NavLink to="/contact" onClick={() => document.getElementById('mobile-drawer').checked = false}>Contact</NavLink></li>
//                 </ul>
//             </div>
//         </div>
//     );
// }