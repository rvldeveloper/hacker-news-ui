import React, { useState, useEffect } from "react";

const PageFrame = (props: React.PropsWithChildren) => {
  return (
    <div className="frame">
      <h1>
        Top 10 Hacker Stories
      </h1>
      <div className="frame-content">
        {props.children}
      </div>
    </div>
  );
}

export default PageFrame;
