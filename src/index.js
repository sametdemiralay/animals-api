import express from "express";
import { animals } from "./staticData/index.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hi samco!" });
});

// Hepsini yada Filtrelenmiş Halini Getirme (Query Parameters)
// .../api/animals
// .../api/animals?filter=name&value=in
app.get("/api/animals", (request, response) => {
  console.log(request.query);
  const {
    query: { filter, value },
  } = request;

  if (filter && value) {
    return response.send(
      animals.filter((animal) => animal[filter].includes(value))
    );
  }

  return response.send(animals);
});

// Tek Birini Getirme id ye göre (Route Parameters)
// .../api/animals/3
app.get("/api/animals/:id", (request, response) => {
  console.log(request.params);
  const parsedId = parseInt(request.params.id);

  if (isNaN(parsedId)) {
    return response.status(400).send({ msg: "Bad Request. Invalid ID." });
  }

  const findUser = animals.find((animal) => animal.id === parsedId);
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

app.listen(PORT, () => {
  console.log(`Running on Port: ${PORT}`);
});
