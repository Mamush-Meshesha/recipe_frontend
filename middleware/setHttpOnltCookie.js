export default function (req, res, next) {
  const accessToken = cookie("accessToken").value; 

  if (accessToken) {
   
    res.setHeader("Set-Cookie", `accessToken=${accessToken}; HttpOnly`);
  }

  next();
}
