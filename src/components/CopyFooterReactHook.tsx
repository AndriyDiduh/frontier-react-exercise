import React, { FunctionComponent, useState } from "react";

/**
 * Copy component made with a React Hook
 */
const CopyFooter: FunctionComponent<{ author?: string; webLink?: string }> = ({
  author = "",
  webLink = "",
}): JSX.Element => {
  const [authorOk, clickOk] = useState(author);

  return (
    <div className="copyAndriyDiduh" onClick={() => clickOk(author + ", Ok")}>
      <a href={webLink}>by {authorOk}</a>
    </div>
  );
};

export default CopyFooter;
