const Page = () => {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="section-header">
            <h2>About Us</h2>
          </div>
        </div>
      </div>

      <div className="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-6">
              <div className="about-img">
                <img src="/home.jpeg" alt="Image" />
              </div>
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="about-text">
                <h2>
                  {" "}
                  Providing Convenient and Efficient Services at your doorstep
                </h2>
                <p>
                Book Your Oil Change is the premier marketplace for mobile automotive services, 
                designed to bring trusted professionals directly to your doorstep. 
                Whether you need an oil change, tire rotation, or other vehicle maintenance, 
                our platform connects you with top-rated service providers who offer convenience, 
                quality, and safety. Say goodbye to waiting in long lines at the shop and experience 
                hassle-free, on-demand automotive services tailored to fit your schedule. 
                With Book Your Oil Change, getting your car serviced has never been easier.
                </p>
                <a className="btn" href="">
                  Find A Provider
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="feature">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="section-header left">
                <p>Why Choose Us</p>
                <h2>Skilled Professional At Your Doorstep.</h2>
              </div>
              <p>
                BYOC aims to provide a convenient solution to every
                house who face difficulties in finding a mobile mechanic
                in different areas. We offer a wide range of solutions to meet
                your needs, all designed with you in mind. Our trusted service
                providers are skilled and equipped with advanced tools to get
                the job done right. Youll love how easy it is to book services
                and manage appointments, all while being part of a helpful
                community. The app will benefit both providers and vehicle owners by
                enabling them to connect in real time.
              </p>
            </div>
            <div className="col-md-7">
              <div className="row align-items-center feature-item">
                <div className="col-5">
                  <img src="/ser.jpg" alt="Feature" />
                </div>
                <div className="col-7">
                  <h3>Verified and Trained Technicians</h3>
                  <p>
                    Our technicians are the best in the business. They're
                    background-verified, trustworthy, and experts in their
                    respective fields.
                  </p>
                </div>
              </div>
              <div className="row align-items-center feature-item">
                <div className="col-5">
                  <img src="/er.jpg" alt="Feature" />
                </div>
                <div className="col-7">
                  <h3>High-Tech and Most Advanced Equipment</h3>
                  <p>
                    We have access to high-tech and the most advanced equipment,
                    making your home tasks even easier and more efficient
                  </p>
                </div>
              </div>
              <div className="row align-items-center feature-item">
                <div className="col-5">
                  <img src="/ti.webp" alt="Feature" />
                </div>
                <div className="col-7">
                  <h3>Timely and Convenient Services</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
