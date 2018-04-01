import React, { Component } from 'react';
import md5 from 'md5';


import {UserModel} from '../../dataModel.js'
let $ = window.Zepto
let Style = {
  header:{
    lineHeight:'2.2rem'
  },
  righttab:{
    width:'100%',
    textAlign:'right',
    display:'inline-block'
  }
}
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginFlage:true,
      username:'',
      email:'',
      password:'',
      rpassword:''
    }
  }
  componentDidMount() {
    console.log('app is mount')
  }
  changeLoginFlag(e){
    console.log(e)
    this.setState({
      loginFlag:true
    })
  }
  changeRegisterFlag(e){
    console.log(e.target)
    this.setState({
      loginFlag:false
    })
  }
  handleChangeVal(e, key) {
    let val = e.target.value
    switch (key) {
      case 'username':
        this.setState({
          username: val
        })
        break;
      case 'email':
        this.setState({
          email:val
        })
        break;
      case 'password':
        this.setState({
          password:val
        })
        break;
      case 'rpassword':
        this.setState({
          rpassword:val
        })
        break;
    }
  }
  formReset(){
    this.setState({
      username:'',
      email:'',
      password:'',
      rpassword:''
    })
  }
  userRegister(){
    let reg = /^\s+$/
    let input = this.state
    switch(''){
      case input.username:
        $.alert('用户名不能为空')
        return ;
        break;
      case input.email:
        $.alert('邮箱不能为空')
        return ;
        break;
      case input.password:
        $.alert('密码不能为空')
        return ;
        break;
      case input.rpassword:
        $.alert('两次密码不一致')
        return ;
        break;
    }
    if(!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(this.state.email))){
      $.alert('邮箱格式不正确')
      return
    }
    if(input.password != input.rpassword){
      $.alert('两次密码不一致')
      return
    }
    if(input.password.length < 6){
      $.alert('密码不得少于6位数')
      return
    }
    if(reg.test(input.username)){
      $.alert('用户名不能为空')
      return
    }

    let md5Password = md5(this.state.password)
    let userInfo = {
      username:this.state.username,
      email:this.state.email,
      password:md5Password
    }
    UserModel.register(userInfo,(data)=>{
      if(data.id == '1') {
        $.toast('注册成功')
        UserModel.storeToken(data.content)
        window.location.hash = '/indexList'
      }
      else if(data.id == '2'){
        $.toast(data.content)
      }else if (data.id == '3'){
        $.toast(data.content)
      }
    },(error)=>{
      console.log(error)
    })

  }
  userLogin(){
    let username = this.refs.username.value 
    let password = md5(this.refs.password.value)
    let userInfo = {
      username:username,
      password:password
    }
    console.log(userInfo.username.length)
    if(userInfo.username.length == 0 || userInfo.password.length == 0 ) {
      $.toast('输入错误，请正确输入')
      return
    }
    //get api
    UserModel.login(userInfo,(data)=>{
      console.log(data)
      if(data.id == 0) {
        $.toast(data.content)
        return 
      }
      UserModel.storeToken(data.content)
      $.toast('登录成功')
      window.location.hash = '/me'
    },(error)=>{
      $.toast('登录失败')
    })
  }
  
  render() {
    let loginTemplate = this.state.loginFlag ? (
    <div className="content">
      <div className="list-block">
        <ul>
          <li>
            <div className="item-content">
              <div className="item-media">
                <i className="icon icon-form-name"></i>
              </div>
              <div className="item-inner">
                <div className="item-title label">用户名</div>
                <div className="item-input">
                  <input type="text" placeholder="Your name" ref="username" />
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="item-content">
              <div className="item-media">
                <i className="icon icon-form-name"></i>
              </div>
              <div className="item-inner">
                <div className="item-title label">密码</div>
                <div className="item-input">
                  <input type="password" placeholder="Password" className="" ref="password"  />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="content-block">
        <a href="#" className="button button-big button-fill button-success" onClick={() => {
          this.userLogin()
        }} >登录</a>
      </div>
    </div>
    ) : (
      <div className="content">
       <form action="" onClick={(e) => {
         e.stopPropagation()
       }}>
        <div className="list-block">
          <ul>
            <li>
              <div className="item-content">
                <div className="item-media">
                  <i className="icon icon-form-name"></i>
                </div>
                <div className="item-inner">
                  <div className="item-title label">用户名</div>
                  <div className="item-input">
                    <input type="text" placeholder="Your name" value={this.state.username} onChange={(e)=>{
                      this.handleChangeVal(e,'username')
                    }} />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media">
                  <i className="icon icon-form-name"></i>
                </div>
                <div className="item-inner">
                  <div className="item-title label">邮箱</div>
                  <div className="item-input">
                  <input type="email" placeholder="E-mail" value={this.state.email} onChange={(e)=>{
                    this.handleChangeVal(e,'email')
                  }}/>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media">
                  <i className="icon icon-form-name"></i>
                </div>
                <div className="item-inner">
                  <div className="item-title label">密码</div>
                  <div className="item-input">
                    <input type="password" placeholder="Password" value={this.state.password} onChange={(e)=>{
                    this.handleChangeVal(e,'password')}} />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="item-content">
                <div className="item-media">
                  <i className="icon icon-form-name"></i>
                </div>
                <div className="item-inner">
                  <div className="item-title label">确认密码</div>
                  <div className="item-input">
                    <input type="password" placeholder="Password" value={this.state.rpassword} onChange={(e)=>{
                    this.handleChangeVal(e,'rpassword')}}/>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-block">
          <div className="row">
            <div className="col-50">
              <a href="#" className="button button-big button-fill button-danger" onClick={() => {
                this.formReset()}}>重置</a>
            </div>
            <div className="col-50">
              <a href="#" className="button button-big button-fill button-success" onClick={() => {
                this.userRegister()
              }}>注册</a>
            </div>
          </div>
        </div>
        </form>
      </div>
    )
    return (
        <div>
          <header className="bar bar-nav row" style={Style.header}>
            <a className="col-50" id="login" ref="login" onClick={(e) => this.changeLoginFlag(e)}>
              <span className="tab-label">登录</span>
            </a>

            <a className="col-50" id="register" ref="register" onClick={(e) => this.changeRegisterFlag(e)}>
              <span className="tab-label" style={Style.righttab}>注册</span>
            </a>
          </header>
          {loginTemplate}
        </div>
    );
  }
}

export default Login;