/**
* Function to Clipboard element
* add data-copy in DOM element
* @parm {Object} event DOM
* @return {String}
*/
export function copyCodeToClipboard(e){
    navigator.clipboard.writeText(e.target.dataset.copy) 
}

/**
* Function to clip start and end of string
* @parm {String}
* @return {String}
*/
export function substringAddress(address) {
    let start = address.substring(0, 7)
    let end = address.substring(address.length - 5, address.length)
    return `${start}...${end}`
}

/**
* Function fixe balance to 2 decimals
* @parm {number}
* @return {number}
*/
export function fixeBalance(balance) {
    return Number.parseFloat(balance).toFixed(2);
}

/* Function to save JSON to file from browser
* @param {Object} data -- json object to save
* @param {String} file -- file name to save to 
*/
export function saveJSON(data, filename){
    if(!data) {
        console.error('No data')
        return;
    }
    if(!filename) filename = 'console.json'
    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }
    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')
    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}

/**
* Shuffle array
* @parm {array}
* @return {array}
*/
export function shuffleArray(array){
    return [...array].sort(()=> Math.random() - 0.5);
}

/**
* Regex to verify if this is eth address
* @parm {String}
* @return {true / false}
*/
export function isEthereumAddress(address) {
    return address.match(/^0x[a-fA-F0-9]{40}$/)
}