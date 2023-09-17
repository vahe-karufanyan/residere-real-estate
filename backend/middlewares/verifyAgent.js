const verifyAgent = async (req, res, next) => {
  if(req.user.role === "agent") {
  console.log(' req.user.role::: ',  req.user);
    next()
  } else {
    return res.status(403).json({ message: 'only agents can manipulate properties' });
  }
};
module.exports = verifyAgent;
