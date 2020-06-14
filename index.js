import { readFileSync, writeFile } from 'fs';

//let states = [];

const jsonStates = readFileSync('./Estados.json', 'utf8');
const statesList = JSON.parse(jsonStates);
const jsonCities = readFileSync('./Cidades.json', 'utf8');
const citiesList = JSON.parse(jsonCities);

const states = statesList.map((state) => {
  const city = citiesList.map((city) => {
    const { ID, Nome, Estado } = city;

    return {
      id: ID, name: Nome, idState: Estado,
    };
  })
    .filter((city) => {
      return city.idState === state.ID;

    });
  const { ID, Nome, Sigla } = state;

  return {
    id: ID,
    name: Nome,
    uf: Sigla,
    cities: JSON.stringify(city),
  };
})
  .sort((a, b) => {
    //return a.Nome - b.Nome;
    return a.name.localeCompare(b.name);
  });

states.forEach((element) => {
  writeFile(`./Estados/${element.uf}.json`, JSON.stringify(element), function (err, _result) {
    if (err) console.log('error', err);
  })

  console.log(citiesList);
});
