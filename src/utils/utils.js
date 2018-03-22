const parseParam = (paramStr) => {
    let pair;
    let dc = decodeURIComponent;
    let paramArr = paramStr.slice(paramStr.indexOf('?') + 1).split('&');
    let paramObj = {};
    
    paramArr.forEach(function (currStr) {
        pair = currStr.split('=');
        paramObj[dc(pair[0])] = dc(pair[1] || '');
    });
    
    return paramObj;
};

const isValidPhone = (phone) => {
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    return myreg.test(phone);
};

const isValidPassword = (password) => {
    let myreg = /^\w{6,20}$/;
    return myreg.test(password);
};

const saveToken = (token) => {
    localStorage.setItem('token', token);
};

const loadToken = () => {
    return localStorage.getItem('token');
};


export {parseParam, isValidPhone, isValidPassword, saveToken, loadToken};