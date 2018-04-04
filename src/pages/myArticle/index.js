import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import {UserModel} from '../../dataModel.js'
class MyArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[]
    };
  }
  componentDidMount() {
    let userToken = window.localStorage.getItem('userToken')
    console.log(userToken)
    UserModel.fetchArticle({userId:userToken},(data)=>{
      this.setState({
        list:data.content
      })
    },(err)=>{
      console.log(err)
    })
  }
  render() {
    if(!this.state.list){
      return(
        <div></div>
      )
    }
    let list = this.state.list.map((item,index) =>{
        return (
          <li className="item-content" key={item.articleId}>
            <Link to={`/create/${item.articleId}`} style={{display: 'block', width: '100%', height: '100%',color:'#222'}}>
              <div className="item-inner">
                <div className="item-title">{item.title}</div>
              </div>
            </Link>
          </li>
        )
      }) 
    return ( 
      <main>
        <header className="bar bar-nav">
          <h1 className="title">我的文章</h1>
        </header>
        <div className="content">
          <div className="list-block">
            <ul>
              {list}
            </ul>
          </div>
        </div>
      </main>
       
    );
  }
}

export default MyArticle;