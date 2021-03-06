import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate(){
        if(this.props.id){
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)){
                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
            .then(res =>{
                this.setState({
                    loadedPost: res.data
                })
                //console.log(res);
            });
            }   
        }
    }

    deletedPostHandler = (id) =>{
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
        .then(res=>{
            alert('gelöscht')
        });
    }
    render () {
        let post = <p>Please select a Post!</p>;
        if(this.props.id){
            <p>loading...</p>
        }
        if(this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletedPostHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        
        return post;
    }
}

export default FullPost;