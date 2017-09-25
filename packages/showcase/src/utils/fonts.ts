const appFontFace: {
    fontFamily: string
    fontStyle: string
    path: string
  } = {
    fontFamily: "Proxima Nova",
    fontStyle: "normal",
    path: "/fonts/proximanova"
  },
  appFontWeights: number[] = [300, 400, 600],
  appFontExtensions: string[] = ["woff2", "woff", "eot", "svg", "ttf"],
  getFontSrcString = (weight: number) => (
    {
      fontFamily,
      path
    }: {
      fontFamily: string
      path: string
    } = appFontFace
  ) => (extensions: string[] = appFontExtensions) => {
    let cssUrl: string = `local('${fontFamily}')`

    extensions.forEach((extension: string): string => {
      cssUrl += `, url('${path}/${weight}.${extension}')`
      return cssUrl
    })

    return { src: cssUrl }
  }

export { appFontFace, appFontWeights, getFontSrcString }
