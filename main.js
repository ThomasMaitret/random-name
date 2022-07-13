import "./style.css";

import * as cheerio from "cheerio";
import prenomsJson from "./prenoms.json";
import axios from "axios";

const isProd = process.env.NODE_ENV === "production";

const URLS = {
  nom: isProd ? "https://nomsdefamille.net/france" : "/name",
  metier: isProd
    ? "https://fr.wikimini.org/wiki/Liste_des_m%C3%A9tiers"
    : "/job",
  picture: isProd
    ? "https://randomuser.me/api?gender=male&inc=gender,picture&noinfo"
    : "/picture",
};

async function get(url) {
  const response = await axios.get(url);
  return response.data;
}

function getFirstname() {
  const prenoms = prenomsJson
    .filter((el) => el.fields.sexe === "M")
    .map((object) => object.fields.prenoms);
  return prenoms[Math.floor(Math.random() * prenoms.length)];
}

async function getLastname() {
  const res = await get(URLS.nom);
  const $ = cheerio.load(res);
  const noms = [];

  $(".list-item a").each((_, el) => {
    noms.push($(el).text().trim());
  });

  return noms[Math.floor(Math.random() * noms.length)];
}

async function getJob() {
  const res = await get(URLS.metier);
  const $ = cheerio.load(res);

  const metiers = [];
  $("div#mw-content-text ul li:not(.toclevel-1)").each((_, el) => {
    metiers.push($(el).text());
  });

  return metiers[Math.floor(Math.random() * metiers.length)];
}

async function getPicture() {
  const res = await get(URLS.picture);
  return res.results[0].picture.large;
}

async function getUserData() {
  const [firstname, lastname, job] = await Promise.all([
    getFirstname(),
    getLastname(),
    getJob(),
  ]);
  return { firstname, lastname, job };
}

getUserData().then(async ({ firstname, lastname, job }) => {
  document.querySelector("#app").innerHTML = `
  <h1>${firstname} ${lastname}, ${job}</h1>
  <img id="picture" loading="lazy" />
  `;

  document.querySelector("#picture").src = await getPicture();
});
