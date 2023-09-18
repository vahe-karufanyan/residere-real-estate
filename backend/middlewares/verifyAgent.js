const verifyAgent = async (req, res, next) => {
  if(req.user.agent) {
    next()
  } else {
    return res.status(403).json({ message: 'only agents can manipulate properties' });
  }
};
module.exports = verifyAgent;
