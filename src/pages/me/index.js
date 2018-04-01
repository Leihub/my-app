import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {UserModel} from '../../dataModel.js'
let $ = window.Zepto
let Style = {
  avatar:{
    height: '2.5rem',
  },
  content:{
    position:'absolute',
    top:'30px',
    left:'0',
    right:'0',
    bottom:'0'
  }
}
class Me extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      avatar:'',
      username:'',
     };
  }
  componentDidMount() {
    console.log('aa')
    let USER_Token = UserModel.fetchToken()
    if(!USER_Token){
      window.location.hash = '/login'
      return 
    }
    UserModel.getUserInfo({token:USER_Token},(data)=>{
      this.setState({
        avatar:data.avatar,
        username:data.username
      })
    },(err)=>{
      console.log(err)
    })
  }
  openUpload(e){
    e.stopPropagation()
    this.refs.avatar.click()
  }
  uploadAvatar(e) {
    let _file = e.target.files[0];
    console.log(_file, '2222')
    if(_file.size > 204800){
      $.alert('头像大小不能超过200k')
      return
    }
    let avatarForm = this.refs.avatarForm
    let data = new FormData(avatarForm)
    let token = UserModel.fetchToken()
    data.append('token',token)
    
    UserModel.uploadAvatar(data,(data)=>{
      $.toast(data.content)
      // this.componentDidMount()
    },(err)=>{
      console.log(err)
    })
  }
  signOut(e){
    e.preventDefault();
    $.confirm('您要退出登录吗？',()=>{
      window.localStorage.removeItem('userToken')
      window.location.hash='/login'
    })
  }
  render() {
    return (
      <div>
          <header className="bar bar-nav" style={{position:'relative'}}>
            <h1 className="title">我</h1>
          </header>
          <div className="content" style={Style.content}>
            <div className="list-block">
              <ul>
                <li className="item-content item-link">
                  <div className="item-media"><i className="icon icon-f7"></i></div>
                  <div className="item-inner">
                    <form id="avatarForm" ref="avatarForm" style={{display:'none'}}>
                      <input type="file" id="avatar" ref="avatar" name="avatar" style={{display:'none'}}
                       onChange={this.uploadAvatar.bind(this)}/>
                    </form>
                    <div className="item-title">
                      <img src={this.state.avatar} style={Style.avatar} onClick={(e)=>{
                        this.openUpload(e)
                      }}/>
                    </div>
                    <div className="item-after">{this.state.username}</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="list-block">
              <ul>
                <li className="item-content">
                  <div className="item-media"><i className="icon icon-edit"></i></div>
                  <div className="item-inner">
                    <div className="item-title" style={{cursor:'pointer'}} onClick={()=>{
                      window.location.hash="/myArticle"
                    }}>我的文章</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="content-block">
              <p><a  className="button button-big button-fill button-danger" onClick={(e)=>{
                this.signOut(e)
              }}>退出登录</a></p>
            </div>
          </div>
      </div>
      
    );
  }
}

export default Me;