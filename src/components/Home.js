import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "../style/iconfont.css";
import "../style/home.css";
import Movie from "./Movie";
import Nav from "./Nav";

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
            flag: !this.state.flag
        })
    }
    render(){
        var nav = <Nav change={this.changeFlag} />;
        if(this.state.flag == false){
            nav = null;
        }
        return (
            <div className="home">
                {nav}
                <header>
                    <ul>
                        <li className="iconfont icon-sanhengxian" onClick={this.changeFlag}></li>
                        <li>卖座电影</li>
                    </ul>
                    <ul>
                        <li>北京</li>
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