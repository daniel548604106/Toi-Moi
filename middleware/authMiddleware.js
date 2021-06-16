const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).send('Unauthorized');
    console.log('authorization', req.headers.authorization);
    const data = jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.JWT_SECRET
    );
    console.log('hi', data);
    if (!data) return res.status(401).send('Unauthorized');
    req.userId = data.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send('Unauthorized');
  }
};
