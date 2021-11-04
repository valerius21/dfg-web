import { config } from "config";

export const resources = {
  en: {
    translation: {
      title: "Project",
      description:
        config.DESCRIPTION_EN ||
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore commodi tempora quibusdam! Fuga voluptatum obcaecati possimus modi quas mollitia cumque dignissimos eius placeat. Veritatis praesentium vel similique, aut eaque odio!",
      start: "Get started",
      startUID: "Continue with User ID",
      questionOne: "Classify the picture regarding its sensitivity.",
      questionTwo: "With whom would you be most likely to share this picture?",
      a11: "very private",
      a12: "little private",
      a13: "private",
      a14: "maybe private",
      a15: "non-private / public",
      a16: "not possible",
      a21: "Friends",
      a22: "Family",
      a23: "Colleagues",
      a24: "Acquaintance",
      a25: "Nobody",
      a26: "Everybody",
      submit: "Submit",
      done: "Done! 🎉",
      thanks: "Thanks for participating.",
      close: "Close",
      loginTitle: "Login with User ID (UID)",
      verficationError:
        "Logical error! Please check your answers for contradictions before submitting!",
      gettingReady: "Getting ready...",
      thisCanTakeSomeTime:
        "This can take some time depending on your connection...",
      checkOne: `How likely is that you are paying attention, please select "not possible"`,
      checkTwo: `How likely is that you are paying attention, please select "everybody"`,
    },
  },
  de: {
    translation: {
      title: "Projekt",
      description:
        config.DESCRIPTION_DE ||
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore commodi tempora quibusdam! Fuga voluptatum obcaecati possimus modi quas mollitia cumque dignissimos eius placeat. Veritatis praesentium vel similique, aut eaque odio!",
      start: "Starten",
      startUID: "Weiter mit User ID",
      questionOne: "Klassifizieren Sie die Empfindlichkeit des Fotos.",
      questionTwo:
        "Mit welchem Menschen würden Sie am ehesten dieses Foto teilen?",
      a11: "sehr privat",
      a12: "ein wenig privat",
      a13: "privat",
      a14: "vielleicht privat",
      a15: "nicht privat / öffentlich",
      a16: "nicht entscheidbar",
      a21: "Freunde",
      a22: "Familie",
      a23: "Arbeit / Kollegen",
      a24: "Bekannte",
      a25: "Niemand",
      a26: "Alle",
      submit: "Weiter",
      done: "Fertig! 🎉",
      thanks: "Vielen Dank fuer Ihre teilnahme.",
      close: "Schliessen",
      loginTitle: "Login mit User ID (UID)",
      verficationError:
        "Logikfehler! Bitte ueberpruefen Sie ihre Antworten auf widersprueche!",
      gettingReady: "Einen Moment bitte...",
      thisCanTakeSomeTime:
        "Abhängig von der Verbindung kann dies einige Sekunden in Anspruch nehmen...",
      checkOne: `Wie wahrscheinlich ist es, dass Sie aufmerksam sind? Bitte wählen Sie "nicht entscheidbar" aus.`,
      checkTwo: `Wie wahrscheinlich ist es, dass Sie aufmerksam sind? Bitte wählen Sie "Alle" aus.`,
    },
  },
};
