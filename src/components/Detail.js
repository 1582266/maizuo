import React, { Component } from 'react';
import axios from "axios";
import "../style/detail.css";

class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            detail:[]
        }
    }
    componentDidMount(){
        console.log(this.props.match.params.id);
        var id = this.props.match.params.id;
        axios.get("/v4/api/film/" + id)
        .then((res)=>{
            console.log(res);
            this.state.detail.push(res.data.data.film);
            this.setState({
                detail: this.state.detail
            })
        })
    }
    render() {
        var details = this.state.detail;
        console.log(details);
        return (
            <div className="detail">
            {
                details.map((item,index)=>{
                    return(
                        <div key={item.id}>
                            <img src={item.cover.origin} alt="" />
                            <h2><span></span>影片简介</h2>
                            <p>导<i></i>演：{item.director}</p>
                            <p>主<i></i>演：
                            {
                                item.actors.map((item,index)=>{
                                    return(
                                        <span key={index}>{item.name} | </span>
                                    )
                                })
                            }
                            </p>
                            <p>地区语言：{item.language}</p>
                            <p>类<i></i>型：{item.category}</p>
                            <p>上映日期：1月19日上映</p>
                            <h3>{item.synopsis}</h3>
                            <button>立即购票</button>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                    )
                })
            }
                          
            </div>
           
        );
    }
}
export default Detail;