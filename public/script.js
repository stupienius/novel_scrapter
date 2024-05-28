let model = 1;
changeModel(model);

async function scrapeChaperHref() {
    const url = 'https://czbooks.net/n/cpnojii';

    const response = await fetch(`/href?url=${encodeURIComponent(url)}`);
    const data = await response.json();


    if (response.ok) {
        return data.content;
    } else {
        console.log(`Error: ${data.error}`);
        return '#';
    }
}

async function gotoPage(url) {
    console.log("hellp");
    const response = await fetch(`/content?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (response.ok) {
        document.getElementById('content').innerHTML = data.content;
    } else {
        document.getElementById('content').innerText = `Error: ${data.error}`;
    }
    model = 2;
    changeModel(model);
}

async function displayChapterList(){
    const choose_chapter = document.getElementById("choose_chapter");
    const links = await scrapeChaperHref();
    console.log(links);
    for(let i=0;i<links.length;i++){
        choose_chapter.innerHTML += `
        <li onclick="gotoPage('${links[i]}')">chapter${i}</li>
        `
    }
    model = 1;
    changeModel(model);
}

displayChapterList();

function changeModel(index){
    if(index === 0){
        document.getElementById('choose_book').style.display = "block";
        document.getElementById('choose_chapter').style.display = "none";
        document.getElementById('read').style.display = "none";
    }else if(index === 1){
        document.getElementById('choose_book').style.display = "none";
        document.getElementById('choose_chapter').style.display = "grid";
        document.getElementById('read').style.display = "none";
    }else if(index === 2){
        document.getElementById('choose_book').style.display = "none";
        document.getElementById('choose_chapter').style.display = "none";
        document.getElementById('read').style.display = "block";
    }
}