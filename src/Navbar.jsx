export default function Navbar() {
  return (
    <>
      <nav className="nav-container">
        <div className="logo-title">
          <img
            src="/assets/logo-currency.svg"
            alt="logo"
            width="40px"
            height="40px"
          />
          <p className="company-logo">
            Current<span className="blue-text">Currency</span>
          </p>
        </div>
        <div className="nav-links">
          <a href="#" className="text-country-code ax-button btn">
            Currency Converter
          </a>
          <a href="#" className="text-country-code ax-button btn">
            Features
          </a>
          <a href="#" className="text-country-code ax-button btn">
            Resources
          </a>
        </div>
        <div className="nav-links-right">
          <a href="#" className="ax-button text-country-code btn">
            Login
          </a>
          <a href="#" className="ax-button rounded-button btn">
            Learn More
          </a>
        </div>
      </nav>
    </>
  );
}
