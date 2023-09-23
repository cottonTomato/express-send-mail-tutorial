function arrayToCSV(arr: Array<string>) {
    let out = '';
    let first = true;

    for (const element of arr) {
        if (first) {
            out += element;
            first = false;
        }
        out += `, ${element}`;
    }

    return out;
}

export default arrayToCSV;
