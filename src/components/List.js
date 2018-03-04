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
        this.page = 0;
        this.state = {
            nowplaying : [],
            comingsoon:[]
        }
        this.gotoDetail = this.gotoDetail.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.getMsg = this.getMsg.bind(this);
    }
    gotoDetail(id){
        this.props.history.push("/detail/" + id);
    }
    componentDidMount(){
        this.getMsg(); 
        // window.addEventListener("scroll",this.handleScroll)
    } 
    getMsg(){
        axios.get(`/v4/api/film/now-playing?__t=1517832559924&page=${this.page + 1}&count=7`)
		.then((res)=>{
            var nowplayingTem = [...this.state.nowplaying,...res.data.data.films];
            // nowplayingTem = [...res.data.data.films];
            
            this.setState({
                nowplaying: nowplayingTem
            })
            this.page ++;     
        })

        axios.get(`/v4/api/film/coming-soon?__t=1519721324127&page=1&count=7`)
		.then((res)=>{
            this.setState({
                comingsoon:res.data.data.films
            })
        })
    }
    handleScroll(){
        var scrollTop =  document.body.scrollTop || document.documentElement.scrollTop;
        var boxHeight = this.refs.scrolling.offsetHeight;
        // console.log(boxHeight,scrollTop);

        if(scrollTop > boxHeight * 0.4){
            this.getMsg();
        }
    }
    render() {
        return (
            <div className="movies"  ref="scrolling">
                    <Tabs tabs={tabs}>
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                            <ul>
                                {
                                    this.state.nowplaying.map((item,index)=>{
                                        return(
                                            <li key={index}  onClick={()=>this.gotoDetail(item.id)}>
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