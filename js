const main = document.querySelector("main");
const fajnaLista = ["Fajna koala", "Fajna strona", "Fajny projekt"];
const loremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function premiumImgEffect() {
    document.querySelectorAll("img").forEach((img) => {
        img.classList.add("img-loading");
        img.addEventListener("load", () => {
            img.classList.add("img-loaded");
        });
    });
}

function mainPage() {
    const section1 = document.createElement("section");
    const h2_a = document.createElement("h2");
    h2_a.textContent = "Cool Koala";
    const img = document.createElement("img");
    img.src =
        "https://copilot.microsoft.com/th/id/BCO.4d320453-b534-4e6c-8a8e-e052dd094b00.png";
    img.alt = "Fajna koala AI generated image";
    section1.appendChild(h2_a);
    section1.appendChild(img);
    main.appendChild(section1);

    const section2 = document.createElement("section");
    const h2_b = document.createElement("h2");
    h2_b.textContent = "Lista fajności";
    section2.appendChild(h2_b);
    const ol = document.createElement("ol");
    fajnaLista.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        ol.appendChild(li);
    });
    section2.appendChild(ol);
    main.appendChild(section2);
    premiumImgEffect();
}

function oNasPage() {
    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    h2.textContent = "O nas";
    const p = document.createElement("p");
    p.textContent =
        "Jesteśmy grupą pasjonatów tworzenia stron internetowych. Naszym celem jest dostarczanie wysokiej jakości treści i inspiracji dla wszystkich, którzy interesują się web developmentem. Na naszej stronie znajdziesz artykuły, poradniki oraz przykłady projektów, które pomogą Ci rozwijać swoje umiejętności i tworzyć niesamowite strony internetowe.";
    article.appendChild(h2);
    article.appendChild(p);

    for (let i = 0; i < 6; i++) {
        const p = document.createElement("p");
        p.textContent = loremIpsum;
        article.appendChild(p);
    }

    main.appendChild(article);
}

function kontaktPage() {
    const form = document.createElement("form");
    form.action = "#";
    form.method = "post";

    const h2 = document.createElement("h2");
    h2.textContent = "Kontakt";
    form.appendChild(h2);
    const labelName = document.createElement("label");
    labelName.htmlFor = "name";
    labelName.textContent = "Imię:";
    form.appendChild(labelName);
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.id = "name";
    inputName.name = "name";
    inputName.required = true;
    form.appendChild(inputName);
    const labelEmail = document.createElement("label");
    labelEmail.htmlFor = "email";
    labelEmail.textContent = "Email:";
    form.appendChild(labelEmail);
    const inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.id = "email";
    inputEmail.name = "email";
    inputEmail.required = true;
    form.appendChild(inputEmail);
    const labelMessage = document.createElement("label");
    labelMessage.htmlFor = "message";
    labelMessage.textContent = "Wiadomość:";
    form.appendChild(labelMessage);
    const textareaMessage = document.createElement("textarea");
    textareaMessage.id = "message";
    textareaMessage.name = "message";
    textareaMessage.rows = 5;
    textareaMessage.required = true;
    form.appendChild(textareaMessage);
    const buttonSubmit = document.createElement("button");
    buttonSubmit.type = "submit";
    buttonSubmit.textContent = "Wyślij";
    form.appendChild(buttonSubmit);

    main.appendChild(form);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Dziękujemy za kontakt! Odpowiemy najszybciej jak to możliwe.");
        form.reset();
    });
}
// mainPage();
// oNasPage();
//kontaktPage();

document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        router(link);
    });
});

function router(link) {
    let url
    if (!link) {
        url = window.location.pathname
    } else {
        url = link.getAttribute("href");
    }

    history.pushState(null, null, url);
    main.replaceChildren();
    switch (url) {
        case "/":
            mainPage();
            break;
        case "/o-nas":
            oNasPage();
            break;
        case "/kontakt":
            kontaktPage();
            break;
        default:
            mainPage();
    }
}
router();

window.addEventListener("popstate", () => {
    router();
});


// Funkcja mierząca czas wykonania
function measureExecutionTime(fn, iterations = 20, label = "Test") {
    const times = [];

    for (let i = 0; i < iterations; i++) {
        // Czyścimy main, aby każdy test zaczynał od zera
        main.replaceChildren();

        const start = performance.now();
        fn();
        const end = performance.now();

        times.push(end - start);
    }

    const avg = times.reduce((a, b) => a + b, 0) / iterations;

    console.group(`⏱️ Wyniki dla: ${label}`);
    console.log(`Średni czas (${iterations} powtórzeń): ${avg.toFixed(3)} ms`);
    // console.log("Pojedyncze pomiary:", times.map(t => t.toFixed(3)));
    // console.groupEnd();
}

