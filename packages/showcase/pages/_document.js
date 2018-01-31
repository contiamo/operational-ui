import * as React from "react"
import Document, { Head, Main, NextScript } from "next/document"
import { baseStylesheet } from "@operational/utils"
import { operational } from "@operational/theme"
import { renderStatic } from "glamor/server"

const staticPath = `/static`

const highlightJsCss = `
/* Base16 Atelier Sulphurpool Light - Theme */
/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/sulphurpool) */
/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

/* Atelier-Sulphurpool Comment */
.hljs-comment,
.hljs-quote {
  color: #6b7394;
}

/* Atelier-Sulphurpool Red */
.hljs-variable,
.hljs-template-variable,
.hljs-attribute,
.hljs-tag,
.hljs-name,
.hljs-regexp,
.hljs-link,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class {
  color: #c94922;
}

/* Atelier-Sulphurpool Orange */
.hljs-number,
.hljs-meta,
.hljs-built_in,
.hljs-builtin-name,
.hljs-literal,
.hljs-type,
.hljs-params {
  color: #c76b29;
}

/* Atelier-Sulphurpool Green */
.hljs-string,
.hljs-symbol,
.hljs-bullet {
  color: #ac9739;
}

/* Atelier-Sulphurpool Blue */
.hljs-title,
.hljs-section {
  color: #3d8fd1;
}

/* Atelier-Sulphurpool Purple */
.hljs-keyword,
.hljs-selector-tag {
  /* OPERATIONAL-UI OVERRIDE */
  /* color: #6679cc; */
  color: #1499CE;
}

.hljs {
  display: block;
  overflow-x: auto;
  background: #f5f7ff;
  color: #5e6687;
  padding: 0.5em;
}

.hljs-emphasis {
    font-style: italic;
}

.hljs-strong {
    font-weight: bold;
}
`

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage()
    const styles = renderStatic(() => page.html)
    return { ...page, ...styles }
  }

  constructor(props) {
    super(props)
    const { __NEXT_DATA__, ids } = props
    if (ids) {
      __NEXT_DATA__.ids = ids
    }
  }

  render() {
    return (
      <html>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: baseStylesheet(operational) + highlightJsCss }} />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <title>Operational UI</title>
          <meta name="description" value="Building blocks for effective operational interfaces" />
          <meta name="keywords" value="UI, design systems, React, components, operational" />
          <meta name="viewport" content="user-scalable=1, width=device-width, initial-scale=1" />
          <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/theme/mbo.min.css" />
          <link rel="apple-touch-icon" sizes="57x57" href={`${staticPath}/favicons/apple-icon-57x57.png`} />
          <link rel="apple-touch-icon" sizes="60x60" href={`${staticPath}/favicons/apple-icon-60x60.png`} />
          <link rel="apple-touch-icon" sizes="72x72" href={`${staticPath}/favicons/apple-icon-72x72.png`} />
          <link rel="apple-touch-icon" sizes="76x76" href={`${staticPath}/favicons/apple-icon-76x76.png`} />
          <link rel="apple-touch-icon" sizes="114x114" href={`${staticPath}/favicons/apple-icon-114x114.png`} />
          <link rel="apple-touch-icon" sizes="120x120" href={`${staticPath}/favicons/apple-icon-120x120.png`} />
          <link rel="apple-touch-icon" sizes="144x144" href={`${staticPath}/favicons/apple-icon-144x144.png`} />
          <link rel="apple-touch-icon" sizes="152x152" href={`${staticPath}/favicons/apple-icon-152x152.png`} />
          <link rel="apple-touch-icon" sizes="180x180" href={`${staticPath}/favicons/apple-icon-180x180.png`} />
          <link rel="icon" type="image/png" sizes="192x192" href={`${staticPath}/favicons/android-icon-192x192.png`} />
          <link rel="icon" type="image/png" sizes="32x32" href={`${staticPath}/favicons/favicon-32x32.png`} />
          <link rel="icon" type="image/png" sizes="96x96" href={`${staticPath}/favicons/favicon-96x96.png`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`${staticPath}/favicons/favicon-16x16.png`} />
          <link rel="manifest" href={`${staticPath}/favicons/manifest.json`} />
          <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.js" />
          <script
            type="text/javascript"
            src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/mode/javascript/javascript.min.js"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
