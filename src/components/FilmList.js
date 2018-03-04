import React, { Component } from 'react';
import axios from "axios";
import "../style/filmlist.css";
import "../style/iconfont.css";
import { Tabs } from 'antd-mobile';


class FilmList extends Component{
    constructor(props){
        super(props);
        this.state = {
            filmlist:[],
            schedules:[],
            cinemaId:""
        } 
    }
    componentDidMount(){
        var id = this.props.match.params.id;
        axios.get("/v4/api/cinema/" + id + "/film")
        .then((res)=>{
            this.setState({
                filmlist: res.data.data.filmList,
                cinemaId: this.props.match.params.id
            })
            this.getTimeInfo(this.state.filmlist[0].filmID); 
        })              
    }

    getTimeInfo(filmId){
        axios.get(`/v4/api/schedule?film=${filmId}&cinema=${this.state.cinemaId}`)
        .then((res)=>{
            this.setState({
                schedules: res.data.data.schedules
            })
        })
    }

    renderContent = tab =>
    (<div style={{ lineHeight:"0.38rem", textAlign: "center",height: "100%", color: "#fff", fontSize: "12px"}}>
      <p>{tab.name}</p>
    </div>);

    renderContentT = tab =>
    (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
    <ul>
    {
        tab.timeinfo.map((item,index)=>{
            var startTime = new Date(item.showAt).toLocaleTimeString();
            var endTime = (new Date(item.showAt)).setMinutes(new Date(item.showAt).getMinutes() + item.film.mins);
            var end = new Date(endTime).toLocaleTimeString().substring(0,startTime.length-3);
            return (
                <li key={item.id}>
                    <div>
                        <p className="time_detail">
                            <i>{startTime.substring(0,startTime.length-3)}</i>
                            <i>￥{item.price.maizuo + ".00"}</i>
                        </p>
                        <p className="time_detail">
                            <i>预计{end}结束/{item.film.language}{item.imagery}/{item.hall.name}</i>
                            <s>￥{item.price.cinema + ".00"}</s>
                        </p>
                    </div>
                    <span className="iconfont">&#xe6a7;</span>
                </li>
            )
        })
    }
    </ul>
    </div>);

    render() {
        
        const tabs = [];
        this.state.filmlist.map((item,index)=>{
            return tabs.push({title: <img src={item.posterAddress} alt="" onClick={()=>this.getTimeInfo(item.filmID)} />,name: item.filmName});            
        })
        const times = [];
        const temp = [];
        var tempTime = [];
        var timelist = [];
        this.state.schedules.map((item,index)=>{         
            if(tempTime.indexOf((new Date(item.showAt)).toLocaleDateString()) === -1){
                tempTime.push(new Date(item.showAt).toLocaleDateString());               
            }
            return tempTime;
        })
        for(var i = 0; i < tempTime.length;i ++){
            timelist = [];
            this.state.schedules.map((item,index)=>{         
                if(tempTime[i].indexOf((new Date(item.showAt)).toLocaleDateString()) !== -1){
                    timelist.push(item);
                } 
                return timelist;
            })
            temp.push({title:tempTime[i],timelist:timelist});
        }
        var lenT = temp.length;
        for(var j = 0;j < lenT;j ++){
            times.push({title:temp[j].title.substring(5),timeinfo: temp[j].timelist || "今日无排期"});
        }

        return (
            <div className="filmlist">
                <div className="top">
                    <Tabs tabs={tabs}>
                        {this.renderContent}
                    </Tabs>
                </div>
                <div className="bottom">
                    <Tabs tabs={times}>
                        {this.renderContentT}
                    </Tabs>
                </div>
            </div>
        )
    }
}
export default FilmList;

