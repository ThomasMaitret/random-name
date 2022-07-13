import "./style.css";

import * as cheerio from "cheerio";
import prenomsJson from "./prenoms.json";

async function get(url) {
  const response = await fetch(url);
  return await response.text();
}

function getPrenom() {
  const prenoms = prenomsJson
    .filter((el) => el.fields.sexe === "M")
    .map((object) => object.fields.prenoms);
  return prenoms[Math.floor(Math.random() * prenoms.length)];
}

async function getNom() {
  const res = await get("/noms");
  const $ = cheerio.load(res);
  const noms = [];

  $(".list-item a").each((_, el) => {
    noms.push($(el).text().trim());
  });

  return noms[Math.floor(Math.random() * noms.length)];
}

async function getMetier() {
  const res = await get("/metiers");
  const $ = cheerio.load(res);

  const metiers = [];
  $("div#mw-content-text ul li:not(.toclevel-1)").each((_, el) => {
    metiers.push($(el).text());
  });

  return metiers[Math.floor(Math.random() * metiers.length)];
}

async function getPicture() {
  const res = await get("/picture");
  const json = await JSON.parse(res);
  return json.results[0].picture.large;
}

async function getUserData() {
  const [prenom, nom, metier] = await Promise.all([
    getPrenom(),
    getNom(),
    getMetier(),
  ]);
  return { prenom, nom, metier };
}

getUserData().then(async ({ prenom, nom, metier }) => {
  document.querySelector("#app").innerHTML = `
  <h1>${prenom} ${nom}, ${metier}</h1>
  <img id="picture" loading="lazy" />
  `;

  document.querySelector("#picture").src = await getPicture();
});
