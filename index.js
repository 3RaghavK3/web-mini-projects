
const videosWrapper=document.getElementById("video-wrapper")
const inputSearch=document.getElementById("search")
const url="https://api.freeapi.app/api/v1/public/youtube/videos"
const videoData=new Array();


const fetchApi=async(url)=>{
    try{
        const response=await fetch(url);
        if(!response.ok) throw new Error("Response not okay")
        const parsedData=await response.json();
        return parsedData.data.data
    }
    catch(err){
        console.log("Failed in fetching api")
        console.log(err.message)
    }
}

const parsedData=await fetchApi(url)

const generateVideoCard=(title,channelTitle,thumbnailUrl,RedirectUrl)=>{
    let videoCard = document.createElement("div");
    videoCard.classList.add("grid-card");

    let imageHolder = document.createElement("div");
    imageHolder.classList.add("thumbnail");
    imageHolder.style.backgroundImage = `url('${thumbnailUrl}')`;

    let titleholder = document.createElement("div");
    titleholder.classList.add("title-text")
    titleholder.innerText = title;

    let channelName = document.createElement("div");
    channelName.classList.add("channel-text")
      channelName.innerText = channelTitle;

    videoCard.appendChild(imageHolder);
    videoCard.appendChild(titleholder);
    videoCard.appendChild(channelName);

    videosWrapper.appendChild(videoCard)

    videoCard.addEventListener("click",()=>{
        window.open(`https://www.youtube.com/watch?v=${RedirectUrl}`);
    })
}


parsedData.forEach(video => {
    const RedirectUrl=video.items.id;
    const title=video.items.snippet.title;
    const channelTitle=video.items.snippet.channelTitle;
    const thumbnailUrl=video.items.snippet.thumbnails.medium.url;
    console.log(title,channelTitle,thumbnailUrl);
    videoData.push({title,channelTitle,thumbnailUrl})
    generateVideoCard(title,channelTitle,thumbnailUrl,RedirectUrl)
});


const filtervideo = (target) => {
    const targetLower = target.toLowerCase();
    videosWrapper.innerHTML = "";

    let DisplayedData=videoData
        .filter(video => 
            video.title.toLowerCase().includes(targetLower) || 
            video.channelTitle.toLowerCase().includes(targetLower)
        )
        
    if(DisplayedData.length===0){
        let errmessage=document.createElement("div")
        errmessage.innerHTML="No vidoes found"
        errmessage.classList.add("not-found")
        videosWrapper.appendChild(errmessage);
    }
    else{
        DisplayedData.forEach(video => generateVideoCard(video.title, video.channelTitle, video.thumbnailUrl));
    }
};


inputSearch.addEventListener("input",()=>{
    let searchedInput=inputSearch.value;
    filtervideo(searchedInput)
})

