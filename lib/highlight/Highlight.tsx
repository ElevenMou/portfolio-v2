"use client";

import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import { useEffect } from "react";
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);

import "highlight.js/styles/atom-one-dark.css";

const Highlight = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className: string;
}>) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  return (
    <pre>
      <code className={className}>{children}</code>
    </pre>
  );
};

export default Highlight;
