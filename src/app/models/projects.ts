type hardSkills =
  | 'HTML'
  | 'JS'
  | 'TS'
  | 'CSS'
  | 'SCSS'
  | 'Angular'
  | 'React'
  | 'Rest API';
type hardSkillsIcon =
  | 'icon-html'
  | 'icon-css'
  | 'icon-scss'
  | 'icon-bootstrap'
  | 'icon-angular'
  | 'icon-js'
  | 'icon-ts'
  | 'icon-api';

export interface Projects {
  name: string;
  description: string;
  hardSkills: hardSkills[];
  hardSkillsIcons: hardSkillsIcon[];
  imgURL: string;
  imgAlt: string;
  githubURL: string;
  siteURL: string;
}

export const allProjects: Projects[] = [
  {
    name: 'Katana Dynasty',
    description:
      'Explore our premium collection of authentic katanas. Find the perfect sword for collectors, martial artists, and enthusiasts. High-quality craftsmanship and detailed designs for every budget.',
    hardSkills: ['HTML', 'SCSS', 'Angular', 'TS', 'Rest API'],
    hardSkillsIcons: [
      'icon-html',
      'icon-scss',
      'icon-angular',
      'icon-ts',
      'icon-api',
    ],
    imgURL:
      '../../../assets/images/projects/katana-dynasty/katana-dynasty.webp',
    imgAlt: `It's a print of the homepage from the site: Katana Dynasty.`,
    githubURL: 'https://github.com/oFelpex/katana-dynasty',
    siteURL: 'https://katana-dynasty.vercel.app/home',
  },
  {
    name: 'To-Do-List',
    description:
      'Manage your tasks simply and efficiently with our to-do list app. Easily add, edit, filter and complete tasks.',
    imgURL: '../../../assets/images/projects/to-do-list/to-do-list.webp',
    hardSkills: ['HTML', 'CSS', 'TS'],
    hardSkillsIcons: ['icon-html', 'icon-css', 'icon-ts'],
    imgAlt: `It's a print of the homepage from the site: To-Do-List.`,
    githubURL: 'https://github.com/oFelpex/projeto-final-ADA-POO-TS',
    siteURL: 'https://ofelpex.github.io/projeto-final-ADA-POO-TS/',
  },
  {
    name: 'Caldeirão da Bruxa',
    description: `Order your snack themed with the HORROR of Halloween! Take advantage of the promotions and don't forget to sign up to receive offers from Caldeirão da Bruxa.`,
    hardSkills: ['HTML', 'CSS'],
    hardSkillsIcons: ['icon-html', 'icon-css', 'icon-bootstrap'],
    imgURL:
      '../../../assets/images/projects/caldeirao-da-bruxa/caldeirao-da-bruxa.webp',
    imgAlt: `It's a print of the homepage from the site: Caldeirão da Bruxa.`,
    githubURL: 'https://github.com/oFelpex/caldeirao-da-bruxa',
    siteURL: 'https://ofelpex.github.io/caldeirao-da-bruxa/',
  },
  {
    name: 'Space Hero (remake)',
    description:
      'Space Hero is a game made for a final project for a college subject, this is a remake of it, but still in the development process.',
    hardSkills: ['HTML', 'CSS', 'JS'],
    hardSkillsIcons: ['icon-html', 'icon-css', 'icon-js'],
    imgURL:
      '../../../assets/images/projects/spacehero-remake/spacehero-remake.webp',
    imgAlt: `It's a print of the homepage from the site: Space Hero (remake).`,
    githubURL: 'https://github.com/oFelpex/spacehero-remake',
    siteURL: 'https://ofelpex.github.io/spacehero-remake/',
  },
];
