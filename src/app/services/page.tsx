const Page = () => {
  return (
    <div className="service" id="s2">
      <div className="container">
        <div className="section-header">
          <h2>Our Services</h2>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-item">
              <img
                src="/1.svg"
                alt="Service"
                style={{
                  margin: "auto",
                }}
              />
              <h3>Electrician Service</h3>

              <a className="btn" href="/electrician">
                Book Now
              </a>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-item">
              <img
                src="/2.svg"
                alt="Service"
                style={{
                  margin: "auto",
                }}
              />
              <h3>Plumbing Service</h3>

              <a className="btn" href="/plumber">
                Book Now
              </a>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-item">
              <img
                src="/3.svg"
                alt="Service"
                style={{
                  margin: "auto",
                }}
              />
              <h3>Carpenter</h3>

              <a className="btn" href="/carpentry">
                Book Now
              </a>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-item">
              <img
                src="/4.png"
                alt="Service"
                style={{
                  margin: "auto",
                }}
              />
              <h3>Pest Control</h3>

              <a className="btn" href="/pest_control">
                Book Now
              </a>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-item">
              <img
                src="/5.webp"
                alt="Service"
                style={{
                  margin: "auto",
                }}
              />
              <h3>Home Cleaning</h3>

              <a className="btn" href="/homecleaning">
                Book Now
              </a>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="service-item">
              <img
                src="/6.png"
                alt="Service"
                style={{
                  margin: "auto",
                }}
              />
              <h3>Car Services</h3>

              <a className="btn" href="/car_cleaning">
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
