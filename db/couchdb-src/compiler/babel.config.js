function babelConfig() {
  const presets = [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
  ];
  const plugins = [];

  return {
    presets,
    plugins,
  };
}

module.exports = babelConfig;
