
export default (config, { strapi })=> {
  return (context, next) => {
    console.log("#################################");
    strapi.log.info("In is-user-owner middleware.");
    console.log("#################################");



    if  (!context.state.user) {
      strapi.log.error("You are not authenticated.");
      return context.badRequest("You are not authenticated.");
    }

    const params = context.params;
    const currentUserId = context.state?.user?.id;
    const requestedUserId = params?.id;

    console.log("currentUserId", Number(currentUserId));
    console.log("requestedUserId", Number(requestedUserId));

    if (!requestedUserId) {
      strapi.log.error("Missing user ID.");
      return context.badRequest("Missing or invalid user ID.");
    }

    if (Number(currentUserId) !== Number(requestedUserId)) {
      return context.unauthorized("You are not authorized to perform this action.");
    }

    return next();
  };
};