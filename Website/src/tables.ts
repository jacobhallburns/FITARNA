// Website/src/tables.ts

type Link = { label: string; href: string; external?: boolean };
type KvRow = { key: string; valueHtml: string };
type MilestoneRow = { title: string; links: Link[] };

/* ---------- Data ---------- */
const projectInfo: KvRow[] = [
  {
    key: "Project Name",
    valueHtml: "FIT AR Navigation App (FITARNA)",
  },
  {
    key: "Team Members and Email Addresses",
    valueHtml: [
      ["Vincenzo Barager", "vbarager2022@my.fit.edu"],
      ["Dathan Dixon", "ddixon2022@my.fit.edu"],
      ["Jacob Hall-Burns", "jhallburns2021@my.fit.edu"],
      ["Ethan Wadley", "ewadley2022@my.fit.edu"],
    ]
      .map(
        ([name, email]) =>
          `${name} (<a href="https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
            email
          )}" target="_blank" rel="noopener noreferrer">${email}</a>)`
      )
      .join("<br>")
  },
  {
    key: "Faculty Advisor",
    valueHtml:
      `Eraldo Ribeiro (` +
      `<a href="https://mail.google.com/mail/?view=cm&fs=1&to=eribeiro@fit.edu" target="_blank" rel="noopener noreferrer">eribeiro@fit.edu</a>)`,
  }
];

const firstSemester: MilestoneRow[] = [
  {
    title: "Plan (Sep 3)",
    links: [
      { label: "Plan", href: "/FITARNA/documentation/FITARNA-Project-Plan-Fall-2025.pdf", external: true },
      { label: "Presentation", href: "/FITARNA/documentation/FIT-AR-Navigation-App-(FITARNA)-Presentation.pdf", external: true },
    ],
  },
  {
    title: "Milestone 1 (Sep 29)",
    links: [
      { label: "Requirement", href: "/FITARNA/documentation/Requirements_Document_FITARNA.pdf", external: true },
      { label: "Design", href: "/FITARNA/documentation/Design_Doc_FITARNA.pdf", external: true },
      { label: "Test", href: "/FITARNA/documentation/Software_Test_Document_FITARNA.pdf", external: true },
      { label: "Presentation", href: "/FITARNA/documentation/Milestone_1_Presentation.pdf", external: true },
      { label: "Progress Evaluation", href: "/FITARNA/documentation/Milestone_1_Evaluation_1.pdf", external: true },
    ],
  },
  {
    title: "Milestone 2 (Oct 27)",
    links: [
      { label: "Presentation", href: "/FITARNA/documentation/Milestone_2_Presentation.pdf", external: true },
      { label: "Progress Evaluation", href: "/FITARNA/documentation/Milestone_2_Evaluation.pdf", external: true },
    ],
  },
  {
    title: "Milestone 3 (Nov 24)",
    links: [
      { label: "Presentation", href: "/FITARNA/documentation/Milestone_3_Presentation.pdf", external: true },
      { label: "Progress Evaluation", href: "/FITARNA/documentation/Milestone_3_Evaluation.pdf", external: true },
    ],
  },
];

const secondSemester: MilestoneRow[] = [
  {
    title: "Plan (Jan 26)",
    links: [
      { label: "Plan", href: "/FITARNA/documentation/FITARNA Project Plan Fall 2026 copy.pdf", external: true },
      { label: "Presentation", href: "/FITARNA/documentation/FITARNA Plan (Spring) Presentation.pdf", external: true },
    ],
  },
  {
    title: "Milestone 4 (Feb 23)",
    links: [
      { label: "Presentation", href: "/documentation/milestone4.pdf", external: true },
      { label: "Progress Evaluation", href: "/documentation/eval4.pdf", external: true },
    ],
  },
  {
    title: "Milestone 5 (Mar 30)",
    links: [
      { label: "Poster", href: "/documentation/poster.pdf", external: true },
      { label: "Presentation", href: "/documentation/milestone5.pdf", external: true },
      { label: "Progress Evaluation", href: "/documentation/eval5.pdf", external: true },
    ],
  },
  {
    title: "Milestone 6 (Apr 20)",
    links: [
      { label: "User and/or Developer Manual", href: "/documentation/userManual.pdf", external: true },
      { label: "Demo Video", href: "/documentation/demoVideo.jpg", external: true },
      { label: "Presentation", href: "/documentation/milestone6.pdf", external: true },
      { label: "Progress Evaluation", href: "/documentation/eval6.pdf", external: true },
    ],
  },
];

/* ---------- Render helpers ---------- */
function linkHtml(l: Link): string {
  return `<a href="${l.href}" ${l.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>${l.label}</a>`;
}

function renderKvTable(tbody: HTMLTableSectionElement, rows: KvRow[]) {
  tbody.innerHTML = rows
    .map(
      (r) => `
      <tr>
        <th scope="row">${r.key}</th>
        <td>${r.valueHtml}</td>
      </tr>`
    )
    .join("");
}

function renderMilestones(tbody: HTMLTableSectionElement, rows: MilestoneRow[]) {
  tbody.innerHTML = rows
    .map(
      (r) => `
      <tr>
        <td>${r.title}</td>
        <td>${r.links.map(linkHtml).join(", ")}</td>
      </tr>`
    )
    .join("");
}

/* ---------- Mount on pages that have these tables ---------- */
function mountTables() {
  const infoTbody = document.querySelector<HTMLTableSectionElement>("#project-info-table tbody");
  if (infoTbody) renderKvTable(infoTbody, projectInfo);

  const firstTbody = document.querySelector<HTMLTableSectionElement>("#first-sem-table tbody");
  if (firstTbody) renderMilestones(firstTbody, firstSemester);

  const secondTbody = document.querySelector<HTMLTableSectionElement>("#second-sem-table tbody");
  if (secondTbody) renderMilestones(secondTbody, secondSemester);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountTables);
} else {
  mountTables();
}
