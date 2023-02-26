const CLIENTE = require('./Client.js');

// const POSTS = async () => {

//     try {
//         const database = CLIENT.db('portal-noticia');
//         const posts = database.collection('posts');

//         const post = posts.find();
        
//         return post;
        
//     } finally {
//         await client.close();
//     }

// }

class Posts {

    constructor() {
        this.cliente = CLIENTE;
        this.query;
        this.order;
    }

    async db() {
        try {
            const database = this.cliente.db('portal-noticia');
            const posts = database.collection('posts');
    
            const postCursor = posts.find();
            
            return postCursor;
            
        }catch(e) {
            console.log(e);
        }
    }

    async get() {
        return  {
            data: await this.db().then()
        }

    }

}

module.exports = Posts;