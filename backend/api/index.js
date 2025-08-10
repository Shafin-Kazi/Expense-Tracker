module.exports = (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "TrakHive API is working!",
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url
    });
};
