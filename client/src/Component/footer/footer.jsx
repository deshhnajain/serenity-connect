import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.contact}>
        <h2 style={styles.heading}>Contact Us</h2>
        <p style={styles.subHeading}>Send us a message</p>
        <form style={styles.form}>
          <input type="text" placeholder="Full name" style={styles.input} />
          <input type="email" placeholder="Your Email" style={styles.input} />
          <textarea
            placeholder="Your Message"
            style={styles.textarea}
          ></textarea>
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
      <div style={styles.sitemap}>
        <h2 style={styles.heading}>Sitemaps</h2>
        <p style={styles.subHeading}>All our pages</p>
        <ul style={styles.list}>
          <li>Home</li>
          <li>About Us</li>
          <li>Services</li>
          <li>Clients</li>
          <li>Login</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div style={styles.contactInfo}>
        <img src="path-to-logo.png" alt="Logo" style={styles.logo} />
        <p>📞8826037168 </p>
        <p>📧 info.Sernity-Connect.co.in</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#000",
    color: "#fff",
    padding: "20px",
    // width: "100%",
  },
  contact: {
    flex: 1,
    marginRight: "20px",
  },
  sitemap: {
    flex: 1,
    marginRight: "20px",
    marginLeft: "250px",
  },
  contactInfo: {
    flex: 1,
  },
  heading: {
    fontSize: "24px",
  },
  subHeading: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    border: "none",
    borderRadius: "4px",
  },
  textarea: {
    padding: "10px",
    marginBottom: "10px",
    border: "none",
    borderRadius: "4px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#444",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  logo: {
    width: "50px",
    height: "50px",
    marginBottom: "10px",
    marginTop: "30px",
  },
};

export default Footer;