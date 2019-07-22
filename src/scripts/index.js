import add from "./lib/add";

const heading = document.querySelector("h1");
heading.textContent = `${heading.textContent}: 2 + 2 = ${add(2, 2)}`;
