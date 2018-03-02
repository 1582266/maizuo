import React, { Component } from 'react';
import axios from "axios";
import "../style/filmlist.css";
import { Tabs } from 'antd-mobile';


class FilmList extends Component{
    constructor(props){
        super(props);
        this.state = {
            filmlist:[]
        } 
    }
    componentDidMount(){
        var id = this.props.match.params.id;
        axios.get("/v4/api/cinema/" + id + "/film")
        .then((res)=>{
            this.setState({
                filmlist: res.data.data.filmList
            })
        })
    }
    renderContent = tab =>
    (<div style={{ lineHeight:"0.38rem", textAlign: "center",height: "100%", color: "#fff", fontSize: "12px"}}>
      <p>{tab.name}</p>
    </div>);
    render() {
        const tabs = [];
        this.state.filmlist.map((item,index)=>{
            return tabs.push({title: <img src={item.posterAddress} alt="" />,name: item.filmName});            
        })
        const times = [
            { title: 'First Tab' },
            { title: 'Second Tab' },
            { title: 'Third Tab' },
          ];
        return (
            <div className="filmlist">
                <div className="top">
                    <Tabs tabs={tabs}>
                        {this.renderContent}
                    </Tabs>
                </div>
                <div className="bottom">
                    <Tabs tabs={times}
                        initalPage={'t0'}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                        Content of first tab
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                        Content of second tab
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                        Content of third tab
                        </div>
                    </Tabs>
                </div>
            </div>
        )
    }
}
export default FilmList;

