import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCart, User, Search, Menu, LogOut, LayoutDashboard, UserCircle, ChevronDown, X } from 'lucide-react'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { clearCartItems } from '../slices/cartSlice'

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(clearCartItems());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-onyx hover:text-gold transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-3xl font-heading font-black tracking-tighter text-onyx">
              UMII
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <Link to="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-onyx transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-onyx transition-colors">
              Mens
            </Link>
            <Link to="/shop" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-onyx transition-colors">
              Womens
            </Link>
            <Link to="/about" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-onyx transition-colors">
              Heritage
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-1 md:space-x-4">
            <button className="text-gray-400 hover:text-onyx p-2 transition-colors hidden sm:block">
              <Search size={20} />
            </button>

            {/* Profile Menu */}
            {userInfo ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-1 text-onyx hover:text-gold p-2 transition-colors font-bold text-[10px] uppercase tracking-[0.2em]"
                >
                  {userInfo.name.split(' ')[0]} <ChevronDown size={14} />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-2xl rounded-sm z-[100] py-2 animate-fade-in-up">
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors">
                      <UserCircle size={16} /> Profile
                    </Link>
                    <button onClick={logoutHandler} className="w-full flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
                <Link to="/login" className="text-onyx hover:text-gold p-2 transition-colors relative group">
                    <User size={20} />
                </Link>
            )}

            {/* Admin Menu */}
            {userInfo && userInfo.isAdmin && (
              <div className="relative hidden lg:block">
                 <button 
                  onClick={() => setShowAdminMenu(!showAdminMenu)}
                  className="flex items-center gap-1 text-gold font-black p-2 transition-colors text-[10px] uppercase tracking-[0.2em]"
                >
                  Admin <ChevronDown size={14} />
                </button>
                {showAdminMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-2xl rounded-sm z-[100] py-2 animate-fade-in-up">
                    <Link to="/admin/dashboard" className="flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors">
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                    <Link to="/admin/productlist" className="flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors">
                       Products
                    </Link>
                    <Link to="/admin/orderlist" className="flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-colors">
                       Orders
                    </Link>
                  </div>
                )}
              </div>
            )}

            <Link to="/cart" className="text-onyx hover:text-gold p-2 transition-colors relative">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-onyx text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in absolute inset-x-0 top-20 z-40 shadow-xl">
          <div className="px-6 py-10 space-y-6">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs font-black uppercase tracking-[0.4em] text-onyx py-2">Home</Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs font-black uppercase tracking-[0.4em] text-onyx py-2">Mens Collection</Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs font-black uppercase tracking-[0.4em] text-onyx py-2">Womens Collection</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs font-black uppercase tracking-[0.4em] text-onyx py-2">Our Heritage</Link>
            {userInfo && (
              <button onClick={() => { logoutHandler(); setIsMobileMenuOpen(false); }} className="block w-full text-left text-xs font-black uppercase tracking-[0.4em] text-red-500 py-2">Logout</button>
            )}
            {userInfo && userInfo.isAdmin && (
               <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs font-black uppercase tracking-[0.4em] text-gold py-2">Administrator</Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
