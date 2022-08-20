import { DocumentProps, Head, Html, Main, NextScript } from "next/document";

const Document = (props: DocumentProps) => {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="http://api.spotify.com" />
        <link rel="dns-prefetch" href="http://api.spotify.com" />
        <link rel="preconnect" href="https://api.genius.com" />
        <link rel="dns-prefetch" href="https://api.genius.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
