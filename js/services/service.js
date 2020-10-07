async function postData(url, data){
    const res = await fetch(url,{
        method: "POST",
        headers:{
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
}

async function getData(url){
    const res = await fetch(url);

    if(!res.ok){
        throw new Error(`the mistake appeared in ${url} and res is equal to ${res}`);
    }

    return await res.json();
}

export {getData};
export {postData};