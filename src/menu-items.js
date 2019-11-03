export const initNavigation = [
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
                url: '/dashboard',
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
                        title: 'Non catégorisés',
                        type: 'item',
                        url: '/projets/uncategorized'
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
                id: 'account',
                title: 'Gestion comptes',
                type: 'item',
                icon: 'feather icon-users',
                url: '/gestion-comptes'
            }
        ]
    }
]

const navigation = { items: JSON.parse(JSON.stringify(initNavigation)) }

export function resetNavigation() {
    navigation.items = JSON.parse(JSON.stringify(initNavigation))
}

export default navigation;
