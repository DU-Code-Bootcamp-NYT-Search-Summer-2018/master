
function fetchNYTData(qStr = '', beginDate = '', endDate = '', sort = '', fl = ''){
    var articles;
    var data;
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
    'api-key': "cca7f97c1a174056a680cad28fb81d54",
    'q': qStr,
    'begin_date': "20180101",
    'end_date': "20180102",
    'sort': "newest",
    // 'fl': "snippet",
    // 'hl':'true',
    // 'page':0
    });
    articles = $.ajax({
    url: url,
    method: 'GET',
    }).done(function(result) {
        data = result;
        console.log(result);
        result.response.docs.forEach(element => {
            // console.log(element);
            let headline = element.headline.main;
            let author = element.byline.original;
            let dateOfPub = element.pub_date;
            let snippet = element.snippet;
            let image = element.multimedia[4].url;
            let url = element.web_url;
            let article = `
                <div class="story">
                <h1>${headline}</h1>
                <h3>${author}</h3>
                <h4>Date: ${dateOfPub}</h4>
                <img src="https://www.nytimes.com/${image}" alt=""/>
                <button id="article-btn" class="btn"><a href="${url}" target="_blank"> Read Article </a></button>
                </div>
            `;
            $('#results').append(article);
            console.log(article);
            console.log(image);
        });
        return result;
        
    }).fail(function(err) {
    throw err;
    });
    console.log('This is the output....');
    console.log(data);
    console.log()
    return data;
}