import { DocumentProps, Head, Html, Main, NextScript } from "next/document";

const Document = (props: DocumentProps) => {
  return (
    <Html lang="en">
      <Head/>
      <body>
        <Main />
        <NextScript />
        <script type="text/javascript" src="/viewport.js" async></script>
      </body>
    </Html>
  );
};

export default Document;
