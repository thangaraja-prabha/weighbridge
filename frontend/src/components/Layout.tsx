import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const role = user.rights || '';
    const navigate = useNavigate();
    const location = useLocation();
    const userMenuRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname === path;

    // Icons
    const Icons = {
        Dashboard: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
        Search: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
        Reports: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
        Config: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
        Entry: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
        WeighIn: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 11a1 1 0 001 1h8a1 1 0 001-1l3-11M3 6h18" /></svg>,
        WeighOut: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
        Create: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
        Password: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
        Logout: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
    };

    // Close user menu on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const MenuItem = ({ to, label, icon, isDropdown = false, children }: any) => {
        const [isOpen, setIsOpen] = useState(false);
        const [isHover, setIsHover] = useState(false);
        const itemRef = useRef<HTMLLIElement>(null);
        const [flyoutTop, setFlyoutTop] = useState(0);

        const handleClick = () => {
            if (!isSidebarOpen && isDropdown) {
                setIsSidebarOpen(true);
                setIsOpen(true);
                return;
            }
            if (isDropdown) setIsOpen(!isOpen);
            else navigate(to);
        };

        const handleMouseEnter = () => {
            if (!isSidebarOpen) {
                if (itemRef.current) {
                    const rect = itemRef.current.getBoundingClientRect();
                    setFlyoutTop(rect.top);
                }
                setIsHover(true);
            }
        };

        return (
            <li
                ref={itemRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsHover(false)}
            >
                <button
                    onClick={handleClick}
                    className={`w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors border-l-4 border-transparent
             ${!isDropdown && to && isActive(to) ? 'bg-gray-800 text-white !border-primary' : ''}
          `}
                >
                    <div className="flex items-center">
                        <span className="flex-shrink-0" title={!isSidebarOpen ? label : ''}>
                            {icon}
                        </span>
                        <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                            {label}
                        </span>
                    </div>

                    {isSidebarOpen && isDropdown && (
                        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    )}
                </button>

                {isSidebarOpen && isOpen && isDropdown && (
                    <ul className="bg-gray-900 pl-11 py-1 border-l-4 border-transparent">
                        {children}
                    </ul>
                )}

                {!isSidebarOpen && isHover && isDropdown && (
                    <div
                        className="fixed left-16 w-56 rounded-r-md shadow-2xl bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
                        style={{ top: flyoutTop }}
                    >
                        <div className="py-2 px-3 text-xs font-semibold text-gray-400 border-b border-gray-700 uppercase mb-1 bg-gray-900">
                            {label}
                        </div>
                        <ul className="py-1">
                            {children}
                        </ul>
                    </div>
                )}
            </li>
        );
    };

    const SubMenuItem = ({ to, label }: any) => (
        <li>
            <button
                onClick={(e) => { e.stopPropagation(); navigate(to); }}
                className="w-full text-left px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
                {label}
            </button>
        </li>
    );

    return (
        <div className="min-h-screen bg-gray-100 flex overflow-hidden">
            <style>{`
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
            .scrollbar-hide {
                -ms-overflow-style: none; /* IE and Edge */
                scrollbar-width: none; /* Firefox */
            }
        `}</style>

            {/* Sidebar */}
            <aside
                className={`bg-black text-white flex-shrink-0 transition-all duration-300 ease-in-out z-20 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-16'
                    }`}
            >
                <div className="h-16 flex items-center justify-center bg-gray-900 shadow-md flex-shrink-0">
                    {isSidebarOpen ? (
                        <span className="text-xl font-bold tracking-wider">WES <span className="text-primary">APP</span></span>
                    ) : (
                        <span className="text-xl font-bold">W</span>
                    )}
                </div>

                <nav className="mt-4 flex-1 overflow-y-auto scrollbar-hide pb-16">
                    <ul className="space-y-1">
                        <MenuItem to="/dashboard" label="DASHBOARD" icon={Icons.Dashboard} />

                        {role === 'Managers' && (
                            <>
                                <MenuItem to="/search" label="SEARCH" icon={Icons.Search} />
                                <MenuItem label="REPORTS" isDropdown icon={Icons.Reports}>
                                    <SubMenuItem to="/rdash" label="DASHBOARD REPORT" />
                                    <SubMenuItem to="/cust" label="CUSTOM REPORT" />
                                    <SubMenuItem to="/print" label="PRINT" />
                                    <SubMenuItem to="/status" label="STATUS" />
                                    <SubMenuItem to="/logs" label="LOGS" />
                                </MenuItem>
                                <MenuItem label="CONFIG" isDropdown icon={Icons.Config}>
                                    <SubMenuItem to="/registration" label="CREATE USER" />
                                    <SubMenuItem to="/employees" label="USERS" />
                                    <SubMenuItem to="/setting" label="SETTING" />
                                </MenuItem>
                            </>
                        )}

                        {role === 'Users' && (
                            <>
                                <MenuItem to="/entry" label="ENTRY" icon={Icons.Entry} />
                                <MenuItem to="/search" label="SEARCH" icon={Icons.Search} />
                                <MenuItem label="REPORTS" isDropdown icon={Icons.Reports}>
                                    <SubMenuItem to="/rdash" label="DASHBOARD" />
                                    <SubMenuItem to="/ddash" label="DEPARTMENT WISE" />
                                    <SubMenuItem to="/mdash" label="MACHINE WISE" />
                                    <SubMenuItem to="/sdash" label="SHIFT WISE" />
                                    <SubMenuItem to="/edash" label="ATTENDEE WISE" />
                                    <SubMenuItem to="/mcomp" label="COMPLETED" />
                                    <SubMenuItem to="/mpend" label="PENDING" />
                                    <SubMenuItem to="/cust" label="CUSTOM REPORT" />
                                    <SubMenuItem to="/logs" label="LOGS" />
                                    <SubMenuItem to="/employees" label="USERS" />
                                </MenuItem>
                            </>
                        )}

                        {role === 'Admin' && (
                            <>
                                <MenuItem label="INT. WEIGHMENT" isDropdown icon={Icons.WeighIn}>
                                    <SubMenuItem to="/weighin" label="FIRST WEIGHMENT" />
                                    <SubMenuItem to="/weighout" label="SECOND WEIGHMENT" />
                                </MenuItem>
                                <MenuItem label="EXT. WEIGHMENT" isDropdown icon={Icons.WeighOut}>
                                    <SubMenuItem to="/weighin" label="FIRST WEIGHMENT" />
                                    <SubMenuItem to="/weighout" label="SECOND WEIGHMENT" />
                                    <SubMenuItem to="/sweigh" label="SINGLE WEIGHMENT" />
                                </MenuItem>
                                <MenuItem label="REPORTS" isDropdown icon={Icons.Reports}>
                                    <SubMenuItem to="/rdash" label="DASHBOARD REPORT" />
                                    <SubMenuItem to="/ddash" label="DEPARTMENT WISE" />
                                    <SubMenuItem to="/mdash" label="MACHINE WISE" />
                                    <SubMenuItem to="/sdash" label="SHIFT WISE" />
                                    <SubMenuItem to="/edash" label="ATTENDEE WISE" />
                                    <SubMenuItem to="/mcomp" label="COMPLETED" />
                                    <SubMenuItem to="/mpend" label="PENDING" />
                                    <SubMenuItem to="/cust" label="CUSTOM REPORT" />
                                    <SubMenuItem to="/logs" label="LOGS" />
                                    <SubMenuItem to="/employees" label="USERS" />
                                    <SubMenuItem to="/dept" label="DEPARTMENT" />
                                </MenuItem>
                                <MenuItem label="CREATE" isDropdown icon={Icons.Create}>
                                    <SubMenuItem to="/dept" label="DEPARTMENT" />
                                    <SubMenuItem to="/mdetail" label="MACHINE DETAIL" />
                                    <SubMenuItem to="/nop" label="NATURE OF PROBLEM" />
                                    <SubMenuItem to="/shifts" label="SHIFTS" />
                                    <SubMenuItem to="/registration" label="USER" />
                                </MenuItem>
                                <MenuItem to="/search" label="SEARCH" icon={Icons.Search} />
                            </>
                        )}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="bg-white shadow h-16 flex items-center justify-between px-6 z-10 flex-shrink-0">
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md p-1"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="ml-4 text-xl font-semibold text-gray-800">
                            Dashboard
                        </h1>
                    </div>

                    {/* Right Side User Menu */}
                    <div className="relative" ref={userMenuRef}>
                        <button
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="flex items-center space-x-3 focus:outline-none"
                        >
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-medium text-gray-900">{user.personName || user.username}</div>
                                <div className="text-xs text-gray-500">{user.rights}</div>
                            </div>
                            <div className="h-10 w-10 number-font bg-primary rounded-full flex items-center justify-center text-white font-bold shadow hover:bg-sky-500 transition-colors">
                                {user.username?.charAt(0).toUpperCase()}
                            </div>
                            <svg className={`h-5 w-5 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isUserMenuOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50">
                                <div className="px-4 py-2 border-b border-gray-100 sm:hidden">
                                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                                    <div className="text-xs text-gray-500">{user.rights}</div>
                                </div>
                                <button
                                    onClick={() => { navigate('/cpwd'); setIsUserMenuOpen(false); }}
                                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Change Password
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
