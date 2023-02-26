const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const app = express();

const Posts = require('./modulos/Posts.js');


app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }));

/*---------------------------------------------- */
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public') ) );
app.set('views', path.join(__dirname, '/pages'));
/*-------------------------------------------------------*/



const posts = async (res) => {
    const posts = new Posts;
    const data = (await posts.get()).data ;
    const arr = [];

    for await (const pet of data) {
        arr.push(pet);
    }
    
    res.render('home', { posts: arr});

}



app.get('/', (req, res) => {

   if(!req.query.buscar) {
    posts(res);
   }else {
        res.render('busca', {busca: req.query.buscar });

   }

});

app.get('/:slug', (req, res)=> {
    res.render('single', {});
});


app.listen(5000, () => {
    console.log('server rodando!');
})