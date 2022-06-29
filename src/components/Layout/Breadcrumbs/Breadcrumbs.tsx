import React from "react";

const Breadcrumbs = () => {
  return (
    <nav>
      <ol>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Parent</a>
        </li>
        <li>
          <a href="#" aria-current="page">
            Child
          </a>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
