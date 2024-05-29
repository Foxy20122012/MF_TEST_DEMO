module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js',
      'src/**/*.jsx',
      '!src/**/__tests__/*.test.js',
    ],

    tests: [
      'src/**/__tests__/*.jsx',
      
    ],

    env: {
      type: 'node',
      runner: 'node',
    },

  

    testFramework: 'jest',
  };
};
