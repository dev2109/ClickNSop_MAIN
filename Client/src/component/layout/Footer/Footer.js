import React from 'react'
import { Link } from 'react-router-dom'

import "./footer.css";

function sendEmail() {
  window.location.href = "mailto:panchalbhagyashree8592@gmail.com";
}

const Footer = () => {



  return (
    <>


      {/* Created By CodingLab - www.codinglabweb.com */}
      <meta charSet="UTF-8" />
      {/*<title> Responsive Footer | CodingLab</title>-*/}
      <link rel="stylesheet" href="style.css" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
      />
      <footer>
        <div className="content">
          <div className="left box">
            <div className="upper">
              <div className="topic">About us</div>
              <p>
                At ClickNShop, we're passionate about providing high-quality products and exceptional customer service. Founded in 2023, our mission is to provide good quality product to our customer.
              </p>
            </div>
            <div className="lower">
              <div className="topic">Contact us</div>
              <div className="phone">
                  <i className="fas fa-phone-volume" />
                 <p> +7567010311</p>
                 </div>
              <div className="email">
                  <i className="fas fa-envelope" />
                  <p>panchalkrish2109@gmail.com</p>
                
              </div>
            </div>
          </div>
          <div className="middle box">
            <div className="topic">What we provide</div>
            <div>
              <p>Best product selection</p>
            </div>
            <div>
              <p>Fast shipping</p>
            </div>
            <div>
              <p>Easy returns</p>
            </div>
            <div>
              <p>24/7 customer support</p>
            </div>
            <div>
              <p>Product reviews:</p>
            </div>
          </div>
          <div className="right box">
            <div className="topic">Any Issue? Mail Us</div>
            <p>Online Email query provide us better information about customers experiences with our products and services.</p>
            <button className='mailButton' onClick={sendEmail}>Send Email</button>
          </div>
        </div>
        <div className="bottom">
          <p>
            Copyright © 2020 <Link to="/">ClickNShop</Link> All rights reserved
          </p>
        </div>

      </footer>
    </>


  )
}

export default Footer