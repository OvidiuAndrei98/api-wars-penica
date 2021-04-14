const API = "https://swapi.dev/api/";
var i = 1;
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let residentsList = [];

function clearMain() {
    const main = document.querySelector(".table");
    main.innerHTML = "";
    return main;
}

async function modifyTable(obj, index) {
    const dataToModify = document.querySelectorAll(
        `table tbody tr:nth-child(${index + 1}) td`
    );
    const props = [
        "name",
        "diameter",
        "climate",
        "terrain",
        "surface_water",
        "population",
        "residents",
    ];
    dataToModify.forEach((data, x) => {
        if (props[x] === "residents") {
            data.innerHTML = `<a>${obj[props[x]].length}</a>`;
            data.classList.add("residents-button");
        } else {
            data.innerHTML = obj[props[x]];
        }
        data.dataset.planet = obj.url.split("planets/")[1];
    });
}

async function loadData(i) {
    let url = API + "planets/?page=" + i;
    let request = await fetch(url);
    let response = await request.json();

    if (response.results.length > 0) {
        let temp = "";
        response.results.forEach((u) => {
            temp += "<tr>";
            temp += "<td>" + u.name + "</td>";
            temp += "<td>" + u.diameter + "</td>";
            temp += "<td>" + u.climate + "</td>";
            temp += "<td>" + u.terrain + "</td>";
            temp += "<td>" + u.surface_water + "</td>";
            temp += "<td>" + u.population + "</td>";
            temp += "<td>" + u.residents + "</td></tr>";
        });
        document.getElementById("tableData").innerHTML = temp;
    }

    response.results.forEach((obj, index) => {
        residentsList.push(obj["residents"]);
        modifyTable(obj, index);
    });
    let btn = document.querySelectorAll(".residents-button");
    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];
    let modalContent = document.querySelector(".modal-content");

    for (let button of btn) {
        button.onclick = function (e) {
            loadResidents(residentsList, button.dataset.planet);
            modal.style.display = "block";
        };

        span.onclick = function () {
            modal.style.display = "none";
        };

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }
}

async function loadNextData(action) {
    if (action.innerHTML == "Next") {
        i++;
    } else {
        i--;
    }
    loadData(i);
}

next.addEventListener("click", () => loadNextData(next));
prev.addEventListener("click", () => loadNextData(prev));

async function loadResidents(residents, index) {
    let eachPlanet = [];
    let newIndex = index.split("/");

    residents[newIndex[0] - 1].forEach(async (obj) => {
        let url = obj;
        let request = await fetch(url);
        let response = await request.json();
        eachPlanet.push(response);

        if (eachPlanet.length > 0) {
            let temp = "";
            eachPlanet.forEach((u) => {
                temp += "<tr>";
                temp += "<td>" + u.name + "</td>";
                temp += "<td>" + u.height + "</td>";
                temp += "<td>" + u.mass + "</td>";
                temp += "<td>" + u.hair_color + "</td>";
                temp += "<td>" + u.skin_color + "</td>";
                temp += "<td>" + u.eye_color + "</td>";
                temp += "<td>" + u.birth_year + "</td>";
                temp += "<td>" + u.gender + "</td></tr>";
            });
            document.querySelector("#tableDataModal").innerHTML = temp;
        }
    });
}

loadData(i);
