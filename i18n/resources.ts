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
      questionOne:
        "Please indicate your agreement level to the following statement: I find this picture sensitive with regards to my privacy",
      questionTwo:
        "Assuming you took this picture. With whom would you be most likely to share it?",
      a11: "strongly agree",
      a12: "agree",
      a13: "disagree",
      a14: "strongly disagree",
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
      copyId: `Please copy your user ID (UID) below to continue on Limesurvey`,
      continueLimesurvey: `Continue on Limesurvey`,
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
      questionOne:
        "Bitte geben Sie an, inwieweit Sie der folgenden Aussage zustimmen: Ich finde dieses Bild sensibel in Bezug auf meine Privatsphäre",
      questionTwo:
        "Angenommen, Sie haben dieses Bild aufgenommen. Mit wem würdest du es am ehesten teilen?",
      a11: "stimme voll zu",
      a12: "stimme zu",
      a13: "stimme nicht zu",
      a14: "stimme absolut nicht zu",
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
      copyId:
        "Bitte kopieren Sie die unten stehende User ID (UID) um damit auf Limesurvey fortzufahren.",
      continueLimesurvey: "Weiter zu Limesurvey",
    },
  },
};
