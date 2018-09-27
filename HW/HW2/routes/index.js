module.exports.home = function(req, res){
  res.render("home", {"links": [
    "/cats/new",
    "/cats",
    "/cats/delete/old",
    "/cats/bycolor/tan",
    "/cats/bycolor/black",
    "/cats/bycolor/white"
    ]
  });
};
