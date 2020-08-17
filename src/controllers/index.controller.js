const indexControl = {};

indexControl.renderAlIndeX = (req, res) => {
    res.render('index');
};

indexControl.renderAlAbout = (req, res) => {
    res.render('about');
};

module.exports = indexControl;