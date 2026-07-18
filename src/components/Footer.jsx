// src/components/Footer.jsx
import { Link } from "react-router-dom";
import "../css/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Nalam</h3>
          <p>Smart pre-consultation platform for modern healthcare.</p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Product</h4>
            <a href="/#features">Features</a>
            <a href="/#how-it-works">How It Works</a>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Nalam. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;