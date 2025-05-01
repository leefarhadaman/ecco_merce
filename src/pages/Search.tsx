import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  return (
    <motion.div
      className="max-w-7xl mx-auto my-8 pt-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-poppins mb-6">
        Search Results for "{query}"
      </h2>
      <p className="text-slate-700 font-inter">Search results page (to be implemented).</p>
    </motion.div>
  );
};

export default Search;