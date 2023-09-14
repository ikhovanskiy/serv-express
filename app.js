export default function appSrc(express, bodyParser, createReadStream, crypto, http){
    
    let hash = function (req, res, next) {
        req.hashSha1 = crypto.createHash('sha1', req.params.input).update(req.params.input).digest('hex')
        next() 
      };
    let req = function (req, res, next) {
        const link = (Object.keys(req.body ).length == 0) ? req.url.substring(7): req.body.addr
        let ans = new Promise((resp, rej)=>{
            http.get(link, res => {
                let data = '';
                res.on('data', chunk => {
                  data += chunk;
                });
                res.on('end', () => {
                  ans = JSON.parse(data);
                  resp(ans)
                })
              }).on('error', err => {
                rej(err.message);
              })
        })
        ans.then((value)=> {
            req.value = JSON.stringify(value)
            next()})     
    }
    let createRead = function (req, res, next){
        req.createRead = createReadStream(import.meta.url.substring(7))
        next()
    }


    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS,DELETE');
        next();
    })
    app.use('/code/', createRead)
    app.use('/sha1/:input/', hash)
    app.use('/req/', req)
    return app
}