import React, { Component } from 'react';
import {ArticleModel,UserModel} from '../../dataModel.js'
import setPageTitle from '../../components/HOC/setPageTitle.js'

let $ = window.Zepto

@setPageTitle
class CreatArticle extends Component {
  constructor(props) {
    super(props)
    var token = UserModel.fetchToken()
    if(!token){
      window.location.hash = '/login'
    }
    this.state = {
      title: '',
      content: '',
      head:'发表文章',
      article_id:''
    }
  }
  componentDidMount() {
    let article_id = this.props.match.params.id
    if(article_id){
      this.setState({
        head:'修改文章',
        article_id:article_id
      })
      ArticleModel.fetchArticle(article_id,(data)=>{
        this.setState({
          title:data.content.title,
          content:data.content.content
        })
      },(err)=>{
        console.log(err)
      })
    }
  }
  handleCancel(){
    this.setState({
      title: '',
      content: ''
    })
    window.location.hash="/indexList"
  }
  
  handleChangeVal(e, key) {
    let val = e.target.value
    switch (key) {
      case 'title':
        this.setState({
          title: val
        })
        break;
      case 'content':
        this.setState({
          content: val
        })
        break;
    }
  }
  publishArticle() {
    let usertoken = UserModel.fetchToken()
    if(usertoken){
      console.log(this.state.title,this.state.content)
      if(this.state.title==''){
        $.alert('标题不能为空')
        return
      }
      if(this.state.content==''){
        $.alert('内容不能为空')
        return
      }
      let pushObject = {
        article:this.state.article_id,
        title:this.state.title,
        content:this.state.content,
        token:usertoken
      }
      ArticleModel.pulish(pushObject,(data)=>{
        $.toast(data.content)
        window.location.hash="/indexList"
      },(err)=>{
        console.log(err)
      })
    }else{
      $.alert('您还没有登录')
    }
  }
  render() {
    return (
        <div>
          <header className="bar bar-nav">
            <h1 className="title">{this.state.head}</h1>
          </header>
          <div className="content">
            <div className="list-block">
              <ul>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-input">
                        <input type="text" placeholder="请输入标题" value={this.state.title} onChange={(e)=>{
                          this.handleChangeVal(e,'title')
                        }}/>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="align-top">
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-input">
                        <textarea placeholder="请输入内容" style={{height:'13rem'}} value={this.state.content} onChange={(e)=>{
                          this.handleChangeVal(e,'content')
                        }}></textarea>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="content-block">
              <div className="row">
                <div className="col-50"><a className="button button-big button-fill button-danger" onClick={()=>{
                  this.handleCancel()
                }}>取消</a></div>
                <div className="col-50"><a className="button button-big button-fill button-success" onClick={()=>{
                  this.publishArticle()
                }}>发表</a></div>
              </div>
            </div>
          </div>
          
        </div>
    );
  }
}

export default CreatArticle;