module.exports = api => {
    api.cache.using(() => process.env.NODE_ENV)
    return {
        presets: [
            "@babel/preset-typescript",
            [
                "@babel/preset-env",
                {
                    loose: true,
                    targets: {
                        node: "current",
                        // module: false,
                        browsers: ["chrome >= 47", "firefox >= 51", "ie >= 11", "safari >= 8", "ios >= 8", "android >= 4"],
                    },
                },
            ],
        ],
        plugins: [
            [
                "babel-plugin-root-import",
                {
                    root: __dirname,
                    rootPathPrefix: "~",
                    rootPathSuffix: "src",
                },
            ],
            ["@babel/plugin-proposal-object-rest-spread", { loose: true }],
            ["@babel/plugin-proposal-optional-chaining", { loose: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }],
            "lodash",
        ],
    }
}
