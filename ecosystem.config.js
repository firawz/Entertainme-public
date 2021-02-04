module.exports = {
  apps : [{
    name: "latihan-graphql",
    script: 'node ./entertainMe/Server/orchestrators/graphql/app.js',
  }, {
    name: "Movies",
    script: 'node ./entertainMe/Server/services/Movies/app.js',
  },{
    name:"TvSeries",
    script: 'node ./entertainMe/Server/services/TvSeries/app.js',
  }],
};
