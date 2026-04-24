// import jwt from "jsonwebtoken";

// export const protect = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({ msg: "No token" });
//     }

//     // Bearer token
//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded; // 🔥 இங்க தான் user set ஆகுது

//     next();
//   } catch (err) {
//     return res.status(401).json({ msg: "Invalid token" });
//   }
// };








// import jwt from "jsonwebtoken";

// export const protect = (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return res.status(401).json({ msg: "No token" });
//   }

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   req.user = { id: decoded.id };  // 🔥 THIS MUST EXIST

//   next();
// };




import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
       role: decoded.role
    };

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};