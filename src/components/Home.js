import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "../style/iconfont.css";
import "../style/home.css";
import Movie from "./Movie";
import Nav from "./Nav";
import Mark from "./Mark";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false
        }
        this.changeFlag = this.changeFlag.bind(this);
    }
    changeFlag () {
        this.setState({
            flag: !this.state.flag,
            city:""
        })
    }
    componentDidMount(){
        var that = this;
        var BMap = window.BMap;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == window.BMAP_STATUS_SUCCESS){
                var geoc = new BMap.Geocoder();
                geoc.getLocation(r.point, function(rs){
                    var addComp = rs.addressComponents;
                    that.setState({
                        city:addComp.city
                    })
                });         
            }   
        },{enableHighAccuracy: true})
    }
    render(){
        var nav = <Nav change={this.changeFlag} />;
        var mark = <Mark onClick={this.changeFlag} />;
        if(this.state.flag == false){
            nav = null;
            mark = null;
        }
        return (
            <div className="home">
                <ReactCSSTransitionGroup
                transitionName="showNav"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                    {nav}
                </ReactCSSTransitionGroup>
                
                <ReactCSSTransitionGroup
                transitionName="showMark"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                    {mark}
                </ReactCSSTransitionGroup>
                <header>
                    <ul>
                        <li className="iconfont icon-sanhengxian" onClick={this.changeFlag}></li>
                        <li>卖座电影</li>
                    </ul>
                    <ul>
                        <li>{this.state.city}</li>
                        <li className="iconfont icon-jiantouxia"></li>
                        <li className="iconfont icon-xiaoren"></li>
                    </ul>
                </header>
                <section>
                    <Route path="/movie" component={Movie} />
                </section>  
            </div>
        )
    }
}

export default Home;