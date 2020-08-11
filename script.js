/* hw */

const teg = document.querySelector(".undertext");
let flagError = 0;

const serviceAvailable = () => {
    axios.get('/serviceavailable/')
        .then(resp => checker(resp))
        .catch(er => console.log(er));
};

const checker = async (ask) => {
    if (ask.status === 200 && ask.request.responseText === "{  \"isSucceeded\" : true}") {
       await axios.get('/getinfo/').then(resp => answer(resp)).catch(er => error(er));
       await axios.get('/getdescription/').then(resp => answer(resp)).catch(er => error(er));
        }
    else {
        createAnswr("Произошла ошибка");
    }
}

const answer = (ask) => {
   createAnswr(ask.data.text);
}

const error = (ask) => {
    flagError++;
    if (flagError === 2){
        console.log("Server Error");
        flagError = 0;
    }
}

const createAnswr = (text) => {
        teg.insertAdjacentHTML('beforebegin',
            `<br>${text}`);
    };
