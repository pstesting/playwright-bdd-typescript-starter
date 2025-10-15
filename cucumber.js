const common = {
  require: ['src/**/*.ts'],
  requireModule: ['ts-node/register'],
  format: [
    'progress',
    'html:cucumber-report.html',
    'json:cucumber-report.json',
    ['allure-cucumberjs/reporter', 'allure-results']
  ],
  formatOptions: {
    snippetInterface: 'async-await'
  },
  publishQuiet: true
};

module.exports = {
  default: {
    ...common,
    parallel: 2,
    paths: ['src/features/**/*.feature']
  },
  headed: {
    ...common,
    parallel: 1,
    paths: ['src/features/**/*.feature'],
    worldParameters: {
      headed: true
    }
  },
  browserstack: {
    ...common,
    parallel: 3,
    paths: ['src/features/**/*.feature'],
    worldParameters: {
      browserstack: true
    }
  }
};
