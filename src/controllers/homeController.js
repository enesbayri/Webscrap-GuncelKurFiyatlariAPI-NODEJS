const axios = require("axios");
const fs = require("fs");
const apiDataKeys=require("./ApiDataKeys.json");
const download = require('image-downloader');
const puppeteer=require("puppeteer");

const dovizKeys=apiDataKeys.dovizKeys;
const dovizSembols=apiDataKeys.dovizSembols;

const altinKeys=apiDataKeys.altinKeys;

homePage = async (istek, cevap, next) => {

    function ekranGonder(data) {
        //dovizSemboluAl();
        let time = new Date();
        cevap.render("homePage", { "time": time ,"data":data,"keys":dovizKeys,"sembols":dovizSembols});
    }
    axios.get("https://finans.truncgil.com/today.json").then((veri) => {
        if(veri.status==200){
            fs.writeFileSync("currency.txt",JSON.stringify(veri.data));
            ekranGonder(veri.data);
        }
        else{
            let read=JSON.parse(fs.readFileSync("currency.txt"));
            ekranGonder(read);
        }
    }).catch((e) => {
        
        let read=JSON.parse(fs.readFileSync("currency.txt"));
        ekranGonder(read);
    });


}

veriGetir = async () => {

    try {
        /*  Hangi versiyondan veri alırsa ondaki veriyi gönderecek denemesi yaptık
        axios.get("https://finans.truncgil.com/v4/today.json").then((veri)=>{
            console.log(veri.status +" v4");
            return veri.status
        }).catch((e)=>{
            axios.get("https://finans.truncgil.com/v3/today.json").then((veri)=>{
            console.log(veri.status +" v3");
            return veri.status
        }).catch((e)=>{
            axios.get("https://finans.truncgil.com/today.json").then((veri)=>{
            console.log(veri.status +" v0");
            return veri.status
        }).catch((e)=>{
            
        });
        });
        }); */
        //console.log(veri.data);


        //fs.writeFileSync("currency.txt",JSON.stringify(veri.data));
        //let read=JSON.parse(fs.readFileSync("currency.txt"));
        //console.log(read);


    } catch (e) {

    }


}

UrldekiResmiIndir=()=>{
    /*       *****  LİNKTEKİ RESMİ İNDİRME MODÜLÜ *****
            dovizKeys.forEach(e => { 
            const options = {
            url: `https://static.doviz.com/images/flags/${(e.toLowerCase())}.png`,
            dest: `flags/${e}.png`,               // will be saved to /path/to/dest/image.jpg
            };

            download.image(options)
            .then(({ filename }) => {
                console.log('Saved to', filename); // saved to /path/to/dest/image.jpg
                let time = new Date();
                cevap.render("homePage", { "time": time ,"data":data,"keys":dovizKeys});
            })
                    
           }) 
 */
}

dovizSemboluAl=()=>{
    const cevir = async () => {
        const url = `https://paracevirici.com/blog/ulkelerin-doviz-kodlari-para-birimleri-sembolleri.php`;


        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        await page.goto(url);

        /*const [element]=await page.$x('//*[@id="__next"]/div[3]/div[2]/section/div[2]/div/main/div/div[2]/div[1]/p[2]');
        const text=await element.getProperty("textContent");
        console.log(text);
        cevap.json(text);*/
        let dizi=[];
        let dizi2=[];
        for (let i = 0; i < 154; i++) {
            let resultsSelector = `body > div.container > div.content > div.contentScroll > div.contentArea > div.blog_content > table > tbody > tr:nth-child(${i+1}) > td:nth-child(4)`;
            let links = await page.evaluate(resultsSelector => {
                const anchors = Array.from(document.querySelectorAll(resultsSelector));
                return anchors.map(anchor => {
                    const title = anchor.textContent.trim();
                    return title;
                });
            }, resultsSelector);
            dizi.push(links[0]);
            
        }
        for (let i = 0; i < 154; i++) {
            let resultsSelector = `body > div.container > div.content > div.contentScroll > div.contentArea > div.blog_content > table > tbody > tr:nth-child(${i+1}) > td:nth-child(1)`;
            let links = await page.evaluate(resultsSelector => {
                const anchors = Array.from(document.querySelectorAll(resultsSelector));
                return anchors.map(anchor => {
                    const title = anchor.textContent.trim();
                    return title;
                });
            }, resultsSelector);
            dizi2.push(links[0]);
            
        }
        
        //const links1 = links[0].split(" ");
        //const sonuc = links1[0];
        //const birim = links1[1] + " " + links1[2];
        console.log(dizi);
        console.log(dizi2);
        let dovizSembol=[];
        dovizKeys.forEach(e => {
           
            dovizSembol.push(dizi[(dizi2.indexOf(e))]);
        });
        //cevap.render("anaSayfa", { dizi: dizi, sonuc: sonuc, birim: birim,acilim:harfAcilim });
        //await browser.close();
        console.log(dovizSembol);
    }
    cevir();
}



module.exports = {
    homePage,
}