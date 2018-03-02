import React, { Component } from 'react';
import axios from "axios";
import "../style/cinemainfo.css";
import "../style/iconfont.css";
import { Tabs } from 'antd-mobile';

const tabs = [
    { title: <div className="icons"><em className="iconfont">&#xe653;</em><em>取票</em></div> },
    { title: <div className="icons"><em className="iconfont">&#xe90b;</em><em>3D</em></div> },
    { title: <div className="icons"><em className="iconfont">&#xe66b;</em><em>停车</em></div> },
    { title: <div className="icons"><em className="iconfont">&#xe699;</em><em>优惠</em></div> },
    { title: <div className="icons"><em className="iconfont">&#xe6db;</em><em>交通</em></div> }
];

class CinemaInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            infos:[],
            server:{
                "取票" : "暂无信息",
                "3D" : "暂无信息",
                "停车" : "暂无信息",
                "优惠" : "暂无信息",
                "交通" : "暂无信息"
            }
        } 
        this.gotoList = this.gotoList.bind(this);
    }
    componentDidMount(){
        var id = this.props.match.params.id;
        axios.get("/v4/api/cinema/" + id)
        .then((res)=>{
            this.state.infos.push(res.data.data.cinema);
            var tem = res.data.data.cinema.services;
            for(var i = 0;i < tem.length;i ++){
                this.state.server[tem[i].name] = tem[i].description;
            }
            this.setState({
                infos: this.state.infos,
                server : this.state.server
            })
            
        })
    }
    gotoList(id){
        this.props.history.push("/filmlist/" + id);
    }
    render() {
        return (
            <div className="infos">
            {
                this.state.infos.map((item,index)=>{
                    return(
                        <div key={item.id}>
                            <img src="//static.m.maizuo.com/v4/static/app/asset/66461d1a02a9eaa64876c90952c42aed.png" alt=""/>
                            <div>
                                <span className="iconfont">&#xe62d;</span>
                                <div className="msg">
                                    <h3>
                                        <i>订座票</i>
                                        <i onClick={()=>this.gotoList(item.id)}>立即订座</i>
                                    </h3>
                                    <h4>选好场次及座位，到影院自助机取票</h4>
                                </div>
                            </div>
                            <div>
                                <span className="iconfont">&#xe653;</span>
                                <div className="msg">
                                    <h3>
                                        <i>通兑票</i>
                                        <i>立即订票</i>
                                    </h3>
                                    <h4>有效期内到影院前台兑换影票</h4>
                                </div>
                            </div>
                            <div>
                                <span className="iconfont">&#xe615;</span>
                                <div className="msg">
                                    {item.address}
                                </div>
                            </div>
                            <div>
                                <span className="iconfont">&#xe6c2;</span>
                                <div className="msg">
                                    {item.telephones}
                                </div>
                            </div>
                            
                            <div>                          
                                <Tabs tabs={tabs} initialPage={0} >
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                        {this.state.server["取票"]}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                        {this.state.server["3D"]}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                        {this.state.server["停车"]}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                        {this.state.server["优惠"]}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center'}}>
                                        {this.state.server["交通"]}
                                    </div>
                                </Tabs>
                            </div>
                        </div>
                    )
                })
            }                         
            </div>         
        );
    }
}
export default CinemaInfo;



// {                                        
//     item.services.map((val,index)=>{
//         return(
//             this.state.tab.title  &&  val.name === this.state.tab.title.props.children[1].props.children ?  val.description : ""                                
//         )     
//     })
// }  
