import ReactMarkdown, {Components} from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {materialDark as dark} from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
  children: string;
};

export const Markdown = ({children}: MarkdownProps) => {
  const components: Components = {
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || "");

      return !inline && match ? (
        <SyntaxHighlighter
          style={dark as any}
          PreTag="div"
          language={match[1]}
          {...props}
        >{String(children).replace(/\n$/, "")}</SyntaxHighlighter>
      ) : (
        <code className={className ? className : ""} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="prose dark:prose-invert max-w-full">
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};
