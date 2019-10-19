export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'feather icon-home',
                }
            ]
        },
        {
            id: 'categorie',
            title: 'CATEGORIE',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'plateaux',
                    title: 'Plateaux',
                    type: 'collapse',
                    icon: 'feather icon-briefcase',
                    children: [
                        {
                            id: 'uncategorized',
                            title: 'Pas de catégorie',
                            type: 'item',
                            url: '/projets/uncategorized/'
                        }
                    ]
                },
                // {
                //     id: 'projects',
                //     title: 'Tout les projets',
                //     type: 'item',
                //     icon: 'feather icon-package',
                //     url: '/projets'
                // }
            ]
        },
        {
            id: 'parameter',
            title: 'PARAMETRES',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'update-db',
                    title: 'Mise à jour de la BD',
                    type: 'item',
                    url: '/update-db',
                    icon: 'feather icon-refresh-cw'
                },
                {
                    id: 'planinificate',
                    title: 'Planification Mise à jour',
                    type: 'item',
                    icon: 'feather icon-calendar',
                    url: '/planificate'
                }
            ]
        }
        /* 
        {
             id: 'chart-maps',
             title: 'Chart & Maps',
             type: 'group',
             icon: 'icon-charts',
             children: [
                 {
                     id: 'charts',
                     title: 'Charts',
                     type: 'item',
                     icon: 'feather icon-pie-chart',
                     url: '/charts/nvd3'
                 },
                 {
                     id: 'maps',
                     title: 'Map',
                     type: 'item',
                     icon: 'feather icon-map',
                     url: '/maps/google-map'
                 }
             ]
         },
         {
             id: 'pages',
             title: 'Pages',
             type: 'group',
             icon: 'icon-pages',
             children: [
                 {
                     id: 'auth',
                     title: 'Authentication',
                     type: 'collapse',
                     icon: 'feather icon-lock',
                     badge: {
                         title: 'New',
                         type: 'label-danger'
                     },
                     children: [
                         {
                             id: 'signin-1',
                             title: 'Sign in',
                             type: 'item',
                             url: '/auth/signin-1',
                             target: true,
                             breadcrumbs: false
                         }
                     ]
                 },
 
                 {
                     id: 'sample-page',
                     title: 'Sample Page',
                     type: 'item',
                     url: '/sample-page',
                     classes: 'nav-item',
                     icon: 'feather icon-sidebar'
                 },
                 {
                     id: 'docs',
                     title: 'Documentation',
                     type: 'item',
                     url: '/docs',
                     classes: 'nav-item',
                     icon: 'feather icon-help-circle'
                 },
                 {
                     id: 'menu-level',
                     title: 'Menu Levels',
                     type: 'collapse',
                     icon: 'feather icon-menu',
                     children: [
                         {
                             id: 'menu-level-1.1',
                             title: 'Menu Level 1.1',
                             type: 'item',
                             url: '#!',
                         },
                         {
                             id: 'menu-level-1.2',
                             title: 'Menu Level 2.2',
                             type: 'collapse',
                             children: [
                                 {
                                     id: 'menu-level-2.1',
                                     title: 'Menu Level 2.1',
                                     type: 'item',
                                     url: '#',
                                 },
                                 {
                                     id: 'menu-level-2.2',
                                     title: 'Menu Level 2.2',
                                     type: 'collapse',
                                     children: [
                                         {
                                             id: 'menu-level-3.1',
                                             title: 'Menu Level 3.1',
                                             type: 'item',
                                             url: '#',
                                         },
                                         {
                                             id: 'menu-level-3.2',
                                             title: 'Menu Level 3.2',
                                             type: 'item',
                                             url: '#',
                                         }
                                     ]
                                 }
                             ]
                         }
                     ]
                 },
                 {
                     id: 'disabled-menu',
                     title: 'Disabled Menu',
                     type: 'item',
                     url: '#',
                     classes: 'nav-item disabled',
                     icon: 'feather icon-power'
                 },
                 {
                     id: 'buy-now',
                     title: 'Buy Now',
                     type: 'item',
                     icon: 'feather icon-user',
                     classes: 'nav-item',
                     url: 'https://codedthemes.com',
                     target: true,
                     external: true,
                     badge: {
                         title: 'v1.0',
                         type: 'label-primary'
                     }
                 }*/
    ]
}