// --- Pomiary dla wszystkich stron ---

function measureAllPages(wersja = "standardowa") {
    console.log(
        `%c🚀 Mierzenie czasu wykonania dla wersji: ${wersja}`,
        "color: #00ff33; background-color: #000000; padding: 5px; border-radius: 5px;"
    );


    if (wersja === "standardowa") {
        measureExecutionTime(mainPage, 2000, "mainPage()");
        measureExecutionTime(oNasPage, 2000, "oNasPage()");
        measureExecutionTime(kontaktPage, 2000, "kontaktPage()");
    } else {
        measureExecutionTime(new_mainPage, 2000, "new_mainPage()");
        measureExecutionTime(new_oNasPage, 2000, "new_oNasPage()");
        measureExecutionTime(new_kontaktPage, 2000, "new_kontaktPage()");
    }
}

// Uruchom pomiary:
measureAllPages();

///////////////////////////

// Poprawione funkcje na createDocumentFragment:

///////////////////////////
function new_mainPage() {
    const fragment = document.createDocumentFragment();

    const section1 = document.createElement("section");
    const h2_a = document.createElement("h2");
    h2_a.textContent = "Cool Koala";
    const img = document.createElement("img");
    img.src =
        "https://copilot.microsoft.com/th/id/BCO.4d320453-b534-4e6c-8a8e-e052dd094b00.png";
    img.alt = "Fajna koala AI generated image";
    section1.appendChild(h2_a);
    section1.appendChild(img);
    fragment.appendChild(section1);

    const section2 = document.createElement("section");
    const h2_b = document.createElement("h2");
    h2_b.textContent = "Lista fajności";
    section2.appendChild(h2_b);
    const ol = document.createElement("ol");
    fajnaLista.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        ol.appendChild(li);
    });
    section2.appendChild(ol);
    fragment.appendChild(section2);

    main.appendChild(fragment);
    premiumImgEffect();
}


function new_oNasPage() {
    const fragment = document.createDocumentFragment();

    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    h2.textContent = "O nas";
    article.appendChild(h2);
    const p = document.createElement("p");
    p.textContent =
        "Jesteśmy grupą pasjonatów tworzenia stron internetowych. Naszym celem jest dostarczanie wysokiej jakości treści i inspiracji dla wszystkich, którzy interesują się web developmentem. Na naszej stronie znajdziesz artykuły, poradniki oraz przykłady projektów, które pomogą Ci rozwijać swoje umiejętności i tworzyć niesamowite strony internetowe.";
    article.appendChild(p);

    for (let i = 0; i < 6; i++) {
        const p = document.createElement("p");
        p.textContent = loremIpsum;
        article.appendChild(p);
    }

    fragment.appendChild(article);
    main.appendChild(fragment);
}

function new_kontaktPage() {
    const fragment = document.createDocumentFragment();

    const form = document.createElement("form");
    form.action = "#";
    form.method = "post";

    const h2 = document.createElement("h2");
    h2.textContent = "Kontakt";
    form.appendChild(h2);
    const labelName = document.createElement("label");
    labelName.htmlFor = "name";
    labelName.textContent = "Imię:";
    form.appendChild(labelName);
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.id = "name";
    inputName.name = "name";
    inputName.required = true;
    form.appendChild(inputName);
    const labelEmail = document.createElement("label");
    labelEmail.htmlFor = "email";
    labelEmail.textContent = "Email:";
    form.appendChild(labelEmail);
    const inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.id = "email";
    inputEmail.name = "email";
    inputEmail.required = true;
    form.appendChild(inputEmail);
    const labelMessage = document.createElement("label");
    labelMessage.htmlFor = "message";
    labelMessage.textContent = "Wiadomość:";
    form.appendChild(labelMessage);
    const textareaMessage = document.createElement("textarea");
    textareaMessage.id = "message";
    textareaMessage.name = "message";
    textareaMessage.rows = 5;
    textareaMessage.required = true;
    form.appendChild(textareaMessage);
    const buttonSubmit = document.createElement("button");
    buttonSubmit.type = "submit";
    buttonSubmit.textContent = "Wyślij";
    form.appendChild(buttonSubmit);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Dziękujemy za kontakt! Odpowiemy najszybciej jak to możliwe.");
        form.reset();
    });

    fragment.appendChild(form);
    main.appendChild(fragment);
}


measureAllPages("Nowe wersje documentFragment");
