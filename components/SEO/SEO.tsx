import Head from 'next/head';

export const SEO = ({
                        title,
                        description,
                        canonicalURL,
                        ogImage,
                        twitterCardType = 'summary',
                        twitterSite,
                        twitterCreator,
                        faviconPath = '/favicon.ico',
                        googleSiteVerification,
                        viewport = "width=device-width, initial-scale=1",
                        charset = "UTF-8"
                    }) => (
    <Head>
        {/* Standard Meta */}
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta charSet={charset}/>

        {/* Robots (you can adjust or remove if you want all pages indexed) */}
        {/* <meta name="robots" content="noindex, nofollow" /> */}

        {/* Open Graph */}
        <meta property="og:title" content={title}/>
        <meta property="og:description" content={description}/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={canonicalURL}/>
        <meta property="og:image" content={ogImage}/>

        {/* Twitter */}
        <meta name="twitter:card" content={twitterCardType}/>
        <meta name="twitter:site" content={twitterSite}/>
        <meta name="twitter:creator" content={twitterCreator}/>

        {/* Canonical */}
        {canonicalURL && <link rel="canonical" href={canonicalURL}/>}

        {/* Favicons */}
        <link rel="icon" href={faviconPath}/>

        {/* Mobile Optimization */}
        <meta name="viewport" content={viewport}/>

        {/* Google Verification (only include if you have a verification string) */}
        {googleSiteVerification && <meta name="google-site-verification" content={googleSiteVerification}/>}
    </Head>
);

