import _ from "lodash"

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