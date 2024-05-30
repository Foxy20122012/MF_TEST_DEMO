module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js',
      'src/**/*.jsx',
      'src/**/__tests__/*.test.js',
    ],

    tests: [
      // 'src/**/__tests__/*.js',
      "testing/src/__tests__/HomePage.js"
      
    ],

    env: {
      type: 'node',
      runner: 'node',
    },

  

    testFramework: 'jest',
  };
};
