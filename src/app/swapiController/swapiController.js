const { peopleFactory } = require("../People/index");
const { planetsFactory } = require("../Planet/index");
const { CODES } = require("../response-codes/codes");

const getWeightOnPlanetRandom = async (req, res, app) => {
  try {
    const randomPerson = Math.floor(Math.random() * 83) + 1;
    const randomPlanet = Math.floor(Math.random() * 60) + 1;

    const dataPerson = await peopleFactory(randomPerson, req.query.format, app);
    const dataPlanets = await planetsFactory(randomPlanet, app);

    if (dataPerson?.homeworldId === parseInt(dataPlanets.id)) {
      return res.send(CODES.ERROR_PLANET);
    }
    const calculate = dataPerson?.getWeightOnPlanet(app);
    return res.send({
      ...CODES.DATA_FOUND,
      data: { characterWeight: calculate },
    });
  } catch (error) {
    console.error("error en getWeightOnPlanetRandom:", error);
    res.status(CODES.ERROR.status).send({
      code: CODES.ERROR.code,
      message: CODES.ERROR.message,
      error: error,
    });
  }
};

const getPeople = async (req, res, app) => {
  const id = parseInt(req.params.id);
  const format = req.query.format;

  try {
    const swapi = await peopleFactory(id, format, app);
    if (swapi != null) {
      return res.send({
        ...CODES.DATA_FOUND,
        data: { ...swapi },
      });
    }
  } catch (error) {
    console.error("error en getPeople:", error);
    res.status(CODES.ERROR.status).send({
      code: CODES.ERROR.code,
      message: CODES.ERROR.message,
      error: error,
    });
  }
};

const getPlanet = async (req, res, app) => {
  try {
    const id = req.params.id;
    const dataPlanets = await planetsFactory(id, app);

    if (dataPlanets != null) {
      return res.send({
        ...CODES.DATA_FOUND,
        data: {
          name: dataPlanets.name,
          gravity: dataPlanets.gravity,
        },
      });
    }
  } catch (error) {
    console.error("error en getPlanet:", error);
    res.status(CODES.ERROR_PLANET.status).send({
      code: CODES.ERROR_PLANET.code,
      message: CODES.ERROR_PLANET.message,
      error: error,
    });
  }
};

const getLogs = async (req, res, app) => {
  try {
    const data = await app.db.logging.findAll();

    const result = data.map((actions) => ({
      action: actions.action,
      header: actions.header,
      ip: actions.ip,
    }));
    res.json({ ...CODES.DATA_FOUND, data: result });
  } catch (error) {
    console.error("error en getLogs:", error);
    res.status(CODES.ERROR_LOGS.status).send({
      code: CODES.ERROR_LOGS.code,
      message: CODES.ERROR_LOGS.message,
      error: error,
    });
  }
};

module.exports = { getWeightOnPlanetRandom, getPeople, getPlanet, getLogs };
