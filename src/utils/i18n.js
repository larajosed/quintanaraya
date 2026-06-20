import { createInstance } from "i18next";

const initI18next = async (lang, ns) => {
    const i18nInstance = createInstance();
    await i18nInstance
        .init({
            lng: lang,
            fallbackLng: "es",
            supportedLngs: ["es", "en"],
            ns: ns,
            defaultNS: "common",
            resources: {
                es: {
                    common: require("../dictionaries/es.json"),
                },
                en: {
                    common: require("../dictionaries/en.json"),
                },
            },
        });
    return i18nInstance;
};

export default initI18next;