//  <<--MAINCONTROLLER-->>   //
module.exports = {
    root: function(req, res) {
        res.render('home')
    },
    cuenta: function(req, res){
        res.render('cuenta')
    },
    login: function(req, res){
        res.render('login')
    },
    registro: function(req, res){
        res.render('registro')
    }
};

