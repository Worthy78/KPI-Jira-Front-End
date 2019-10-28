import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

//const DashboardDefault = React.lazy(() => import('./ComponentLib/Dashboard/Default'));
const UIBasicButton = React.lazy(() => import('./ComponentLib/UIElements/Basic/Button'));
const UIBasicBadges = React.lazy(() => import('./ComponentLib/UIElements/Basic/Badges'));
const UIBasicBreadcrumbPagination = React.lazy(() => import('./ComponentLib/UIElements/Basic/BreadcrumbPagination'));

const UIBasicCollapse = React.lazy(() => import('./ComponentLib/UIElements/Basic/Collapse'));
const UIBasicTabsPills = React.lazy(() => import('./ComponentLib/UIElements/Basic/TabsPills'));
const UIBasicBasicTypography = React.lazy(() => import('./ComponentLib/UIElements/Basic/Typography'));

const FormsElements = React.lazy(() => import('./ComponentLib/Forms/FormsElements'));

const BootstrapTable = React.lazy(() => import('./ComponentLib/Tables/BootstrapTable'));

const Nvd3Chart = React.lazy(() => import('./ComponentLib/Charts/Nvd3Chart/index'));

const OtherSamplePage = React.lazy(() => import('./ComponentLib/Other/SamplePage'));
const OtherDocs = React.lazy(() => import('./ComponentLib/Other/Docs'));

//My imports 
const ProjectOverview = React.lazy(() => import('./ComponentLib/Dashboard/Projects'));
const UpdateDb = React.lazy(() => import('./App/layout/Parameters/UpdateDb'));
const UserAccount = React.lazy(() => import('./App/layout/Parameters/UserAccount'));

const routes = [
    { path: '/dashboard/default', exact: true, name: 'Default', component: Nvd3Chart },
    { path: '/basic/button', exact: true, name: 'Basic Button', component: UIBasicButton },
    { path: '/basic/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges },
    { path: '/basic/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
    { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
    { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
    { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
    { path: '/tables/bootstrap', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
    { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
    // My routes
    { path: '/projets', exact: true, name: 'Projets', component: ProjectOverview },
    { path: '/projets/category/:id', exact: true, name: 'Projets', component: ProjectOverview },
    { path: '/projets/uncategorized', exact: true, name: 'Projets', component: ProjectOverview },
    { path: '/update-db', exact: true, name: 'Mise à jour BD', component: UpdateDb },
    { path: '/gestion-comptes', exact: true, name: 'Gestion de comptes', component: UserAccount },
];

export default routes;