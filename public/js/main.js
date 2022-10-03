const favorite = document.querySelector("#favorite");

Array.from(favorite).forEach((element)=>{
    element.addEventListener('click', addFavorite)
})

async function addFavorite() {
    const itemTitle = this.parentNode.childNodes[1].innerText
    const itemLink =  this.parentNode.childNodes[1].innerText
    console.log(itemTitle)
    console.log(itemLink)
    try{
        const response = await fetch('addFavorite', {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'title': itemTitle, 'link': itemLink
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}