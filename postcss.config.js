module.exports = {
  plugins: {
    autoprefixer: {},
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    cssnano: {
      preset: [
        "default",
        {
          cssDeclarationSorter: false,
          reduceIdents: false,
        },
      ],
    },
    "postcss-preset-env": {
      precalculate: false,
      features: {
        "logical-properties-and-values": false,
      },
    },
  },
};
