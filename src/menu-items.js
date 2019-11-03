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
            }
        ]
    }
]

const navigation = { items: JSON.parse(JSON.stringify(initNavigation)) }

export function resetNavigation() {
    navigation.items = JSON.parse(JSON.stringify(initNavigation))
}

function addCategoriesToNav(categories) {
    // const plateaux = navigation.items[1].children[0].children
    // // to prevent readding categories by rerendering
    //  if (plateaux.length === 1)
    categories.forEach(category => {
        let categoryNav = { type: 'item' }
        categoryNav.id = category.name.replace(/\s+/g, '-').toLowerCase()
        categoryNav.title = category.name
        categoryNav.url = "/projets/category/" + category.id
        // adding the category to the navigation object
        navigation.items[1].children[0].children.push(categoryNav)
    })
}

// ONLY ADMIN CAN CREATE ACCOUNTS
function upadateParametersNav(username) {
    const parametersMenuItem = navigation.items[navigation.items.length - 1].children
    if (username === "admin")
        parametersMenuItem.push({
            id: 'account',
            title: 'Gestion comptes',
            type: 'item',
            icon: 'feather icon-users',
            url: '/gestion-comptes'
        })
}

export function setUpSideBar(categories, role) {
    //adding categories to sidebar navigation
    addCategoriesToNav(categories)
    upadateParametersNav(role)
}
export default navigation;
