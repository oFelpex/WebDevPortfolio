type hardSkills =
  | 'HTML'
  | 'JS'
  | 'TS'
  | 'CSS'
  | 'SCSS'
  | 'Angular'
  | 'React'
  | 'Rest API';
type hardSkillIcons =
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
  hardSkillsIcons: hardSkillIcons[];
  imgURL: string;
  imgAlt: string;
  githubURL: string;
  siteURL: string;
}

export const allProjects: Projects[] = [
  {
    name: 'Katana Dynasty',
    description: 'KATANA-DYNASTY-DESCRIPTION',
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
    imgAlt: `KATANA-DYNASTY-ALT`,
    githubURL: 'https://github.com/oFelpex/katana-dynasty',
    siteURL: 'https://katana-dynasty.vercel.app/home',
  },
  {
    name: 'To-Do-List',
    description: 'TO-DO-LIST-DESCRIPTION',
    imgURL: '../../../assets/images/projects/to-do-list/to-do-list.webp',
    hardSkills: ['HTML', 'CSS', 'TS'],
    hardSkillsIcons: ['icon-html', 'icon-css', 'icon-ts'],
    imgAlt: `TO-DO-LIST-ALT`,
    githubURL: 'https://github.com/oFelpex/projeto-final-ADA-POO-TS',
    siteURL: 'https://ofelpex.github.io/projeto-final-ADA-POO-TS/',
  },
  {
    name: 'Caldeirão da Bruxa',
    description: `CALDEIRAO-DA-BRUXA-DESCRIPTION`,
    hardSkills: ['HTML', 'CSS'],
    hardSkillsIcons: ['icon-html', 'icon-css', 'icon-bootstrap'],
    imgURL:
      '../../../assets/images/projects/caldeirao-da-bruxa/caldeirao-da-bruxa.webp',
    imgAlt: `CALDEIRAO-DA-BRUXA-ALT`,
    githubURL: 'https://github.com/oFelpex/caldeirao-da-bruxa',
    siteURL: 'https://ofelpex.github.io/caldeirao-da-bruxa/',
  },
];
