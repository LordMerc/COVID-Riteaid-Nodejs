const axios = require('axios')
const toast = require('powertoast')
const waitFor = (ms) => new Promise(r => setTimeout(r, ms * 1000))
const stores = [] 
// ^ list your store numbers as such: const stores = [100,102,103]
const cache = []
async function StartApp() {
    while (true) {
        for (store in stores) {
            let current_store = stores[store]
            let response = await axios.get(`https://www.riteaid.com/services/ext/v2/vaccine/checkSlots?storeNumber=${current_store}`)
            let slots = response.data.Data
            let incache = cache.find(x => x == current_store)
            if (slots[0] != false && incache == undefined) { // Vaccine IS in stock, and you've not been notified yet
                cache.push(current_store)
                toast({
                    title: "COVID Vaccine In Stock",
                    message: `Store ${current_store} has the vaccine in stock`,
                    onClick: `http://google.com/search?q=riteaid+${current_store}`,
                    icon: "https://ichef.bbci.co.uk/news/1024/cpsprodpb/EAD2/production/_114241106_vaccineillus976_rtrs.jpg"
                }).catch((err) => { 
                    console.error(err);
                });
            }
            await waitFor(2) // prevent ratelimit
        }
        await waitFor(30) // prevent ratelimit
    }
}
StartApp()
