import React from "react";

export default function Heading({ heading, description }) {
  return (
    <div>
      <h1>{heading}</h1>
      <p>{description}</p>
    </div>
  );
}
