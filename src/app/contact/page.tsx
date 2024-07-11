"use client";
import { useState } from "react";
import { createContactInquiry } from "../actions/contact";
import { useToast } from "@chakra-ui/react";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast({
        title: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    await createContactInquiry({ name, email, subject, message });
    toast({
      title: "Message sent successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div className="contact">
      <div className="container">
        <div className="section-header">
          <p></p>
          <h2>Contact Us</h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="faqs">
              <div id="accordion">
                <div className="card">
                  <div className="card-header">
                    <a
                      className="card-link collapsed"
                      data-toggle="collapse"
                      href="#collapseOne"
                      aria-expanded="true"
                    >
                      <span>1</span> In which cities can I avail Domectic Ease
                      services?
                    </a>
                  </div>
                  <div
                    id="collapseOne"
                    className="collapse show"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      You can book expert and professional home maintenance
                      services from Domectic Ease in Faisalabad.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#collapseTwo"
                    >
                      <span>2</span> Can I cancel my booking?
                    </a>
                  </div>
                  <div
                    id="collapseTwo"
                    className="collapse"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      Yes, you have the option to cancel your bookings at any
                      stage of the order and book again at your convenience.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#collapseThree"
                    >
                      <span>3</span> What are the service booking timings?
                    </a>
                  </div>
                  <div
                    id="collapseThree"
                    className="collapse"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      To cater to your convenience, you can book our services
                      from 9 am to 9 pm throughout the week, including weekends.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#collapseFour"
                    >
                      <span>4</span> What are the Inspection charges at Domestic
                      Ease?
                    </a>
                  </div>
                  <div
                    id="collapseFour"
                    className="collapse"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      Our inspection charges are only Rs.500.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#collapseFour"
                    >
                      <span>5</span>
                    </a>
                  </div>
                  <div
                    id="collapseFour"
                    className="collapse"
                    data-parent="#accordion"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Your Name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    placeholder="Subject"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="message"
                    placeholder="Message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <button className="btn" type="submit">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
