// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {
    const userRoutes = strapi.plugins['users-permissions'].routes["content-api"].routes;
    console.log(userRoutes);

    const isUserOwnerMiddleware = "global::is-user-owner";
    const publicUserDataMiddleware = "global::public-user-data";


    const findOneUser = userRoutes.findIndex(
      (route) => route.handler === "user.findOne" && route.method === "GET"
    )

    const findAllUsers = userRoutes.findIndex(
      (route) => route.handler === "user.find" && route.method === "GET"
    )

    const findUpdateUser = userRoutes.findIndex(
      (route) => route.handler === "user.update" && route.method === "PUT"
    );

    function initializeRoute(routes, index) {
      routes[index].config.middlewares = routes[index].config.middlewares || [];
      routes[index].config.policies = routes[index].config.policies || [];
    }

    if (findAllUsers) {
      console.log("Should add public-user-data middleware to findAllUsers");
      initializeRoute(userRoutes, findAllUsers);
      userRoutes[findAllUsers].config.middlewares.push(publicUserDataMiddleware);
    }

    if (findOneUser) {
      initializeRoute(userRoutes, findOneUser);
      userRoutes[findOneUser].config.middlewares.push(isUserOwnerMiddleware);
    }

    if (findUpdateUser) {
      initializeRoute(userRoutes, findUpdateUser);
      userRoutes[findUpdateUser].config.middlewares.push(isUserOwnerMiddleware);
    }
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
