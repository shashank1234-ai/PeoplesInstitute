import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: "",
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/oep/dashboard',
  },
  {
    displayName: 'Exams',
    iconName: 'school',
    route: '/oep/exam-dashboard',
  },
  {
    displayName: 'Curate',
    iconName: 'database-edit',
    route: '/oep/curate',
  },
  {
    displayName:'My Work',
    iconName:'subtask',
    route:'/oep/work'
  },
  // {
  //   displayName: 'Logout',
  //   iconName: 'lock',
  //   route: '/authentication/login',
  // },
  // {
  //   displayName: 'Lists',
  //   iconName: 'list',
  //   route: '/ui-components/lists',
  // },
  // {
  //   displayName: 'Menu',
  //   iconName: 'layout-navbar-expand',
  //   route: '/ui-components/menu',
  // },
  // {
  //   displayName: 'Tooltips',
  //   iconName: 'tooltip',
  //   route: '/ui-components/tooltips',
  // },
  // {
  //   navCap: 'Auth',
  // },
  // {
  //   displayName: 'Register',
  //   iconName: 'user-plus',
  //   route: '/authentication/register',
  // },
  // {
  //   navCap: 'Extra',
  // },
  // {
  //   displayName: 'Icons',
  //   iconName: 'mood-smile',
  //   route: '/extra/icons',
  // },
  // {
  //   displayName: 'Sample Page',
  //   iconName: 'aperture',
  //   route: '/extra/sample-page',
  // },
];
