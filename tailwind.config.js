/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
        "colors": {
            "error": "#ffb4ab",
            "primary": "#4be277",
            "on-background": "#dce5d9",
            "outline": "#869585",
            "on-tertiary-container": "#3e3f47",
            "secondary-fixed": "#e2e2e2",
            "on-primary-container": "#004b1e",
            "surface-container-high": "#242c24",
            "tertiary-fixed": "#e2e1eb",
            "on-primary-fixed": "#002109",
            "on-secondary": "#2f3131",
            "tertiary-fixed-dim": "#c6c6cf",
            "surface": "#0e150e",
            "on-error": "#690005",
            "on-secondary-container": "#b4b5b5",
            "inverse-surface": "#dce5d9",
            "tertiary-container": "#ababb4",
            "on-secondary-fixed-variant": "#454747",
            "surface-dim": "#0e150e",
            "secondary-fixed-dim": "#c6c6c7",
            "surface-tint": "#4ae176",
            "on-surface": "#dce5d9",
            "on-primary": "#003915",
            "surface-container": "#1a221a",
            "on-surface-variant": "#bccbb9",
            "background": "#0e150e",
            "surface-container-highest": "#2f372e",
            "on-tertiary-fixed": "#1a1b22",
            "outline-variant": "#3d4a3d",
            "surface-container-low": "#161d16",
            "error-container": "#93000a",
            "on-error-container": "#ffdad6",
            "primary-fixed-dim": "#4ae176",
            "surface-bright": "#333b33",
            "on-tertiary": "#2f3037",
            "on-tertiary-fixed-variant": "#45464e",
            "inverse-primary": "#006e2f",
            "primary-container": "#22c55e",
            "secondary": "#c6c6c7",
            "secondary-container": "#454747",
            "tertiary": "#c7c6d0",
            "on-primary-fixed-variant": "#005321",
            "primary-fixed": "#6bff8f",
            "surface-container-lowest": "#091009",
            "on-secondary-fixed": "#1a1c1c",
            "surface-variant": "#2f372e",
            "inverse-on-surface": "#2a322a"
        },
        "borderRadius": {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
        },
        "spacing": {
            "grid-gutter": "20px",
            "container-padding": "24px",
            "stack-gap": "16px",
            "base": "8px",
            "section-gap": "64px"
        },
        "fontFamily": {
            "headline-md": ["Plus Jakarta Sans", "sans-serif"],
            "label-sm": ["Geist", "sans-serif"],
            "headline-lg": ["Plus Jakarta Sans", "sans-serif"],
            "display-xl": ["Plus Jakarta Sans", "sans-serif"],
            "body-md": ["Inter", "sans-serif"],
            "display-xl-mobile": ["Plus Jakarta Sans", "sans-serif"],
            "body-lg": ["Inter", "sans-serif"]
        },
        "fontSize": {
            "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
            "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "500"}],
            "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
            "display-xl": ["64px", {"lineHeight": "72px", "letterSpacing": "-0.04em", "fontWeight": "800"}],
            "display-xl-mobile": ["40px", {"lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "800"}],
            "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
            "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}]
        }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
