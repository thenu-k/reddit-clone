
//Get post infomation
const get_info_URL = '/get_info';
function refresh(){
    fetch(get_info_URL)
    .then(response=>{console.log(response); return response.json()})
    .then(data =>{ 
        add_to_html(data)
    })
}

//Adding data to html
function add_to_html(data){
    const posts_section = document.querySelector('.posts_section')
    posts_section.innerHTML =''
    console.log(data)
    for(let count=0; count< data.length; count++){
        const string = '<a href="/thread/'+count+'"><div class="post outer theme dark center"><div class="post inner"><div class="username_container outer"><span>'+data[count].username+'</span></div><div class="title_container"><h3>'+data[count].title+'</h3></div><div class="content_container"><p>'+data[count].content+'</p></div></div></div></a>'
        posts_section.innerHTML+= string;
    }
}

refresh()

//Getting account infomation