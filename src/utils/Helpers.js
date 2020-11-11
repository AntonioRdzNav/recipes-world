import _ from "lodash"


export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export function isAnyEmpty(/* dynamic number of arguments */) {
    if(!arguments) { return true; }
    return !_.isEmpty(_.intersection(arguments, [undefined, null, "", '']));
}


export function searchInCollection(searchParams) {
    const { collection, searchValue, searchBy } = searchParams;
    
    if(typeof(searchBy) !== "string"){ return []; }

    return _.filter(collection, journal => {
        const journalName = (_.get(journal, searchBy) || "").toLowerCase();
        return (journalName.indexOf((searchValue || "").toLowerCase())) !== -1;
    });
}


export function enrichSnapshotWithId(querySnapshot) {
    const data = [];
    querySnapshot.forEach(doc => {
        const elem = doc.data();
        elem.id = doc.id;
        data.push(elem);
    });
    return data;
}


export function convertTimestampToDate(timestamp) {
    return timestamp && timestamp.toDate && timestamp.toDate();
}