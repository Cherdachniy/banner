
function readLanguageFile(file) {
    return new Promise(resolve => {
        let languageFile = new XMLHttpRequest();
        languageFile.open("GET", file, true);

        languageFile.onreadystatechange = () => {
            if (languageFile.readyState === 4 && languageFile.status === 200) {
                resolve(JSON.parse(languageFile.responseText));
            }
        }

        languageFile.send(null);
    });
}

function parseData(data) {
    document.querySelectorAll('[data-set]').forEach((el) => {
        el.innerHTML = data[el.getAttribute('data-set')];
    })
}

function checkUrl() {
    return new URL(location.href).searchParams.get('lang');
}

function changeLanguage(lang) {
    const supported = {
        en: {cs: false},
        ru: {cs: true},
        fr: {cs: true},
        es: {cs: false},
        ja: {cs: false},
        nl: {cs: false},
        zh: {cs: false}
    };

    if (!Object.keys(supported).includes(lang)) {
        lang = 'en';
    }

    history.pushState('', `title ${lang}`, `?lang=${lang}`);

    readLanguageFile(`localizations/${lang}.json`).then((data) => parseData(data));
    if (supported[lang].cs) {
        document.querySelectorAll('.content .bonus').forEach((el) => {
            el.style.fontSize = `${12}px`;
        })
    }
}

window.onload = () => {
    let paramLang = checkUrl();
    if (!paramLang) {
        changeLanguage(navigator.language.substr(0, 2));
    } else {
        changeLanguage(paramLang);
    }
}

document.querySelectorAll('.content input').forEach((el) => {
    if (el.checked) {
        document.querySelector('.content form').action = el.value;
    }
    el.addEventListener('change', () => {
        document.querySelector('.content form').action = el.value;
    })
})
