// components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">About AgriLink</h3>
            <p className="text-gray-300">
              Connecting landowners, farmers, beekeepers, and buyers to create sustainable 
              agricultural partnerships and opportunities.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="text-gray-300 space-y-2">
              <p>📧 Email: info@agrilink.com</p>
              <p>📞 Phone: (555) 123-4567</p>
              <p>📍 Address: 123 Farm Road, Agriculture City</p>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a 
                href="#" 
                className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <span className="font-bold">f</span>
              </a>
              
              {/* Instagram */}
              <a 
                href="#" 
                className="bg-pink-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
              >
                <span className="font-bold">IG</span>
              </a>
              
              {/* Twitter */}
              <a 
                href="#" 
                className="bg-blue-400 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
              >
                <span className="font-bold">X</span>
              </a>
              
              {/* LinkedIn */}
              <a 
                href="#" 
                className="bg-blue-800 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors"
              >
                <span className="font-bold">in</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} AgriLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;