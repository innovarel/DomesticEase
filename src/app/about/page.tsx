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
                  The main goal of Domestic Ease is to make peoples lives easier
                  and more convenient by bringing various services right to
                  their doorsteps. We understand that households often struggle
                  to find skilled service providers at convenient times. Our aim
                  is to address this issue by ensuring customer safety,
                  improving work quality, and Providing Convenient and Efficient
                  Services.
                </p>
                <a className="btn" href="">
                  Learn More
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
                Domestic Ease aims to provide a convenient solution to every
                house who face difficulties in finding the work related person
                in different areas.We offer a wide range of solutions to meet
                your needs, all designed with you in mind. Our trusted service
                providers are skilled and equipped with advanced tools to get
                the job done right. Youll love how easy it is to book services
                and manage appointments, all while being part of a helpful
                community. The app will benefit both labour and house owners by
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
                    Our technicians are the best in the business. Theyre
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
