import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("home", { title: "Home" });
  // if(result.name === "pedro") {
  //   res.redirect('/private');
  // }
});

router.post("/cookie", (req, res) => {
  const data = req.body;

  return res
    .cookie("CoderCookie", data, { maxAge: 10000 })
    .send({ status: "success", message: "cookie set" });
});

router.get("/getCookies", (req, res) => {
  // const cookies = req.cookies;
  const cookies = req.cookies;
  console.log(cookies['CoderCookie'].name);
  req.session.user = cookies['CoderCookie'].name;
  console.log(req.session.user)
  req.session.admin = true;
  if(cookies['CoderCookie'].name === 'pedro') {
    res.redirect('/private');
  }

  // if(cookies['CoderCookie'].name === 'pedro') {
  //   console.log("es pedro")
  // }
  res.send({ cookies });
  
});

function auth(req, res, next) {
  console.log(req.session?.user);
  if (req.session?.user === "pedro" && req.session?.admin) {
    return next();
  }
  return res
    .status(401)
    .send({ status: "error", message: "Usuario no autorizado" });
}

router.get("/private", auth, (req, res) => {
  res.render("private", { title: "private" });
  // res.send({
  //   status: "success",
  //   message: "Sí estás viendo esto, es porque ya estás logueado",
  // });
});

export default router;
