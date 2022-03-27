console.log('Connected')
new_post_URL = '/new/post'

//Sending new post data
const submit_button = document.querySelector('.new_post .submit span')
const title_input = document.querySelector('.new_post .title input')
const content_input = document.querySelector('.new_post textarea')
const username_input = document.querySelector('.new_post .username input')
submit_button.addEventListener('click', submit_post)

function submit_post(){
    var title_value = title_input.value
    var content_value = content_input.value
    var username_value = username_input.value
    title_input.value = ''
    content_input.value = '' 
    username_input.value = ''
    if(title_value!='' && content_input!=''){
        if(username_value==''){ username_value = 'Guest'}
        payload = {
            title: title_value,
            content: content_value,
            username: username_value,
        }
        console.log(payload)
        fetch(new_post_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Method' : 'POST',
                 }
        }).then(response=>{return response.json()}).then(data=> console.log(data); window.location('/'))

    }
    else{
        console.log('test')
    }
}