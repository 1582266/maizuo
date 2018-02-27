import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "../style/nav.css";

class Nav extends Component{
    render() {
        return (         
            <div className="nav" onClick={this.props.change}>
                <ul>
                    <Link to="/"><li>首页</li></Link>
                    <Link to="/movie"><li>影片</li></Link>
                    <Link to=""><li>影院</li></Link>
                    <Link to=""><li>商城</li></Link>
                    <Link to=""><li>我的</li></Link>
                    <Link to=""><li>卖座卡</li></Link>  
                </ul>
            </div>           
        );
    }
}
export default Nav;