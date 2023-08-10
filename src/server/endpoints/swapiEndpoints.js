const swapiController = require("../../app/swapiController/swapiController");

const applySwapiEndpoints = (server, app) => {
  const logRequest = async (req, res, next) => {
    try {
      await app.db.logging.create({
        action: req.route.path,
        header: JSON.stringify(req.headers),
        ip: req.ip,
      });
    } catch (error) {
      console.error(error);
    }
    next();
  };

  server.get("/hfswapi/test", async (req, res) => {
    const data = await app.swapiFunctions.genericRequest(
      process.env.URL_API,
      "GET",
      null,
      true
    );
    res.send(data);
  });

  server.get("/hfswapi/getPeople/:id", logRequest, async (req, res) => {
    swapiController.getPeople(req, res, app);
  });

  server.get("/hfswapi/getPlanet/:id", logRequest, async (req, res) => {
    swapiController.getPlanet(req, res, app);
  });

  server.get(
    "/hfswapi/getWeightOnPlanetRandom",
    logRequest,
    async (req, res) => {
      swapiController.getWeightOnPlanetRandom(req, res, app);
    }
  );

  server.get("/hfswapi/getLogs", async (req, res) => {
    swapiController.getLogs(req, res, app);
  });
};

module.exports = applySwapiEndpoints;
