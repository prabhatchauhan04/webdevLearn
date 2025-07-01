function downloadMovie(url){
    return new Promise((res , rej)=>{
        if(!url){
            rej("URL not provided");
        }else{
            console.log("Download Started");
            setTimeout(()=>{
                let movieName = url.split('/').pop();
                res(movieName);
            },2000);
        }
    });
}

let p = downloadMovie("https://filmyzilla.com/movie/Conjuring3");

p.then((movieName)=>{
    console.log("Downloaded Movie",movieName);
}).catch( msg => {
    console.log(msg);
});


