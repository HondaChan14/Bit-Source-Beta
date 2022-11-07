
const commit = document.querySelectorAll("#commit");
const deleteButton = document.querySelectorAll("#deleteBtn")

Array.from(commit).forEach((element)=>{
    element.addEventListener('click', addCommit)
})

Array.from(deleteButton).forEach((element)=>{
    element.addEventListener('click', deleteCommit)
})


async function addCommit() {
    const itemTitle = this.parentNode.childNodes[1].innerText
    const parent = this.parentNode
    const itemLink =  parent.parentNode.childNodes[9].href
    //console.log(itemTitle)
    //console.log(itemLink)
    try{
        const response = await fetch('board', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'title': itemTitle, 'link': itemLink
            })
        })
        const data = await response.json()
        //console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function deleteCommit(){
    const commitId = this.dataset.id
    try{
        const response = await fetch('dashboard/deleteCommit', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'idFromMainJs': commitId
            })
        })
        if(response.status === 200){
            this.closest("li").remove()
        }
    }catch(err){
        console.log(err)
    }
}