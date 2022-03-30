module.exports = async (err, _req, res, _next) => {
  if ('code' in err) {
    return res.status(err.code).json({ message: err.message });
  }
  console.log(err)
  return res.status(400).json({ message: err.message });
};