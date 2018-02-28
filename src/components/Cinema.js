import React, { Component } from 'react';
import axios from "axios";
import "../style/cinema.css";
import { Accordion, List } from 'antd-mobile';

class Cinema extends Component{
    constructor(props){
        super(props);
        this.state = {
            cinemas:[],
            area:[]
        }
    }
    componentDidMount(){
        axios.get("/v4/api/cinema")
        .then((res)=>{
            this.state.cinemas = res.data.data.cinemas;
            this.state.cinemas.map((item,index)=>{
                if(this.state.area.indexOf(item.district.name) == -1){
                    this.state.area.push(item.district.name);
                }
            })
            
            this.setState({
                area: this.state.area,
                cinemas: res.data.data.cinemas
            })
        })
    }
    render() {
        return (
            <div className="cinema" >
                <Accordion defaultActiveKey="0" className="my-accordion" >
                {
                    this.state.area.map((item,index)=>{
                        return(
                            <Accordion.Panel header={item} key={index}>
                                <List className="my-list">
                                    <List.Item>
                                        <ul>
                                            {
                                                this.state.cinemas.map((val,index)=>{
                                                    if(val.district.name == item){
                                                        return(
                                                            <li key={val.id}>
                                                                <h5>
                                                                    <div>
                                                                        <h2>{val.name}</h2>
                                                                        <i className="iconfont">&#xe62d;</i>
                                                                        <i className="iconfont">&#xe653;</i>
                                                                    </div>
                                                                    {val.labels.length ? <p>可乐爆米花</p> : ""} 
                                                                    <h3>{val.address}</h3>
                                                                    <h4>距离未知</h4>
                                                                </h5>
                                                                <h5 className="iconfont">&#xe6a7;</h5>
                                                            </li>
                                                        )
                                                    }
                                                    
                                                })                                             
                                            }
                                        </ul>
                                    </List.Item>
                                </List>
                            </Accordion.Panel>
                        )
                    })
                }
                </Accordion>
            </div>                  
        );
    }
}
export default Cinema;