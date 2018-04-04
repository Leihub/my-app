import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {ArticleModel,UserModel} from '../../dataModel.js'
import '../../static/css/style.css'
import {dateDiff} from '../../tools/dateDiff.js'

// let Style={
//   comment:{
//     position:'fixed',
//     bottom:'0',
//     left:'0',
//     height:'60px',
//     zIndex:'999',
//     width:'100%',
//     background:'#fff'
//   }
// }
let $ = window.Zepto
class articleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // commentList:[],
      article:'',
      author:'',
      comment:[]
    }
  }


  componentDidMount() {
    let id = this.props.match.params.id
    this.fetchArticle(id)
  }
  fetchArticle(id){
    ArticleModel.fetchArticle(id,(data)=>{
      this.setState({
        article:data.content,
        author:data.content.author,
        comment:data.content.comments
      })
    },(err)=>{
      console.log(err)
    })
  }
  checkLogin(){
    let usertoken = UserModel.fetchToken()
    if(!usertoken){
      $.alert('您还没有登录')
    }
    return 
  }
  commentList(){
    console.log(this.state.comment)
    let commentList = this.state.comment.map(function(item,index){
      var reactId = 0
      return (
        <li className="row" key={index}>
          <div className="col-15" style={{padding:'0.3rem 0'}}>
            <img src={item.avatar} className="commentAvatar"/>
          </div>
          <div className="col-85 commentList" >
            <div style={{fontWeight: 'bold', fontSize: '15px'}}>{item.username}</div>
            <p style={{margin: '0.2rem 0', fontSize: '14px'}}>{item.comment}</p>
            <div><span className="icon icon-clock"> </span>{dateDiff(item.createAt)}</div>
          </div>

        </li>
      )
    })
    return (
      <ul>
        {commentList}
      </ul>
    )
    
  }


  render() {
    return (
      <div>
        <main className="detailContent">
          <h2 className="clearPt">{this.state.article.title}</h2>
          <div>
            <span className="font12 marR">{`作者：${this.state.author.username}`}</span>
            <span className="font12">{`发表于：${dateDiff(this.state.article.createAt)}`}</span>
          </div>
          <hr/>
          <div className="article">{this.state.article.content}</div>
          <hr/>
          <div>
          <h3 className="clearPL">评论:</h3>
          {this.commentList()}
          </div>
        </main>
        <div className="comment row no-gutter">
          <input type="text" className="col-75 commentInput" placeholder="说点什么吧" style={{border:'none'}} onChange={()=>{
            this.checkLogin()
          }}/>
          <a className="button button-fill button-big col-25">评论</a>
        </div>
      </div>
    );
  }
}


export default articleDetail;