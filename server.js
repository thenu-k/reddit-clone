let express = require('express')
const ejs  = require('ejs')
const https = require('https')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

let app = express()
app.use(express.static(__dirname + '/views/')); 
app.set('view engine', 'ejs')

app.listen(process.env.PORT, '0.0.0.0')

let body_parser = require('body-parser')
let json_parser = body_parser.json()

//Data store
var thread_starter_data={    
    title: 'General Chat',
    content: 'Say something motherfucker',
    username: 'San_D_Als_Sensei'
}
var thread_replies_data = []

//Sending the home page
app.get('/',   (req, res)=>{
    //res.redirect('/thread') //redirecting for now
    res.render('./index.ejs')
})

//Sending thread information
app.get('/thread/:thread_number', (req, res)=>{
    var datetime = new Date()

    //Redirecting threads that don't exist
    if(req.params.thread_number>=post_info.length){
        date = new Date()
        console.log('Requested invalid thread @ '+date)
        res.redirect('/404')
    }
    else{
        console.log('Requested thread '+req.params.thread_number+' info @ '+ datetime)
        thread_starter = post_info[req.params.thread_number]
        thread_replies = post_info[req.params.thread_number].replies
        console.log(post_info[req.params.thread_number])
        res.status(200).render('./thread.ejs', {thread_name: '', thread_starter: thread_starter, thread_replies:thread_replies})
    }
})

//Sending post information to the main page
app.get('/get_info', (req, res)=>{
    var datetime = new Date()
    console.log('Requested home page @ '+ datetime)
    res.status(200).send(post_info)
})

//New thread reply
app.post('/post/reply', json_parser, (req, res)=>{
    var datetime = new Date()
    console.log('Received reply for thread '+req.body.index+' @ '+ datetime)
    console.log(req.body)
    thread_number = req.body.index
    try{
        post_info[thread_number].replies.push({
            content: req.body.content,
            username: req.body.username
        })
        res.send({'Post added': req.body})
    }
    catch(e){
        console.log(e)
        res.send({'Error': e})
    }
})

//Create new post
app.get('/new/post', (req, res)=>{
    res.render('new_post.ejs')
})
app.post('/new/post',json_parser, (req, res)=>{
    var datetime = new Date()
    console.log('Received new post @ '+ datetime)
    new_index = post_info.length
    formatted_new_post = {
        title: req.body.title,
        content: req.body.content,
        username: req.body.username,
        index: new_index,
        replies: []
    }
    console.log(formatted_new_post)
    post_info.push(formatted_new_post)
    res.send({
        Status: 'Received data',
        Post: req.body
    })
})

//Sitemap
app.get('/resources/sitemap', (req,res)=>{
    res.sendFile('/views/Sitemap/sitemap.xml', {root: __dirname})
})

//Error page
app.get('/404', (req, res)=>{
    res.status(404).render('404')
})



//Post information
let post_info=[
    {
        title: 'General Chat',
        content: 'Say something motherfucker',
        username: 'San_D_Als_Sensei',
        index: 0,
        replies: []
    }
]