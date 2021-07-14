function checkUrl() {
    return new URL(location.href).searchParams.get('lang');
}

switch (checkUrl()) {
    case 'en':
        readLanguageFile("localizations/en.json").then((data) => parseData(data));
        break;
    case 'ru':
        readLanguageFile("localizations/ru.json").then((data) => parseData(data));
        document.querySelectorAll('.content .bonus').forEach((el) => {
            el.style.fontSize = `${12}px`;
        })
        break;
    case 'fr':
        readLanguageFile("localizations/fr.json").then((data) => parseData(data));
        document.querySelectorAll('.content .bonus').forEach((el) => {
            el.style.fontSize = `${12}px`;
        })
        break;
    case 'es':
        readLanguageFile("localizations/es.json").then((data) => parseData(data));
        break;
    case 'ja':
        readLanguageFile("localizations/ja.json").then((data) => parseData(data));
        break;
    case 'nl':
        readLanguageFile("localizations/nl.json").then((data) => parseData(data));
        break;
    case 'zh':
        readLanguageFile("localizations/zh.json").then((data) => parseData(data));
        break;
    default:
        history.replaceState('', 'title en', '?lang=en');
        readLanguageFile("localizations/en.json").then((data) => parseData(data));
}

function changeLanguage(lang) {
    history.replaceState('', `title ${lang}`, `?lang=${lang}`);
}

window.onpopstate = () => {
    let urlLang = checkUrl();
    if (urlLang) {
        changeLanguage(urlLang);
    } else {
        let language = navigator.languages[0].substr(0, 2);
        changeLanguage(language);
    }
}

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

document.querySelectorAll('.content input').forEach((el) => {
    if (el.checked) {
        document.querySelector('.content form').action = el.value;
    }
    el.addEventListener('change', () => {
        document.querySelector('.content form').action = el.value;
    })
})

