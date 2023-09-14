import express from "express";
import bodyParser from "body-parser";
import {createReadStream} from "node:fs"
import http from "node:http"
import crypto from "node:crypto"
import appSrc from "./app.js";

const app = appSrc(express, bodyParser, createReadStream, crypto, http);

app.all('/sha1/:input/',(req,res)=>{
    res.send(req.hashSha1)
})
app.all('/code/',(req,res)=>{
    let readStream = req.createRead
    readStream.on('open', function(){
        readStream.pipe(res);
    });
})
app.get('/req/', (req, res)=>{
    res.send(req.value)
})
app.post('/req/', (req, res)=>{
    res.send(req.value)
})
app.all(/./,(req,res)=>{
    res.send('itmo371919')
})

app.listen(process.env.PORT || 3000);

