import {FC} from "react";
import {GetStaticProps} from "next";
import ReactMarkdown, {Components} from "react-markdown";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {materialDark as dark} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'

type MarkdownProps = {
  content: string;
};

const Markdown = ({content}: MarkdownProps) => {
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
    <article>
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
      >{content}</ReactMarkdown>
    </article>
  );
};


type Props = {}

const About: FC = () => {
  return (
    <article className="prose dark:prose-invert">
      <Markdown content={"# 代码样例"}/>
      <Markdown content={"![这是图片](https://tse4-mm.cn.bing.net/th/id/OIP-C.YKoZzgmubNBxQ8j-mmoTKAHaEK?pid=ImgDet&rs=1 \"Magic Gardens\")"}/>
      <Markdown content={"```javascript\nlet i = 0\n```"}/>
      {/*<h1>代码样例</h1>*/}
      <ReactMarkdown>
        {"# 代码样例"}
      </ReactMarkdown>
    </article>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {

  return {
    props: {},
  }
}

export default About
