import React, { Component } from 'react';
import axios from 'axios';
import Post from '../components/Post/Post';

import NewPost from '../components/NewPost/NewPost';
import './Blog.css';
import FullPost from '../components/FullPost/FullPost';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,

    }

    //mit axios.get bekommt man die daten in die then methode setstate
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {
            //slice ausschne ein berreich vom array
            const posts = res.data.slice(0, 4);
            //man kann auch direkt objekte einfügen mit map und connst zb authoren
            const updatedPosts= posts.map(post=>{
                return {
                    ...post,
                    author: 'Max'
                }
            })
            //das reicht für die gesamte abfrage
            this.setState({
                //normale abfrage
                //posts: res.data

                //abfrage bearbeitet wie oben
                posts: updatedPosts
            });
            //console.log(res);
        })
    }

    postSelectedHandler = (id) =>{
        //console.log('click', id)
        this.setState({selectedPostId: id})
    }

    render () {
        //variable aussuchen und mappen mit einer arrow funcion p als syono verwenden einzelne json objekte in Post componente einbauen
        const posts = this.state.posts.map(p =>{
            return <Post 
            key={p.id} 
            title={p.title} 
            author={p.author}
            clicked={()=>this.postSelectedHandler(p.id)} 
            
            />
        });
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} 
                    />
                </section>
                <section>
                    <NewPost/>
                </section>
            </div>
        );
    }
}

export default Blog;