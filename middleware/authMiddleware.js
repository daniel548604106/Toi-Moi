const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).send('Unauthorized');
    const data = jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.JWT_SECRET
    );
    if (!data) return res.status(401).send('Unauthorized');
    req.userId = data.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send('Unauthorized');
  }
};
