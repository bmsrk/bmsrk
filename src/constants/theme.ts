export const theme = {
  colors: {
    primary: '#0078d4',
    primaryHover: '#005a9e',
    primaryLight: '#eff6fc',
    background: {
      main: '#f3f2f1',
      white: '#ffffff',
      gray: '#faf9f8',
    },
    border: {
      light: '#edebe9',
      medium: '#e1dfdd',
    },
    text: {
      primary: '#201f1e',
      secondary: '#323130',
      muted: '#605e5c',
    },
    status: {
      error: '#d13438',
      errorBg: '#fde7e9',
      success: '#107c10',
      successBg: '#dff6dd',
    },
  },
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
  },
  typography: {
    fontFamily: '"Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
    fontSize: {
      xs: '11px',
      sm: '12px',
      base: '13px',
      md: '14px',
      lg: '15px',
      xl: '18px',
      '2xl': '21px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
    },
  },
  shadows: {
    fluent: '0 1.6px 3.6px 0 rgba(0,0,0,0.132), 0 0.3px 0.9px 0 rgba(0,0,0,0.108)',
    fluentHover: '0 3.2px 7.2px 0 rgba(0,0,0,0.132), 0 0.6px 1.8px 0 rgba(0,0,0,0.108)',
  },
  borderRadius: {
    none: '0',
    sm: '2px',
    md: '4px',
  },
  transitions: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
} as const;

export type Theme = typeof theme;
