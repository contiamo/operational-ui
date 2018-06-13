// Default constants
const buttons = {
  grey: {
    active: {
      borderRadius: "2px",
      backgroundColor: "#e2e2e2",
      color: "#1499CE",
    },
    disabled: {
      borderRadius: "2px",
      borderColor: "#e8e8e8",
      backgroundColor: "#f6f6f6",
      color: "#909090",
    },
  },
  red: {
    active: {
      borderRadius: "2px",
      backgroundColor: "#9A0000",
      color: "#fff",
    },
  },
  green: {
    active: {
      borderRadius: "2px",
      backgroundColor: "#0DAA1F",
      color: "#fff",
    },
  },
  blue: {
    active: {
      borderRadius: "2px",
      backgroundColor: "#1499CE",
      color: "#fff",
    },
  },
  ghost: {
    active: {
      borderRadius: "2px",
      backgroundColor: "rgba(255,255,255,0.33)",
      color: "#fff",
    },
  },
}

const card = {
  boxShadow: "0 1px 3px rgba(0,0,0,0.16)",
  borderTop: "1px solid #e0e0e0",
}

const fontColors = {
  lightest: "#909090",
  lighter: "#747474",
  light: "#666666",
  main: "#545454",
  important: "#333",
  action: "#1499CE",
}

const fontFamilies = {
  main: "Helvetica Neue, Helvetica, Arial, sans-serif",
  code: "Menlo", // Need more fallbacks here
}

const fontSizes = {
  pageTitle: 18,
  main: 14,
  small: 13,
  smaller: 12,
}

const input = {
  border: "1px solid #c0c0c0",
  borderRadius: "2px",
}

const layout = {
  sidebar: {
    // Main Sidebar
    width: 250,
  },
  content: {
    fixedWidth: {
      // Max and min width for all cards if not full-width
      max: 1150,
      min: 800,
    },
    sidebar: {
      width: 280, // Sidebar within content
    },
  },
}

const spacings = {
  big: 28,
  main: 20,
  content: 16,
  small: 8,
}

const page = {
  topBar: {
    height: 44,
  },
  titleBar: {
    big: {
      // big content title (page actions below title)
      height: 100,
    },
    small: {
      // condensed content title (page actions right of title)
      height: 44,
    },
  },
}

const separators = {
  light: "1px solid #ececec",
  main: "1px solid #e8e8e8",
}

const shades = {
  lightest: "#f6f6f6",
  light: "#ededed",
  dark: "#3e3e3e",
}

const constants = {
  buttons,
  card,
  fontColors,
  fontFamilies,
  fontSizes,
  input,
  layout,
  spacings,
  page,
  separators,
  shades,
}

export { constants }
