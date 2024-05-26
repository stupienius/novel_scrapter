
async function scrapeChaperList() {
    const url = 'https://czbooks.net/n/cpnojii';

    const response = await fetch(`/scrape?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    console.log(data.content);

    if (response.ok) {
        document.getElementById('choose_chapter').innerHTML = data.content;
    } else {
        document.getElementById('choose_chapter').innerText = `Error: ${data.error}`;
    }
}

scrapeChaperList();

async function startScraping() {
    const url = document.getElementById('url').value;

    const response = await fetch(`/scrape?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    

    if (response.ok) {
        document.getElementById('content').innerHTML = data.content;
    } else {
        document.getElementById('content').innerText = `Error: ${data.error}`;
    }
}