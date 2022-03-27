console.log('Connection established')

//Posting a reply
const post_URL = '/post/reply'
const submit_button = document.querySelector('.submit.outer>span')
const text_area = document.querySelector('.create.reply.outer textarea')
const username_input = document.querySelector('.create.reply.outer input')
submit_button.addEventListener('click', post_reply)
function post_reply(){
    const content_to_send = text_area.value
    var username_to_send = username_input.value
    text_area.value = ''
    username_input.value = ''
    if(username_to_send === ''){username_to_send='Guest'}
    current_url = window.location.href
    let index = current_url.replace(/\D/g, "")
    let formatted_index = index.split('')
    formatted_index = parseInt(formatted_index.slice(-1))
    payload = {
        content: content_to_send,
        username: username_to_send,
        index:formatted_index
    }
    console.log(payload)
    fetch(post_URL,{
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Method' : 'POST',
             }
    }).then(response=>{ return response.json()}).then(data=>{ console.log('Added post');window.location.reload()})
}