export interface Job {
  title: string;
  company: string;
  period: string;
  description?: string;
  side: 'left' | 'right';
}

export const jobs: Job[] = [
  {
    title: 'Founder',
    company: 'ableto',
    period: '2015 - 2018',
    description: 'Founded and led technology startup',
    side: 'left'
  },
  {
    title: 'Solutions Assistant',
    company: 'everis',
    period: '2018 - 2019',
    description: 'Software development and solutions architecture',
    side: 'right'
  },
  {
    title: 'Tech Manager',
    company: 'ELITE SPORTS 17',
    period: '2019',
    description: 'Strategic planning and technological decision-making',
    side: 'left'
  },
  {
    title: 'Frontend Developer',
    company: 'S2 Grupo',
    period: '2019 - 2020',
    description: 'Advanced computer security solutions with Vue specialization',
    side: 'right'
  },
  {
    title: 'Senior Frontend Engineer',
    company: 'mimacom',
    period: '2020 - 2022',
    description: 'Developed responsive banking applications using Vue 3',
    side: 'left'
  },
  {
    title: 'Senior Frontend Engineer',
    company: 'NEW WORK SE',
    period: '2022 - Present',
    description: 'Leading microfrontend migration initiatives and optimizing developer experiences',
    side: 'right'
  }
];