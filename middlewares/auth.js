const isLoggedIn = ((req, res, next) => {
    console.log(req.session);

    if (!req.session.UserId) {
        res.redirect(`/login?error=Please login first! 👿💢`)
    }else{
        next()
    }
  })

const isAdmin = ((req, res, next) => {
    console.log(req.session);
    
    if (req.session.UserId && req.session.role != `admin`) {
        res.redirect(`/login?error=You have no access, You are not Admin 👿💢`)
    }else{
        next()
    }
  })

  module.exports = {isLoggedIn, isAdmin}