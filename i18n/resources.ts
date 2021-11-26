import { config } from "config";

export const resources = {
  en: {
    translation: {
      title: "Study",
      description1: `Dear Madam/Sir,`,
      description2: `In this study, we aim to understand users' sharing behaviors by asking users to rate a set of images according to their perception of privacy. Users are asked to rate an image (1) according to its sensitivity, i.e., a 4-Likert scale and (2) the audience with whom they would share a given image if they were hypothetically in a position to share those images (i.e. with nobody, family, friends, acquaintances, colleagues, or everybody).`,
      description3: `To this end, we have designed and implemented a web application that uses a publicly available Flickr dataset with images to collect users sharing opinions. Both the front-end web application and its associated back-end database are hosted within our university infrastructure (i.e., GWDG servers). All of the answers are anonymous. We store a randomly generated user id, image id, and their answers about the aforementioned questions. Morever, to complement the study, we have designed a survey with 32 questions to understand sharing behaviors with respect to users' demographics, social media usage, and their interpersonal privacy concerns. `,
      description4: `The ultimate goal of our study is to use the annotated images to design and implement deep learning classification models that would help users to enhance their privacy by suggesting to them the sensitivity of an image about to be shared and the target audience. `,
      description5: `The planned duration of the study is about 60 minutes. The study is limited to participants of legal age with unrestricted legal capacity. `,
      description6: `Please note that you cannot make a mistake during any step of this study. There are no right or wrong answers. Participation in this study is entirely voluntary and you can terminate your participation in the study at any time without giving reasons. Your data will then be deleted immediately, although the data processing will remain lawful until that time.`,
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
      a15: "I do not know",
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
      title: "Studie",
      description1: `Sehr geehrte Damen und Herren, `,
      description2: `Ziel dieser Studie ist es, das Teilungsverhalten der Nutzer zu verstehen, indem sie gebeten werden, eine Reihe von Bildern entsprechend ihrer Wahrnehmung der Privatsphäre zu annotieren. Die Nutzer werden gebeten, eine Reihe von Bildern (1) nach ihrer Empfindlichkeit zu bewerten, d. h. auf einer 4-Likert-Skala und (2) die Zielgruppe anzugeben, mit der sie ein bestimmtes Bild teilen würden, wenn sie hypothetisch in der Lage wären, diese Bilder zu teilen (d. h. mit niemandem, Familie, Freunden, Bekannten, Kollegen oder allen).`,
      description3: `Zu diesem Zweck haben wir eine Web-Applikation entworfen und implementiert, die einen öffentlich zugänglichen Flickr-Datensatz mit Bildern verwendet, um die Meinungen der Nutzer zu sammeln. Sowohl die Front-End Web-Applikation als auch die zugehörige Back-End-Datenbank werden in unserer Universitätsinfrastruktur (d. h. auf den Servern der GWDG) gehostet und gespeichert. Alle Antworten sind anonym. Wir speichern eine randomisiert generierte Benutzer-ID, eine Bildkennung und ihre Antworten zu den oben genannten Fragen. Darüber hinaus haben wir zur Ergänzung der Studie eine Umfrage mit 32 Fragen entworfen, um das Sharing-Verhalten im Hinblick auf die Demographie der Nutzer, die Nutzung sozialer Medien und ihre Bedenken bezüglich der Privatsphäre zu verstehen.`,
      description4: `Das Endziel unserer Studie ist es, die annotierten Bilder zu verwenden, um Deep-Learning- Klassifizierungsmodelle zu entwerfen und zu implementieren, die den Nutzern helfen, ihre Privatsphäre zu verbessern, indem sie ihnen die Empfindlichkeit eines Bildes, das geteilt werden soll, und die Zielgruppe vorschlagen.`,
      description5: `Die geplante Dauer der Studie beträgt ca. 60 Minuten. Die Studie beschränkt sich auf volljährige Teilnehmer*innen mit unbeschränkter Geschäftsfähigkeit.`,
      description6: `Bitte nehmen Sie zur Kenntnis, dass Sie während keiner der Schritte dieser Studie einen Fehler machen können. Es gibt keine richtigen oder falschen Antworten. Die Teilnahme an dieser Studie geschieht auf ausschließlich freiwilliger Basis und Sie können Ihre Teilnahme an der Studie ohne Angabe von Gründen jederzeit abbrechen. Ihre Daten werden dann unverzüglich gelöscht, obwohl die Datenverarbeitung bis zu diesem Zeitpunkt rechtmäßig bleibt. `,
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
      a15: "Ich weiß es nicht",
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
