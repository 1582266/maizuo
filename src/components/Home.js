import React, { Component } from 'react';
import axios from "axios";
import "../style/home.css";
import { Carousel } from 'antd-mobile';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            banner : [],
            nowplaying : [],
            comingsoon:[]
        }
    }
    gotoDetail(id){
        this.props.history.push("/detail/" + id);
    }
    componentDidMount(){
        axios.get("/v4/api/billboard/home")
		.then((res)=>{
            res.data.data.billboards && this.setState({
                banner:res.data.data.billboards
            })
        })

        axios.get("/v4/api/film/now-playing?__t=1517832559924&page=1&count=5")
		.then((res)=>{
            this.setState({
                nowplaying:res.data.data.films
            })
        })

        axios.get("/v4/api/film/coming-soon?__t=1519721324127&page=1&count=3")
		.then((res)=>{
            this.setState({
                comingsoon:res.data.data.films
            })
        })
    }
    render() {
        var that = this;
        return (
            <div>
                <section>
                <Carousel
                    autoplay={true}
                    infinite
                    >
                    {this.state.banner && this.state.banner.map(val => (
                        <a
                        key={val}
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                        <img
                            src={val.imageUrl}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                        />
                        </a>
                    ))}
                </Carousel>
                <ul className="list">
                {
                    this.state.nowplaying.map((item,index)=>{
                        return(
                            <li key={item.id} onClick={()=>that.gotoDetail(item.id)} >
                            <img src={item.cover.origin} alt=""/>
                                <div className="msg">
                                    <div className="left">
                                        <p>{item.name}</p>
                                        <p>142家影院上映 1690615人购票</p>
                                    </div>
                                    <div className="right">
                                        8.4
                                    </div>
                                </div>
                            </li>
                        )
                    })   
                }
                    <li>
                        更多热映电影
                    </li>
                </ul>

                <div className="line">
					<p>即将上映</p>
				</div>

				<ul className="list">
                {
                    this.state.comingsoon.map((item,index)=>{
                        return(
                            <li key={item.id} onClick={()=>that.gotoDetail(item.id)} >
                                <img src={item.cover.origin} alt=""/>
                                <div className="msg">
                                    <div className="left">
                                        <p>{item.name}</p>
                                        <p>142家影院上映 1690615人购票</p>
                                    </div>
                                    <div className="right">
                                        8.4
                                    </div>
                                </div>
                            </li>
                        )
                    })
                        
                }
                    <li>
						更多即将上映电影
					</li>
                </ul>
                </section>
            </div>
           
        );
    }
}
export default Home;