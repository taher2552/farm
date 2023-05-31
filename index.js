const { readFileSync } = require('fs');
const http = require('http');
const url = require('url');
// ------------------------------------OUR OWN MODULE------------------------------------------------------------
const replaceTemplate = require('./modules/replaceTemplate');
// --------------------------------------------------------------------------------------------------------------


// top-level-code
const tempOverview = readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')       
const tempCard = readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')               
const tempProduct = readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')         
 
const data = readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {
    // res.end('Hey! I am ravie from server side....');

    // console.log(req.url);
    // const q = url.parse(req.url, true);
    // console.log(q);
    // console.log(q.query);
    // console.log(q.pathname);
    // console.log(q.search);
    // console.log(q.host);    
    // console.log(q.query.id);
    // console.log(q.query.ravie);

    // by using using destructuring,
    const { query, pathname} = url.parse(req.url, true);
    console.log(query);
    console.log(pathname);
   
   // Overview Page 
   if(pathname === '/' || pathname === '/overview') {
       res.writeHead(202, { 'Content-type' : 'text/html'});
       // res.end('<h1>OVERVIEW PAGE</h1>')

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        // console.log(cardsHtml);
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

    // Product Page
    } else if (pathname === '/product') {
        res.writeHead(202, { 'Content-type' : 'text/html'});
        // res.end('<h1>PRODUCT PAGE</h1>');

        // console.log(query);                                  // iska output  { id: '0' } or { id: '1' } or { id: '2' } ..........
        const product = dataObj[query.id];   
        // dataObj is an array => so, product = dataObj ka 0th index or 1 or 2 or  3 ......  (i.e id no) => now create the output by replaceTemplate function.       
        const output = replaceTemplate(tempProduct, product)    
        res.end(output);

    // API
    } else if(pathname === '/api') {
        res.writeHead(200, {'content-type' : 'application/json'});
        res.end(data);

    // NOT FOUND
    } else {
        res.writeHead(404, { 'Content-type' : 'text/html'});
        res.end('<h1>PAGE NOT FOUND</h1>');

    }
})


server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
})