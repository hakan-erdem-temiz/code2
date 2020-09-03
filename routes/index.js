import routesLoader from '../utils/routesLoader';

export default async function (app) {

  routesLoader(`${__dirname}`).then(files => {
    files.forEach(route => {
      app.use(route.default.routes()).use(
        route.default.allowedMethods({
          throw: true
        })
      );
    });
  });
}
