const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  webpack: {
    alias: {
      "~": `${path.resolve(__dirname)}/src`,
    },
    configure: (webpackConfig) => {
      webpackConfig.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
            keep_fnames: true,
          },
        }),
      ];

      return webpackConfig;
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^~(.*)$": "<rootDir>/src$1",
      },
      moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
      transform: {
        ".+\\.(css|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
        "^.+\\.tsx?$": "ts-jest",
      },
      transformIgnorePatterns: ["/node_modules/"],
      testMatch: [
        "**/**/*.test.(js|jsx|ts|tsx)|**/tests/unit/specs/*.(js|jsx|ts|tsx)",
      ],
      testURL: "http://localhost/",
      globals: {
        "ts-jest": {
          babelConfig: true,
        },
      },
      setupFiles: ["./tests/unit/jest.setup.js"],
    },
  },
  babel: {
    loaderOptions: {
      cacheDirectory: false,
    },
    plugins: [],
  },
};
