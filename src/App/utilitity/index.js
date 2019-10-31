//Query creator
//const DATE_FORMAT = 'YYYY-MM-DD';
export const formatDate = (moment) => {
    return moment.format('YYYY-MM-DD')
};
export const query = (params) => {
    let theQuery = ''
    if (params.page && params.pageSize)
        theQuery += `?page=${params.page}&size=${params.pageSize}`
    if (params.sortField)
        theQuery += `&sort=${params.sortField},${params.sortOrder === 'descend' ? 'desc' : 'asc'}`
    if (params.state && params.state.length !== 0)
        theQuery += `&state=${params.state[0]}`
    if (params.startDate && params.endDate) {
        if (theQuery !== '')
            theQuery += "&"
        else
            theQuery += "?"
        theQuery += `startPeriod=${formatDate(params.startDate)}&endPeriod=${formatDate(params.endDate)}`
        console.log('theQuery', theQuery)
    }
    return theQuery;
}

// Update the state 
const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

// Setup config with token - helper function
//initToken params is used by loaduser action if the user is logged in for the first time
export const tokenConfig = (initToken = undefined) => {
    // Get token from state
    let token = localStorage.getItem("token")

    if (initToken)
        token = initToken

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // If token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
};

export const calculateAge = (birthday) => { // birthday is a date
    birthday = new Date(birthday);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

//CHECK IF AN OBJECT IS EMPTY , mean equal to "{}" ; 
// return true if it's empty
export const objectIsEmpty = (obj) => { // birthday is a date
    return (Object.entries(obj).length === 0 && obj.constructor === Object)
}

//compute the date 
export const dateFr = () => {
    // les noms de jours / mois
    let jours = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    let mois = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
    // on recupere la date
    let date = new Date();
    // on construit le message
    let message = jours[date.getDay()] + " ";   // nom du jour
    message += date.getDate() + " ";   // numero du jour
    message += mois[date.getMonth()] + " ";   // mois
    message += date.getFullYear();
    return message;
}

export default updateObject