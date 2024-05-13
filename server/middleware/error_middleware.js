const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Backend errror";
  const extradetails = err.extradetails || "error from backend";

  return res.status({ status, extradetails });
};

module.exports = errorMiddleware;
