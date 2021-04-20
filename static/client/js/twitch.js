const request = new XMLHttpRequest(); //rq
const client = 'dc7wr3lih719f4rbzzto691gp7epbk';
const game_num = 5;
let game_name = encodeURIComponent('League of Legends');
let base_url = `https://api.twitch.tv/kraken/streams/?game=${game_name}&limit=${game_num}`;  //https://api.twitch.tv/kraken/games/top

function put_live(json){

    const live_container = document.querySelector('.live');
    live_container.innerHTML = '';
    console.log(json.streams.length)
    for(let i=0; i<json.streams.length;i++){
        const game_tv = document.createElement("div");
        game_tv.classList.add('game-tv');
        game_tv.innerHTML = `
        <a class="game-link" href="${json.streams[i].channel.url}" target="_blank">

        <div class="pic col">
            <img src="${json.streams[i].preview.medium}"></div>
        <div class="lang col">語言 ： ${json.streams[i].channel.broadcaster_language}</div>
        <div class="viewer col">觀看人數：${json.streams[i].viewers}</div>


        <div class="tv-name col">主題 ： ${json.streams[i].channel.status}</div>
        </a>
        `;
        live_container.appendChild(game_tv);
    }
}
function download_twitch(){
    request.onload = function(){
        if (request.status>=200 && request.status<400){
            const response = request.responseText;
            const json = JSON.parse(response);
            console.log(json.streams);
            put_live(json);
        }else{
            console.log('error');
        }
    }
    request.open("GET",base_url,true); //非同步
    request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
    request.setRequestHeader('Client-ID',client);
    request.send();
}

document.querySelector(".container").addEventListener("click",
    function(e){
        if (e.target.classList.value === 'lol'){
            game_name = encodeURIComponent('League of Legends');
            base_url = `https://api.twitch.tv/kraken/streams/?game=${game_name}&limit=${game_num}`;
            download_twitch();
        }else if (e.target.classList.value === 'hs'){
            game_name = encodeURIComponent('Apex');
            base_url = `https://api.twitch.tv/kraken/streams/?game=${game_name}&limit=${game_num}`;
            download_twitch();
        }
    }
)