const CLIENTE = require('./Client.js');

class Posts {

    constructor() {
        this.cliente = CLIENTE;
        this.query = {};
        this.order;
    }

    async getAllPosts() {
        try {
            const posts = this.conexao();
            const postCursor = posts.find(this.query, { sort : {_id : -1}});
            const data = await this.organizationAndDataReturn(postCursor);
            
            return data;

        }catch(e) {
            console.log(e);
        }
    }

    async getPost(slugValue) {

        try {
            const post = this.conexao();
            const cursor = await post.findOne({ slug : slugValue });
            await post.updateOne( { slug : slugValue }, { $inc : {views : 1}});
            return cursor;

        }catch(e) {
            console.log(e)
        }

    }

    async getAllPostsTop() {
        try {
            const posts = this.conexao();
            const postCursor = posts.find(this.query, { sort : { views: -1}}).limit(2);
            const data = await this.organizationAndDataReturn(postCursor);
            
            return data;

        }catch(e) {
            console.log(e);
        }
    }

    async search(query) {
        try {
            const posts = this.conexao();
            const postCursor = posts.find({titulo : {$regex : query}}, { sort : {_id: -1}});
            const data = await this.organizationAndDataReturn(postCursor);
            
            return data;

        }catch(e) {
            console.log(e);
        }
    }

    conexao() {
        const database = this.cliente.db('portal-noticia');
        return database.collection('posts');
    }

    async organizationAndDataReturn(arr = []) {
        if(arr.length === 0) return arr;

        const data = [];

        for await (const post of arr) {
            data.push(post);
        }

        return data;

    }
 
}

module.exports = Posts;