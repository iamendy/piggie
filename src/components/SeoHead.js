import Head from "next/head";

function SEOHead({ href }) {
  return (
    <Head>
      <title>Piggie: Your decentralized Piggy bank</title>
      <meta
        name="description"
        content="Piggie: Your decentralized Piggy bank."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={href} />

      <meta
        property="og:title"
        content="Piggie: Your decentralized Piggy bank."
      />
      <meta
        property="og:description"
        content="Piggie: Your decentralized Piggy bank."
      />
      <meta property="og:image" content={`${href}/img/preview.png`} />
      <meta property="og:url" content={href} />
      <meta property="og:type" content="website" />
      <meta
        name="twitter:card"
        content="Piggie: Your decentralized Piggy bank."
      />
      <meta
        name="twitter:title"
        content="Piggie: Your decentralized Piggy bank."
      />
      <meta
        name="twitter:description"
        content="Piggie: Your decentralized Piggy bank."
      />
      <meta name="twitter:image" content={`${href}/img/preview.png`} />
    </Head>
  );
}

export default SEOHead;
