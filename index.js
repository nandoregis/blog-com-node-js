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

const posts = new Posts;

app.get('/', (req, res) => {

   if(!req.query.buscar) {

    ( async ()=>{

        const MY_POSTS = await posts.getAllPosts();
        const POSTS_TOP = await posts.getAllPostsTop();
        // const data = [];

        if(MY_POSTS.length > 0) {
            res.render('home', { posts : MY_POSTS, postsTop : POSTS_TOP });
        }else {
            res.render('erro', {});
        }

    })();

   }else {
        ( async () => {

            let buscar = req.query.buscar;
            const PESQUISA = await posts.search(buscar);
            res.render('busca', {busca: buscar, resultado : PESQUISA });
        })();
   }

});

app.get('/:slug', (req, res)=> {
    
    (async ()=> {

        let slug = req.params.slug;

        const data = await posts.getPost(slug);
        const POSTS_TOP = await posts.getAllPostsTop();

        if(data) {
            res.render('single', {post: data, postsTop : POSTS_TOP});
        }else {
            res.render('erro', {});
        }

    })()
  

});


app.listen(5000, () => {
    console.log('server rodando!');
})