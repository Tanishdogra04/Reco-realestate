import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-full flex items-center p-2 mt-6">
      <input
        type="text"
        placeholder="Search by city, area, or property type..."
        className="flex-1 px-4 py-2 outline-none rounded-l-full"
      />
      <button className="px-6 py-2 bg-blue-600 text-white rounded-full flex items-center space-x-2 hover:bg-blue-700">
        <Search size={20} />
        <span>Search</span>
      </button>
    </div>
  );
};

export default SearchBar;
