import { Link } from "react-router";

export function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md md:sticky md:top-0 z-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-around md:justify-center md:gap-10 h-16 items-center">
          <Link to="/" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
            Home
          </Link>
          <Link to="/inventory" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
            Inventory
          </Link>
          <Link to="/sales" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
            Sales
          </Link>
        </div>
      </div>
    </nav>
  );
}
