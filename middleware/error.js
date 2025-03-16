const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ msg: err.message });
  } else {
    res.status(505).json({ msg: err.message });
  }
};

export default errorHandler;
