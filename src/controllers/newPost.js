module.exports = (req, res) => {
    var title = "";
    var body = "";
    const data = req.flash("formData")[0];
    if (typeof data !== "undefined") {
        title = data.title;
        body = data.body;
    }

    if (!req.session.userId) {
        return res.redirect("/auth/login");
    }
    res.render("create",{
        errors: req.flash("validationErrors") || [],
        title: title,
        body: body
    });
}