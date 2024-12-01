export const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="footer-contact">
              <h2>Get In Touch</h2>
              <p>
                <i className="fa fa-map-marker-alt"></i> Millat Town, FSD
              </p>
              <p>
                <i className="fa fa-phone-alt"></i>1 844 951 4666
              </p>
              <p>
                <i className="fa fa-envelope"></i>mail@bookyouroilchange.com
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="footer-link">
              <h2>Useful Link</h2>
              <a href="/about">About Us</a>
              <a href="">Our Story</a>
              <a href="/servies">Our Services</a>
              <a href="/shop">Shop</a>
              <a href="/contact">Contact Us</a>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="footer-form">
              <h2>Stay Updated</h2>

              <input className="form-control" placeholder="Email here" />
              <button className="btn">Submit</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container footer-menu">
        <div className="f-menu">
          <a href="">Terms of use</a>
          <a href="">Privacy policy</a>
          <a href="">Cookies</a>
          <a href="">Help & FQAs</a>
          <a href="">Contact us</a>
        </div>
      </div>
    </div>
  );
};
