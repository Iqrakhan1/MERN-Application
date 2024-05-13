// schema.parseAsync(red.body) it is line where you use Zod to validate th arequest body data against the adefine schema

const validet = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    //for geeting error from zod validation is data was not entered by use
    const status = 422;
    const message = "please fill all inputs properly ";
    const extradetails = err.errors[0].message;

    console.log(message);
    const error = {
      status,
      message,
      extradetails,
    };
    // res.status(400).json({ msg: message });
    next(error);
  }
};

module.exports = validet;
