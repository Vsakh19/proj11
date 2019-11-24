export const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort4' : 'https://praktikum.tk/cohort4';


export class  API {
    constructor(request){
        this.request = request;
    }



    CardsNAddPlace(url, auth, contentType){
        return fetch(`${url}/cards`,{
            headers: {

                authorization: `${auth}`,
            }
        })
            .then((res)=>{
                if(res.ok){
                    return res.json();
                }
                else return  Promise.reject(`Ошибка: ${res.status}`)
            });

    }

    editUserData(){
        popupEdit.formWithin.submitInfo.textContent = "Загрузка...";
        fetch(`${this.request.baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: `${this.request.headers.authorization}`,
                'Content-Type': `${this.request.headers.ContentType}`
            },
            body: JSON.stringify({

                name: `${popupEdit.formWithin.name.value}`,
                about: `${popupEdit.formWithin.job.value}`
            })
        })
            .then((res)=>{
                if(res.ok){
                    return res;
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
            .then(()=>{
                userInfo.textContent = popupEdit.formWithin.name.value;
                userJob.textContent = popupEdit.formWithin.job.value;
                popupEdit.close();
                popupEdit.formWithin.submitInfo.textContent = "Сохранить";
            })
            .catch(()=>{popupEdit.formWithin.submitInfo.textContent = "Ошибка. Попробовать снова?";});
    }

    setUser(){
        fetch(`${this.request.baseUrl}/users/me`, {
            headers: {
                authorization: `${this.request.headers.authorization}`
            }
        })
            .then((res)=>{if(res.ok){
                return res;
            }
                return Promise.reject(`Ошибка: ${res.status}`)})

            .then(res=>res.json())
            .then((res)=>{
                document.querySelector(".user-info__photo").style.backgroundImage = `url(${res.avatar})`;
                document.querySelector(".user-info__name").textContent = res.name;
                document.querySelector(".user-info__job").textContent = res.about;
                return res;
            })
            .then((res)=>{
                document.querySelector(".popup__input_type_name").value = res.name;
                document.querySelector(".popup__input_type_infoProfile").value = res.about;
            })
            .catch(()=>console.log("Error"));
    }
}

export const session = new API({
    baseUrl: serverUrl,
    headers: {
        authorization: '64054b97-077f-410e-a42b-579936b99c8f',
        ContentType: 'application/json'
    }});
