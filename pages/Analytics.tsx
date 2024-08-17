import React from 'react';
import Script from 'next/script';

const Analytics = () => (
  <>
    {/* Google Analytics */}
    <Script
      strategy="beforeInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=AW-10890740281`}
    />
    <Script
      id="google-analytics"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-10890740281');
        `,
      }}
    />

    {/* Meta Pixel */}
    <Script
      id="meta-pixel"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
                !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1356791388005209');
        fbq('track', 'PageView');
        `,
      }}
    />
    {/* NoScript for Meta Pixel */}
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src="https://www.facebook.com/tr?id=YOUR_META_PIXEL_ID&ev=PageView&noscript=1"
        alt=""
      />
    </noscript>
    <Script
      data-plerdy_code="1"
      id="plerdy-code"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
                    var _protocol="https:"==document.location.protocol?"https://":"http://";
    _site_hash_code = "bf97f693920c5fc4f38c60018782b5de",_suid=22475, plerdyScript=document.createElement("script");
    plerdyScript.setAttribute("defer",""),plerdyScript.dataset.plerdymainscript="plerdymainscript",
    plerdyScript.src="https://d.plerdy.com/public/js/click/main.js?v="+Math.random();
    var plerdymainscript=document.querySelector("[data-plerdymainscript='plerdymainscript']");
    plerdymainscript&&plerdymainscript.parentNode.removeChild(plerdymainscript);
    try{document.head.appendChild(plerdyScript)}catch(t){console.log(t,"unable add script tag")}
        `,
      }}
    />
  </>
);

export default Analytics;
