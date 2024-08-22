
export default (config, { strapi })=> {
  return (context, next) => {
    console.log("#################################");
    console.log("In public-user-data middleware.");
    console.log("#################################");






    return next();
  };
};