export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-links">
                        <div className="footer-left">
                            <div className='logo-title-footer'>
                                <img src="public/assets/logo-currency.svg" alt="logo" width="auto" height="40px" />
                                <p className='company-logo-footer'>CurrentCurrency</p>
                            </div>
                        </div>
                        <div className="footer-rest"> 
                            <div className="grid">
                                <a href="#" className='text-country-code ax-button btn text-bold'>How It Works</a>
                                <a href="#" className='ax-button btn text-dimmed'>Hire Employees</a>
                                <a href="#" className='ax-button btn text-dimmed'>Hire Contractors</a>
                                <a href="#" className='ax-button btn text-dimmed'>Global Payroll</a>
                                <a href="#" className='ax-button btn text-dimmed'>Integrations</a>
                            </div>
                            <div className="grid">
                                <a href="#" className='ax-button text-country-code btn text-bold'>Company</a>
                                <a href="#" className='ax-button btn text-dimmed'>About</a>
                                <a href="#" className='ax-button btn text-dimmed'>Contact Us</a>
                                <a href="#" className='ax-button btn text-dimmed'>Countries</a>
                                <a href="#" className='ax-button btn text-dimmed'>Careers</a>
                            </div>
                            <div className="grid">
                                <a href="#" className='text-country-code ax-button btn text-bold'>How It Works</a>
                                <a href="#" className='ax-button btn text-dimmed'>Hire Employees</a>
                                <a href="#" className='ax-button btn text-dimmed'>Hire Contractors</a>
                                <a href="#" className='ax-button btn text-dimmed'>Global Payroll</a>
                                <a href="#" className='ax-button btn text-dimmed'>Integrations</a>
                            </div>
                            <div className="grid">
                                <a href="#" className='ax-button text-country-code btn text-bold'>Resources</a>
                                <a href="#" className='ax-button btn text-dimmed'>FAQ</a>
                                <a href="#" className='ax-button btn text-dimmed'>Blog</a>
                                <a href="#" className='ax-button btn text-dimmed'>Open API</a>
                                <a href="#" className='ax-button btn text-dimmed'>Guide</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="footer-bottom-left">
                            <p>© 2021 All rights reserved.</p>
                            <a href="#" className='ax-button btn'>Privacy Policy</a>
                            <a href="#" className='ax-button btn'>Terms of Service</a>
                        </div>
                        <div className="footer-bottom-right">
                            <a href="#" className='ax-button btn'><img src="public/assets/fb.svg" alt="facebook link" height="24px" width="auto" /></a>
                            <a href="#" className='ax-button btn'><img src="public/assets/x.svg" alt="x social link" height="24px" width="auto" /></a>
                            <a href="#" className='ax-button btn'><img src="public/assets/linkedin.svg" alt="facebook link" height="24px" width="auto" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer> 
    )
}