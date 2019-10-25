// Update the state 
const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

// Setup config with token - helper function
export const tokenConfig = (getState = null) => {
    // Get token from state
    let token = localStorage.getItem("token")
    if (getState !== null) {
        token = getState().token;
    }

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