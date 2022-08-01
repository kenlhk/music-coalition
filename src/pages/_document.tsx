import { DocumentProps, Head, Html, Main, NextScript } from "next/document";

const Document = (props: DocumentProps) => {
  return (
    <Html lang="en">
      <Head>
        <script type="text/javascript" src="/viewport.js" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
