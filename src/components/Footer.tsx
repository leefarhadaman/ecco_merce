import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-ivory-100 p-12 mt-auto shadow-2xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-6 font-playfair">LuxeMart</h3>
          <Link to="/about" className="text-ivory-300 hover:text-gold-500 transition-colors duration-300 font-montserrat block mb-2">
            About Us
          </Link>
          <Link to="/careers" className="text-ivory-300 hover:text-gold-500 transition-colors duration-300 font-montserrat block mb-2">
            Careers
          </Link>
          <Link to="/contact" className="text-ivory-300 hover:text-gold-500 transition-colors duration-300 font-montserrat block">
            Contact Us
          </Link>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-6 font-playfair">Customer Service</h3>
          <Link to="/faq" className="text-ivory-300 hover:text-gold-500 transition-colors duration-300 font-montserrat block mb-2">
            FAQs
          </Link>
          <Link to="/returns" className="text-ivory-300 hover:text-gold-500 transition-colors duration-300 font-montserrat block mb-2">
            Return Policy
          </Link>
          <Link to="/shipping" className="text-ivory-300 hover:text-gold-500 transition-colors duration-300 font-montserrat block">
            Shipping Info
          </Link>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-6 font-playfair">Explore</h3>
          <Link to="/category/fashion" className="text-ivory-300 hover:text-gold-500 transition-colors duration-300 font-montserrat block mb-2">
            Fashion
          </Link>
          <Link to="/category/electronics" className="text-ivory-300 hover:text-gold-500 transition-colors duration-300 font-montserrat block mb-2">
            Electronics
          </Link>
          <Link to="/category/beauty" className="text-ivory-300 hover:text-gold-500 transition-colors duration-300 font-montserrat block">
            Beauty
          </Link>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-6 font-playfair">Stay Connected</h3>
          <p className="text-ivory-300 mb-4 font-montserrat">Exclusive offers await you</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="bg-navy-800 text-ivory-100 px-4 py-3 rounded-l-full focus:outline-none font-montserrat"
            />
            <button className="bg-gold-500 text-charcoal-900 px-6 py-3 rounded-r-full hover:bg-gold-600 transition-all duration-300 font-montserrat">
              Subscribe
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-ivory-300 hover:text-gold-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
            </a>
            <a href="#" className="text-ivory-300 hover:text-gold-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11 1C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.55 1.72 2.14 2.97 4.03 3.01-1.48 1.16-3.34 1.85-5.36 1.85-.35 0-.69-.02-1.03-.06 1.91 1.23 4.18 1.94 6.62 1.94 7.94 0 12.29-6.58 12.29-12.29 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.22z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <p className="text-center text-ivory-300 mt-12 font-montserrat">© 2025 LuxeMart. All rights reserved.</p>
    </footer>
  );
};

export default Footer;