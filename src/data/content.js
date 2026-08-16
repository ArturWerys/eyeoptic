const content = {
  nav: [
    { href: "/products/ttl", label: "Lupy TTL" },
    { href: "/products/flipUp", label: "Lupy Flip-Up" },
    { href: "/products/ergo", label: "Lupy Ergo" },
    { href: "/products/led", label: "Oświetlenie LED" },
    { href: "/contact", label: "Kontakt" },
  ],

  home: {
    hero: {
      slides: [
        {
          title: "Lupy TTL",
          subtitle:
            "Precyzyjne rozwiązanie dopasowane do specjalizacji, stylu pracy i odległości roboczej.",
          href: "/products/ttl",
          buttonLabel: "Poznaj lupy TTL",
          img: "/images/home-page/ttl.webp",
          imageLayout: {
            desktopHeight: "92%",
            desktopMaxWidth: "96%",
            mobileHeight: "112%",
            tabletHeight: "110%",
            mobileScale: 1.26,
            tabletScale: 1.28,
            mobileCompactScale: 1.34,
            objectPosition: "center 54%",
          },
        },
        {
          title: "Lupy TTL Sport",
          subtitle:
            "Lżejsza konstrukcja dla większego komfortu i swobody pracy.",
          href: "/products/ttl",
          buttonLabel: "Poznaj lupy TTL Sport",
          img: "/images/home-page/ttl-sport.webp",
          imageLayout: {
            desktopHeight: "92%",
            desktopMaxWidth: "96%",
            mobileHeight: "112%",
            tabletHeight: "110%",
            mobileScale: 1.24,
            tabletScale: 1.26,
            mobileCompactScale: 1.33,
            objectPosition: "center 54%",
          },
        },
        {
          title: "Lupy Flip-Up",
          subtitle:
            "Regulowane ustawienie i szybkie dopasowanie do własnych preferencji pracy.",
          href: "/products/flipUp",
          buttonLabel: "Poznaj lupy Flip-Up",
          img: "/images/home-page/flip-up.webp",
          imageLayout: {
            desktopHeight: "90%",
            desktopMaxWidth: "94%",
            mobileHeight: "112%",
            tabletHeight: "110%",
            mobileScale: 1.22,
            tabletScale: 1.24,
            mobileCompactScale: 1.31,
            objectPosition: "center 55%",
          },
        },
        {
          title: "Lupy Ergo",
          subtitle:
            "Większy komfort pracy, ergonomia i swoboda ustawienia dopasowana do użytkownika.",
          href: "/products/flipUp",
          buttonLabel: "Poznaj lupy Ergo",
          img: "/images/home-page/ergo-flip-up.webp",
          imageLayout: {
            desktopHeight: "88%",
            desktopMaxWidth: "92%",
            mobileHeight: "112%",
            tabletHeight: "110%",
            mobileScale: 1,
            tabletScale: 1.02,
            mobileCompactScale: 1.11,
            objectPosition: "center 53%",
          },
        },
        {
          title: "Oświetlenie LED",
          subtitle:
            "Lepsza widoczność pola zabiegowego i większy komfort codziennej pracy.",
          href: "/products/led",
          buttonLabel: "Poznaj oświetlenie LED",
          img: "/images/home-page/led-free-2.webp",
          imageLayout: {
            desktopHeight: "89%",
            desktopMaxWidth: "93%",
            mobileHeight: "112%",
            tabletHeight: "110%",
            mobileScale: 0.9,
            tabletScale: 0.92,
            mobileCompactScale: 1,
            objectPosition: "center 55%",
            mobileObjectPosition: "56% 58%",
          },
        },
      ],
      points: [
        { title: "Ergonomia", desc: "Naturalna pozycja głowy i pleców" },
        { title: "Precyzja", desc: "Więcej detalu, pewniejszy ruch" },
        { title: "Dopasowanie", desc: "Dobór pod specjalizację i styl pracy" },
      ],
      ctaPrimary: { label: "Umów dobór lup", href: "/contact" },
      ctaSecondary: { label: "Zobacz modele", href: "/products" },
    },

    why: {
      heading: "Co zyskujesz dzięki dobrze dobranym lupom?",
      tiles: [
        "Maksymalna kontrola pola zabiegowego",
        "Lepsza ocena detali",
        "Mniejsze obciążenie odcinka szyjnego i lędźwiowego",
        "Stabilna praca w powiększeniu",
      ],
    },

    about: {
      heading: "O nas",
      title:
        "Eye Optic to marka stworzona przez specjalistow z ponad dwudziestoletnim doswiadczeniem w technologiach dla stomatologii.",
      text: "Bogate doswiadczenie w dziedzinie optyki zabiegowej pozwolilo nam stworzyc linie produktow laczacych wysoka jakosc z atrakcyjna cena. Lupy stomatologiczne oraz systemy oswietlenia Eye Optic spelniaja rygorystyczne normy dla wyrobow medycznych. Kazdy produkt przed dostarczeniem do klienta przechodzi indywidualna kontrole jakosci, aby zapewnic maksymalny komfort pracy oraz bezpieczenstwo podczas zabiegow.",
      points: [
        "Rozwiazania Eye Optic sa kompatybilne z produktami innych producentow dostepnych na rynku.",
        "Nasze systemy charakteryzuja sie latwa konfiguracja, intuicyjna obsluga oraz trwaloscia w codziennym uzytkowaniu.",
        "Naszym celem jest, aby kazdy zabieg z wykorzystaniem lup i oswietlenia Eye Optic wyroznial sie komfortem, ergonomia i najwyzsza efektywnoscia.",
      ],
      note: "Nasza misja jest przyczyniac sie do sukcesow klinicznych naszych klientow. Poczuj roznice z Eye Optic.",
    },
    process: {
      heading: "Dobór w 3 krokach",
      text: "Krótki proces, dzięki któremu dobieramy lupy do Twojej specjalizacji, pozycji pracy i codziennych potrzeb.",
      steps: [
        {
          n: "01",
          title: "Krótka konsultacja",
          desc: "Rozmawiamy o Twojej specjalizacji, sposobie pracy i oczekiwaniach.",
        },
        {
          n: "02",
          title: "Precyzyjne pomiary",
          desc: "Sprawdzamy PD, odległość roboczą i naturalną pozycję podczas pracy.",
        },
        {
          n: "03",
          title: "Indywidualna konfiguracja",
          desc: "Dobieramy powiększenie, oprawę, oświetlenie i ewentualną korekcję.",
        },
      ],
    },

    compare: {
      heading: "TTL czy Flip-Up, co sprawdzi się lepiej?",
      rows: [
        {
          left: "Maksymalna stabilność i stała geometria obrazu",
          right: "TTL",
        },
        { left: "Możliwość regulacji i odchylania optyki", right: "Flip-Up" },
        { left: "Pełna personalizacja parametrów", right: "TTL" },
        {
          left: "Elastyczny start i praca w trybie mieszanym",
          right: "Flip-Up",
        },
      ],
    },

    faqPreview: {
      heading: "FAQ",
      items: [
        {
          q: "Czy lupy mogą uwzględniać korekcję wzroku?",
          a: "Tak, konfigurację dobieramy indywidualnie. Lupy mogą być wykonane z korekcją dopasowaną do Twojej wady wzroku lub współpracować z używaną korekcją okularową.",
        },
        {
          q: "Jak długo trwa adaptacja do pracy w lupach?",
          a: "Najczęściej wystarcza kilka dni regularnej pracy. Kluczowe znaczenie ma prawidłowo dobrana odległość robocza i kąt obserwacji, dzięki temu adaptacja przebiega szybko i naturalnie.",
        },
        {
          q: "TTL czy Flip-Up - które rozwiązanie będzie lepsze?",
          a: "Lupy TTL zapewniają najwyższą stabilność obrazu, mniejszą wagę i maksymalną precyzję. Flip-Up oferują większą elastyczność regulacji, dlatego dobrze sprawdzają się na początku pracy z powiększeniem lub przy pracy mieszanej.",
        },
      ],

      moreHref: "/contact",
      moreLabel: "Masz inne pytanie? Skontaktuj się z nami",
    },

    contact: {
      heading: "Umów dobór lup Eye Optic",
      fields: {
        interests: ["TTL", "Flip-Up", "LED", "Inne"],
        specializations: [
          "Stomatologia ogólna",
          "Endodoncja",
          "Protetyka / estetyka",
          "Chirurgia / perio",
          "Inne",
        ],
      },
    },
  },

  products: {
    ttl: {
      page: {
        hero: {
          title: "Lupy TTL",
          accent: "Stabilność • Kontrola • Precyzja",
          description:
            "Lupy TTL (Through The Lens) Eye Optic to rozwiązanie dla osób, które oczekują maksymalnej stabilności obrazu i pracy bez konieczności korekty ustawień. Optyka osadzona w szkłach daje spójne pole widzenia i wysoką precyzję w wymagających procedurach.",
          uses: [
            "Endodoncja",
            "Protetyka i estetyka",
            "Chirurgia wymagająca stabilnej osi widzenia",
            "Praca na detalach i granicach preparacji",
          ],
        },
        benefits: {
          eyebrow: "Korzyści",
          title: "Najważniejsze korzyści pracy w systemie TTL",
          description:
            "Lupy TTL zapewniają spójne pole widzenia i powtarzalny obraz, szczególnie wtedy, gdy liczy się precyzja i komfort przez wiele godzin pracy.",
          items: [
            {
              title: "Stabilny obraz",
              desc: "Mniej mikro-ruchów i pływania podczas pracy.",
            },
            {
              title: "Ergonomiczna praca",
              desc: "Dobrany kąt i odległość robocza zapewniają naturalną pozycję głowy i pleców.",
            },
            {
              title: "Przewidywalność",
              desc: "Raz ustawione działa bez potrzeby ciągłego poprawiania.",
            },
          ],
        },
        configuration: {
          eyebrow: "Konfiguracja lup TTL Eye Optic",
          title: "Konfiguracja TTL dopasowana do stylu pracy",
          description:
            "Dobieramy powiększenie, odległość roboczą i oprawę tak, abyś pracował w naturalnej pozycji i miał powtarzalny obraz bez szukania ustawień w trakcie pracy.",
          ctaLabel: "Umów indywidualny dobór lup TTL",
          magnificationLabel: "Powiększenie",
          mobile: {
            title: "Nie wiesz, które powiększenie będzie najlepsze?",
            description:
              "Skontaktuj się z nami - wspólnie dobierzemy konfigurację dopasowaną do Twojego stylu pracy i potrzeb.",
            buttonLabel: "Umów indywidualny dobór lup TTL",
          },
        },
      },
      magnifications: ["2.5x", "3.0x"],
      tableRows: [
        {
          label: "Ogniskowa (mm)",
          values: ["340 - 500", "340 - 500"],
        },
        {
          label: "Głębia ostrości (mm)",
          values: ["90 - 120", "80 - 110"],
        },
        {
          label: "Pole widzenia (mm)",
          values: ["130 - 200", "110 - 150"],
        },
        {
          label: "Waga (g)",
          values: ["40.0", "42.0"],
        },
      ],
    },
    flipUp: {
      page: {
        hero: {
          title: "Lupy Flip-Up",
          accent: "Regulacja • Swoboda • Komfort",
          description:
            "Lupy Flip-Up Eye Optic to lupy dla tych, którzy chcą elastyczności. Dostarczają możliwość odchylenia optyki, łatwiejszą regulację i wygodną pracę mieszaną w gabinecie. To dobry wybór jako pierwsze lupy lub do codziennej, zróżnicowanej pracy.",
          uses: [
            "Stomatologia ogólna i praca mieszana",
            "Procedury wymagające zmiany pola widzenia",
            "Gabinet o zróżnicowanych zastosowaniach",
            "Pierwsze lupy z możliwością regulacji",
          ],
        },
        benefits: {
          eyebrow: "Korzyści",
          title: "Najważniejsze korzyści pracy w systemie Flip-Up",
          description:
            "Lupy Flip-Up zapewniają spójne pole widzenia i powtarzalny obraz, szczególnie wtedy, gdy liczy się precyzja i komfort przez wiele godzin pracy.",
          items: [
            {
              title: "Szybka regulacja",
              desc: "Łatwiej dopasować wygodną pozycję i przełączać się między powiększeniem a widzeniem naturalnym.",
            },
            {
              title: "Odchylenie optyki",
              desc: "Przełączasz się między powiększeniem a widzeniem naturalnym bez odrywania się od codziennej pracy.",
            },
            {
              title: "Uniwersalność",
              desc: "Idealne do codziennej stomatologii ogólnej oraz procedur specjalistycznych.",
            },
          ],
        },
        variants: {
          eyebrow: "Wybierz wariant",
          title: "MINI czy ALU Flip-Up?",
          description:
            "Oba warianty zapewniają elastyczność pracy w systemie Flip-Up, ale różnią się konstrukcją, charakterem użytkowania i odczuciem w codziennej pracy.",
          items: [
            {
              key: "mini",
              name: "MINI Flip-Up",
              shortDescription:
                "Lżejsza i bardziej kompaktowa konstrukcja, dobra na start i do pracy mieszanej.",
              bullets: [
                "łatwiejsza adaptacja",
                "mniejsza masa",
                "elastyczna praca na co dzień",
              ],
            },
            {
              key: "alu",
              name: "ALU Flip-Up",
              shortDescription:
                "Solidniejsza konstrukcja i większa stabilność dla intensywnej pracy klinicznej.",
              bullets: [
                "bardziej stabilna konstrukcja",
                "solidniejsze wykonanie",
                "do wymagającej pracy gabinetowej",
              ],
            },
          ],
        },
        tables: {
          eyebrow: "Parametry konfiguracji",
          title: "Dobierz powiększenie do wariantu pracy",
          description:
            "Dobieramy powiększenie, odległość roboczą i konfigurację tak, aby zapewnić naturalną pozycję pracy i powtarzalny obraz.",
          magnificationLabel: "Powiększenie",
          configurationPrefix: "Konfiguracja",
        },
        consultation: {
          title: "Nie wiesz, który wariant Flip-Up będzie najlepszy?",
          description:
            "Skontaktuj się z nami - wspólnie dobierzemy wariant, powiększenie i konfigurację dopasowaną do Twojego stylu pracy.",
          buttonLabel: "Umów indywidualny dobór Flip-Up",
        },
      },
    },
    ergo: {
      page: {
        hero: {
          title: "Lupy Ergo",
          accent: "Ergonomia • Komfort • Stabilność",
          description:
            "Eye Optic Ergo to nowy standard ergonomii i precyzji. Te lupy stomatologiczne powstały z myślą o specjalistach, którzy oczekują nie tylko doskonałego widzenia, ale również komfortu pracy przez wiele godzin każdego dnia.",
          uses: [
            "Wielogodzinna praca w powiększeniu",
            "Ograniczenie napięcia szyi i pleców",
            "Procedury wymagające stabilnego obrazu",
            "Ergonomia pracy bez kompromisów",
          ],
        },
        story: {
          eyebrow: "Opis produktu",
          title: "Eye Optic Ergo - nowy standard ergonomii\ni precyzji",
          description:
            "Lupy stomatologiczne Eye Optic Ergo to odpowiedź na rosnące wymagania nowoczesnej stomatologii, gdzie liczy się nie tylko precyzja widzenia, ale także komfort pracy przez wiele godzin. Dzięki zaawansowanej konstrukcji ergonomicznej umożliwiają pracę w naturalnej, wyprostowanej pozycji, znacząco odciążając kręgosłup szyjny i plecy.",
        },
        benefits: {
          eyebrow: "Korzyści",
          title: "Ergonomia i jakość obrazu w codziennej pracy",
          description:
            "Eye Optic Ergo wspierają prawidłową postawę i zapewniają wysoką jakość widzenia tam, gdzie liczy się precyzja, komfort i powtarzalność każdego ruchu.",
          items: [
            {
              title: "Ergonomia, która zmienia codzienną pracę",
              desc: "Technologia odwróconej optyki pozwala na zachowanie prawidłowej postawy bez konieczności pochylania głowy nad polem zabiegowym. To realne wsparcie w profilaktyce przeciążeń i dolegliwości bólowych, które są powszechne wśród lekarzy dentystów i higienistek.",
            },
            {
              title: "Perfekcyjna jakość obrazu",
              desc: "Precyzyjne układy optyczne zapewniają ostry, jasny i kontrastowy obraz w całym polu widzenia. Dzięki temu każdy detal jest wyraźny, co przekłada się na większą dokładność i bezpieczeństwo wykonywanych zabiegów.",
            },
          ],
        },
        details: {
          eyebrow: "Dopasowanie",
          title: "Indywidualne ustawienie i komfort długiej pracy",
          description:
            "Poza ergonomią i jakością obrazu równie ważne są precyzyjne dopasowanie do użytkownika oraz wygoda, która zostaje z Tobą podczas wielogodzinnych procedur.",
          items: [
            {
              title: "Indywidualne dopasowanie",
              desc: "Lupy Eye Optic Ergo są projektowane z uwzględnieniem indywidualnych parametrów użytkownika - takich jak rozstaw źrenic, odległość robocza czy preferencje pracy. To gwarantuje maksymalny komfort i efektywność od pierwszego użycia.",
            },
            {
              title: "Lekkość i trwałość",
              desc: "Nowoczesne materiały oraz dopracowana konstrukcja sprawiają, że lupy są lekkie i wygodne nawet podczas długich procedur. Jednocześnie zachowują wysoką odporność na intensywne użytkowanie w warunkach gabinetu.",
            },
          ],
        },
        why: {
          eyebrow: "Dlaczego Eye Optic Ergo?",
          title: "Komfort i precyzja, które pracują razem",
          items: [
            "poprawa ergonomii pracy i redukcja napięcia mięśniowego",
            "wyraźny, stabilny obraz o wysokiej rozdzielczości",
            "indywidualne dopasowanie do użytkownika",
            "komfort pracy przez wiele godzin",
            "rozwiązanie stworzone dla profesjonalistów",
          ],
        },
        consultation: {
          title:
            "Chcesz sprawdzić, czy Eye Optic Ergo będzie najlepszym wyborem?",
          description:
            "Skontaktuj się z nami - pomożemy dobrać konfigurację dopasowaną do Twojej pozycji pracy, odległości roboczej i codziennych procedur.",
          buttonLabel: "Umów indywidualny dobór Ergo",
        },
      },
    },
    aluFlipUp: {
      magnifications: ["2.5x", "3.0x", "3.5x"],
      tableRows: [
        {
          label: "Ogniskowa (mm)",
          values: ["360 - 500", "360 - 500", "360 - 500"],
        },
        {
          label: "Głębia ostrości (mm)",
          values: ["100 - 140", "70 - 125", "60 - 115"],
        },
        {
          label: "Pole widzenia (mm)",
          values: ["115 - 180", "70 - 165", "65 - 1755"],
        },
        {
          label: "Waga (g)",
          values: ["63.0", "63.0", "63.0"],
        },
      ],
    },
    miniFlipUp: {
      magnifications: ["2.5x", "3.0x"],
      tableRows: [
        {
          label: "Ogniskowa (mm)",
          values: ["340 - 500", "340 - 500"],
        },
        {
          label: "Głębia ostrości (mm)",
          values: ["95 - 130", "70 - 110"],
        },
        {
          label: "Pole widzenia (mm)",
          values: ["150 - 260", "100 - 160"],
        },
        {
          label: "Waga (g)",
          values: ["59.0", "60.0"],
        },
      ],
    },
    led: {
      page: {
        hero: {
          title: "Oświetlenie LED\u00A0do\u00A0lup",
          accent: "Jasność • Kontrast • Precyzja",
          description:
            "Dobre oświetlenie eliminuje cienie i zwiększa kontrast w polu zabiegowym. LED Eye Optic do lup działa w osi widzenia, gwarantując równomierny i stabilny obraz, bez potrzeby ciągłego przesuwania lampy.",
          uses: [
            "Endodoncja",
            "Protetyka i stomatologia estetyczna",
            "Chirurgia i periodontologia",
            "Praca na detalach i granicach preparacji",
          ],
        },
        benefits: {
          eyebrow: "Korzyści",
          title: "Najważniejsze korzyści oświetlenia LED do lup",
          description:
            "Oświetlenie LED do lup zapewnia powtarzalne warunki widzenia niezależnie od pozycji pacjenta i etapu zabiegu. To realne wsparcie ergonomii i precyzji pracy.",
          items: [
            {
              title: "Równomierne oświetlenie pola zabiegowego",
              desc: "Jednolita wiązka światła bez ostrych cieni - lepsza kontrola nad detalami.",
            },
            {
              title: "Większa precyzja i kontrast obrazu",
              desc: "Wyraźne granice preparacji i struktury tkanek w całym polu widzenia.",
            },
            {
              title: "Mniejsze uzależnienie od lampy unitu",
              desc: "Światło podąża za wzrokiem, niezależnie od pozycji głowy i pacjenta.",
            },
          ],
        },
        configuration: {
          eyebrow: "Konfiguracja LED Eye Optic",
          title: "Nowoczesne oświetlenie LED",
          description:
            "Dobre oświetlenie LED zwiększa efektywność pracy w powiększeniu optycznym. Dobra widoczność wydajnie oświetlonego pola zabiegowego przyczynia się do komfortowego wykonywania zabiegów. Nowoczesne rozwiązania przewodowe i bezprzewodowe pozwalają dobrać odpowiedni rodzaj oświetlenia do indywidualnych preferencji i potrzeb.",
          ctaLabel: "Dobierz oświetlenie do swojej pracy",
        },
      },
    },
  },
};

export default content;
