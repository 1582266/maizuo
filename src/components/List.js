import React, { Component } from 'react';
import axios from "axios";
import "../style/list.css";
import { Tabs } from 'antd-mobile';

const tabs = [
    { title: '正在热映' },
    { title: '即将上映' }
];

class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            nowplaying : [],
            comingsoon:[]
        }
        this.gotoDetail = this.gotoDetail.bind(this);
    }
    gotoDetail(id){
        this.props.history.push("/detail/" + id);
    }
    componentDidMount(){
        axios.get("/v4/api/film/now-playing?__t=1517832559924&page=1&count=7")
		.then((res)=>{
            this.setState({
                nowplaying:res.data.data.films
            })
            console.log(this.state.nowplaying);
        })

        axios.get("/v4/api/film/coming-soon?__t=1519721324127&page=1&count=7")
		.then((res)=>{
            this.setState({
                comingsoon:res.data.data.films
            })
            console.log(this.state.comingsoon);
        })
    }
    render() {
        return (
            <div className="movies">
                    <Tabs tabs={tabs}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ul>
                                {
                                    this.state.nowplaying.map((item,index)=>{
                                        return(
                                            <li key={item.id}  onClick={()=>this.gotoDetail(item.id)}>
                                                <img src={item.cover.origin} alt=""/>
                                                <div>
                                                    <h2>
                                                        <span>{item.name}</span>
                                                        <span>{item.grade}
                                                            <i className="iconfont">&#xe6a7;</i>
                                                        </span>
                                                    </h2>
                                                    <h3>{item.intro}</h3>
                                                    <h4>
                                                        <p><span>{item.cinemaCount}</span>家影院上映</p>
                                                        <p><span>{item.watchCount}</span>人购票</p>
                                                    </h4>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ul>
                                {
                                    this.state.comingsoon.map((item,index)=>{
                                        return(
                                            <li key={item.id} onClick={()=>this.gotoDetail(item.id)}>
                                                <img src={item.cover.origin} alt=""/>
                                                <div>
                                                    <h2>
                                                        <span>{item.name}</span>
                                                        <span>{item.grade}
                                                        <i className="iconfont">&#xe6a7;</i>
                                                        </span>
                                                    </h2>
                                                    <h3>{item.intro}</h3>
                                                    <h4>
                                                        <p><span>{item.cinemaCount}</span>家影院上映</p>
                                                        <p><span>{item.watchCount}</span>人购票</p>
                                                    </h4>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </Tabs>
            </div>
        );
    }
}
export default List;