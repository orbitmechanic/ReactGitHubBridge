//Functions that handle and transform date and time formats go here.

function today(){
    // For clarity of what the default is.
    let now = new Date();
    return now;
}

function now(){
    // For clarity of what the default is.
    let today = new Date();
    return today;
}

function dd_mm_yyyy(dd, mm, yyyy){
    // Return date string in European order
    let dateStr = "date=" + dd + '-' + mm + '-' + yyyy
    return dateStr;
};

function mm_dd_yyyy(dd, mm, yyyy){
    // Return date string in American order
    let dateStr = "date=" + mm + '-' + dd + '-' + yyyy
    return dateStr;
};

function dayzAgo(dazAgo,order="European"){
    // Return the date 
    let wayback = today();
    let ago = new Date(wayback.setDate(wayback.getDate() - dazAgo));
    let dd = String(ago.getDate()).padStart(2, '0');
    let mm = String(ago.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = ago.getFullYear();
    let datestr = dd_mm_yyyy(dd, mm, yyyy)
    if (order=="American"){
        mm_dd_yyyy(dd, mm, yyyy)
    }
    return datestr;
};