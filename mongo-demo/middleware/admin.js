function AdminCheckHandler(req,res,next){
if (!req.user.isAdmin) {
    return res.status(403).send("No Acess , You cant  acess this");

}
next();
}
module.exports=AdminCheckHandler