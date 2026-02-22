import {
  getPermalink,
  //getBlogPermalink,
  //getAsset
} from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'About',
      href: getPermalink('/#features'),
    },
    {
      text: 'Features',
      links: [
        {
          text: 'Actions & Tasks',
          href: getPermalink('/features/actions'),
        },
        {
          text: 'Calendar & Events',
          href: getPermalink('/features/calendar'),
        },
        {
          text: 'Inspections',
          href: getPermalink('/features/inspections'),
        },
        {
          text: 'Pre-Plans',
          href: getPermalink('/features/preplans'),
        },
        {
          text: 'All Features',
          href: getPermalink('/#details'),
        },
      ],
    },
    {
      text: 'Pricing',
      href: getPermalink('/pricing'),
    },
    {
      text: 'Contact',
      href: getPermalink('/#contact'),
    },
  ],
  actions: [
    { text: 'Sign Up', href: 'https://app.stationone.com.au/register' },
    { text: 'Log In', href: 'https://app.stationone.com.au/users/sign_in', class: 'btn-primary' },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about'), bold: true },
        { text: 'Pricing', href: getPermalink('/pricing'), bold: true },
        { text: 'Contact', href: getPermalink('/contact'), bold: true },
      ],
    },
    {
      title: 'Features',
      links: [
        { text: 'Actions & Tasks', href: getPermalink('/features/actions') },
        { text: 'Calendar & Events', href: getPermalink('/features/calendar') },
        { text: 'Inspections', href: getPermalink('/features/inspections') },
        { text: 'Pre-Plans', href: getPermalink('/features/preplans') },
      ],
    },
    {
      title: 'Compare',
      links: [
        { text: 'StationOne vs Word Docs', href: getPermalink('/stationone-vs-word-documents') },
        { text: 'StationOne vs SafetyCulture', href: getPermalink('/stationone-vs-safetyculture') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [],
  footNote: `
    Copyright StationOne ${new Date().getFullYear()} · All rights reserved. A FireHouse Labs Pty. Ltd platform.
  `,
};
