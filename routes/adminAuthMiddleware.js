//

function isAdmin(req, res, next) {
    // Check if the user is authenticated and is an admin
    if (req.isAuthenticated() && req.user.isAdmin) {
        // User is authenticated and is an admin, proceed to the next middleware
        return next();
    }
    // If not an admin, redirect to some error page or unauthorized page
    return res.redirect('/');
}

module.exports = isAdmin;
