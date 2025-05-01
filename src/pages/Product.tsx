import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const Product = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <motion.div
      className="max-w-7xl mx-auto my-8 pt-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-poppins mb-6">
        Product #{id}
      </h2>
      <p className="text-slate-700 font-inter">Product details page (to be implemented).</p>
    </motion.div>
  );
};

export default Product;