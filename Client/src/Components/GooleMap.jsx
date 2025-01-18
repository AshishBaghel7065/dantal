import React from "react";

const GoogleMap = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3638.833087021707!2d77.3790338756528!3d28.62871757566685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6f32992ec2ff0e67%3A0x1bbd8a69ce4fdcdd!2sPromotionAdda%20-%20Digital%20Marketing%20Company%20in%20Noida%20%7C%20Advertising%20Agency%20in%20Noida!5e1!3m2!1sen!2sin!4v1737008234521!5m2!1sen!2sin"
     width='600'
        height="470"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
