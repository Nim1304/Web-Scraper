const cheerio=require('cheerio');
const request=require('request');
const fs=require('fs');

const write=fs.createWriteStream('output.csv');

write.write(`Name;;Rating;;Availability;;Price \n`);

var url=[]
for(count=1;count<=50;count++){
    url.push(`http://books.toscrape.com/catalogue/page-${count}.html`);
}

// console.log(url);

url.forEach((urls)=>{
    // console.log(urls);
    request(urls,(err,res,html)=>{
        if(!err){
            const $=cheerio.load(html);
            //console.log($);
            $('li').each((i,element)=>{
                const name=$(element).find('h3').find('a');
                // if(name)
                // console.log(name);

                const price=$(element).find('.price_color').text();
                
                const avail=$(element).find('.availability').text().replace(/\s\s+/g, '');
                
                const rating=$(element).find('.star-rating');
                // if(rating.html())
                // console.log(rating.attr('class').replace('star-rating ',''));

                if(name.html()){
                    write.write(`${name.attr('title')};;${rating.attr('class').replace('star-rating ','')};;${avail};;${price} \n`);
                }
            });
        }
    })

})