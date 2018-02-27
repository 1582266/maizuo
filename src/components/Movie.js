import React, { Component } from 'react';
import axios from "axios";

class Movie extends Component{
    constructor(props){
        super(props);
        this.state = {
            films : []
        }
    }
    componentDidMount(){
        axios.get("/v4/api/film/now-playing?__t=1517832559924&page=1&count=5")
		.then((res)=>{
            this.setState({
                list:res.data.data.films
            })
		})
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}
export default Movie;