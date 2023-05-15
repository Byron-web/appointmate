import React from "react";
import "./styles.css";

function FeatureCard({ title, description }) {
  return (
    <div className="feature-card w-30">
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-description">{description}</p>
    </div>
  );
}

export default FeatureCard;
