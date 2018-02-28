import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "../style/nav.css";

class Nav extends Component{
    render() {
        return (         
            <div className="nav" onClick={this.props.change}>
                <ul>
                    <Link to="/"><li>
                        <span>首页</span>
                        <span className="iconfont">&#xe6a7;</span>
                        </li></Link>
                    <Link to="/list"><li>
                        <span>影片</span>
                        <span className="iconfont">&#xe6a7;</span>
                        </li></Link>
                    <Link to="/cinema"><li>
                        <span>影院</span>
                        <span className="iconfont">&#xe6a7;</span>                        
                        </li></Link>
                    <Link to=""><li>
                        <span>商城</span>
                        <span className="iconfont">&#xe6a7;</span>                        
                        </li>
                        </Link>
                    <Link to=""><li>
                        <span>我的</span>
                        <span className="iconfont">&#xe6a7;</span>                                                
                        </li></Link>
                    <Link to=""><li>
                        <span>卖座卡</span>
                        <span className="iconfont">&#xe6a7;</span>                                                
                        </li></Link>  
                </ul>
            </div>           
        );
    }
}
export default Nav;