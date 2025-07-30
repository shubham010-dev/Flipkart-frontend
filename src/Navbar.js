import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const categories = [
  { name: "Grocery", icon: "🛒", route: "/category/grocery" },
  { name: "Mobiles", icon: "📱", route: "/category/mobiles" },
  { name: "Fashion", icon: "👗", route: "/category/fashion" },
  { name: "Electronics", icon: "💻", route: "/category/electronics" },
  { name: "Home & Furniture", icon: "🛋️", route: "/category/home-furniture" },
  { name: "Appliances", icon: "🔌", route: "/category/appliances" },
  { name: "Flight Bookings", icon: "✈️", route: "/category/flight-bookings" },
  {
    name: "Beauty, Toys & More",
    icon: "🧸",
    route: "/category/beauty-toys-more",
  },
  { name: "Two Wheelers", icon: "🏍️", route: "/category/two-wheelers" },
];

const userMenu = [
  { label: "My Profile", icon: "👤", route: "/profile" },
  { label: "SuperCoin Zone", icon: "⚡", route: "/supercoin" },
  { label: "Flipkart Plus Zone", icon: "⭐", route: "/plus" },
  { label: "Orders", icon: "📦", route: "/orders" },
  { label: "Wishlist (4)", icon: "🤍", route: "/wishlist" },
  { label: "Coupons", icon: "🏷️", route: "/coupons" },
  { label: "Gift Cards", icon: "💳", route: "/giftcards" },
  { label: "Notifications", icon: "🔔", route: "/notifications" },
  { label: "Logout", icon: "🚪", route: "/logout" },
];

const Navbar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const userMenuTimeout = useRef();
  const navigate = useNavigate();

  const handleUserMenuEnter = () => {
    clearTimeout(userMenuTimeout.current);
    setUserMenuOpen(true);
  };
  const handleUserMenuLeave = () => {
    userMenuTimeout.current = setTimeout(() => setUserMenuOpen(false), 100);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setUserMenuOpen(false);
    navigate("/login");
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <nav className="w-full bg-white shadow-md border-b font-sans">
      <div className="flex items-center px-8 py-2 justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-blue-600">Flipkart</span>
          <span className="text-xs text-gray-500 ml-2">
            Explore{" "}
            <span className="text-yellow-500 font-semibold">Plus ★</span>
          </span>
        </Link>

        <form
          className="flex-1 mx-8 relative max-w-2xl"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full px-4 py-2 rounded-sm border border-gray-300 text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
          >
            🔍
          </button>
        </form>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/cart" className="relative flex items-center">
            <span className="text-xl mr-1">🛒</span> Cart
            <span className="absolute -top-2 -right-4 bg-red-600 text-white rounded-full px-2 text-xs">
              1
            </span>
          </Link>

          <Link to="/seller" className="hover:text-blue-600">
            Become a Seller
          </Link>

          <div
            className="relative cursor-pointer"
            onMouseEnter={handleUserMenuEnter}
            onMouseLeave={handleUserMenuLeave}
            tabIndex={0}
            onFocus={handleUserMenuEnter}
            onBlur={handleUserMenuLeave}
          >
            <div className="flex items-center gap-1 hover:text-blue-600">
              <span className="text-lg">👤</span>
              <span className="text-blue-700">Shubham</span>
              <span className="text-xs">▼</span>
            </div>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border z-50">
                <ul className="py-2">
                  {userMenu.map((item, idx) => (
                    <li key={idx}>
                      {item.route === "/logout" ? (
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                        >
                          <span className="text-lg">{item.icon}</span>
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          to={item.route}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                        >
                          <span className="text-lg">{item.icon}</span>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="text-2xl cursor-pointer">⋮</div>
        </div>
      </div>

      <div className="flex justify-around items-center py-3 bg-white text-sm border-t">
        {categories.map((cat) => (
          <Link
            to={cat.route}
            key={cat.name}
            className="flex flex-col items-center text-gray-800 hover:text-blue-600 transition"
          >
            <div className="text-2xl">{cat.icon}</div>
            <div className="mt-1">{cat.name}</div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
