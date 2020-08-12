import "../scss/main.scss";
import "../../assets/Fonts/fonts.scss";
import "../../assets/Icons/icons.scss";

let makingOfDivWidth: number, makingOfVideosDivWidth: number;
const makingOfDiv = <HTMLDivElement>(
    document.querySelector(".making-of-container")
);
const makingOfVideosDiv = <HTMLDivElement>(
    document.querySelector(".making-of-container .videos-container .wrapper")
);

let makingOfLeftButton = <HTMLElement>(
    document.querySelector(".making-of-container .head i:first-child")
);
let makingOfRightButton = <HTMLElement>(
    document.querySelector(".making-of-container .head i:last-child")
);
let searchInput = <HTMLInputElement>document.querySelector("#search");

searchInput.addEventListener("keyup", (event: any) => {
    if (event.which == 13) {
        window.location.href = `/dist/?q=${searchInput.value}`;
    }
});

makingOfLeftButton.addEventListener("click", (e: any): void => {
    makingOfVideosDiv.style.left = `0`;
    makingOfLeftButton.classList.toggle("disabled");
    makingOfRightButton.classList.toggle("disabled");
});

makingOfRightButton.addEventListener("click", (e: any): void => {
    makingOfVideosDiv.style.left = `${
        makingOfDivWidth - makingOfVideosDivWidth
    }px`;
    makingOfLeftButton.classList.toggle("disabled");
    makingOfRightButton.classList.toggle("disabled");
});

const setPosterData = async (q?: string): Promise<void> => {
    if (!q) {
        q = "john+wick";
    }
    let response: any;
    response = await fetch(`http://www.omdbapi.com/?apikey=ca32bee4&t=${q}`);
    if (!response.ok) {
        return;
    }

    let data: any;
    data = await response.json();

    const poster = <HTMLImageElement>(
        document.querySelector(".poster-container .poster-pic img")
    );
    poster.src = data.Poster;
    const posterText = <HTMLElement>(
        document.querySelector(".poster-container .poster-text")
    );
    posterText.querySelector(".title").innerHTML = data.Title;
    posterText.querySelector(".plot p").innerHTML = data.Plot;
    posterText.querySelector(".credit #director").innerHTML = data.Director;
    posterText.querySelector(".credit #writer").innerHTML = data.Writer;
    posterText.querySelector(".credit #released").innerHTML = data.Released;
    posterText.querySelector(".credit #genre").innerHTML = data.Genre;
    posterText.querySelector(".credit #runtime").innerHTML = data.Runtime;
};

function getParameterByName(name: string, url?: string) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const intializing = () => {
    makingOfDivWidth = makingOfDiv.offsetWidth;
    makingOfVideosDivWidth = makingOfVideosDiv.scrollWidth;
    makingOfLeftButton.classList.toggle("disabled");
    makingOfRightButton.classList.toggle("disabled");
    if (makingOfDivWidth < makingOfVideosDivWidth) {
        makingOfRightButton.classList.toggle("disabled");
    }

    const makingOfVideosContainerDiv = <HTMLDivElement>(
        document.querySelector(".making-of-container .videos-container")
    );
    makingOfVideosContainerDiv.style.height =
        makingOfVideosDiv.offsetHeight + "px";

    setPosterData(getParameterByName("q"));
};

intializing();
