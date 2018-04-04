import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import setPageTitle from '../../components/HOC/setPageTitle.js'
import { ArticleModel,UserModel } from '../../dataModel.js'
import {dateDiff} from '../../tools/dateDiff.js';
import Me from '../me'
import '../../static/css/style.css'


let $ = window.Zepto
let StyleMedia ={
  indexList:{
    paddingRight: '0.75rem',
    marginBottom: '0.2rem',
    borderTop: '1px solid #dfdfdf',
    borderBottom: '1px solid #dfdfdf',
    background: "#fff",
    paddingLeft: "0.75rem",
    paddingBottom: "0.3rem"
  },
  h4style:{
    margin: "0.3rem 0",
    color: '#259',
    fontSize: '16px'
  },
  pstyle:{
    margin: "0.3rem 0",
    fontSize: "15px"
  }
}

@setPageTitle
  class IndexList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        list:[],
        defaultTop:null
      };
    }
    componentDidMount() {
      this.fetchData()
    }
    fetchData(){
      ArticleModel.fetchList('',(data)=>{
        this.setState({
          list:data
        })
        // this.loadingFinish(this.refs.outerScroller, this.refs.preloader, this.refs.scrollList)
        
      },(err)=>{
        console.log(err)
      })
    }
    reseat(){
      let defaultTop=this.refs.outerScroller.offsetTop
      this.setState({
        defaultTop:defaultTop,
      })
      this.pullToRefresh()
    }
    //下拉刷新
    // pullToRefresh(outerScroller,pullToRefresh,scrollList,preloader,pullToRefreshArrow){
    //   let _this = this
    //   var touchstart
    //   var defaultTopVal = outerScroller.offsetTop
    //   scrollList.style.height = document.body.clientHeight + 'px'
    //   checkState(outerScroller.offsetTop)
    // }
    giveStar(e){
      console.log(e.target)
      let usertoken = UserModel.fetchToken()
      if(!usertoken){
        $.alert('您还没有登录')
        return
      }
      let target = e.target
      let article_id = target.getAttribute('data-id')
      console.log(article_id)
      let params = {
        userId:usertoken,
        articleId:article_id
      }
      ArticleModel.giveStar(params,(data)=>{
        if(data.title){
          target.style.color = 'red'
          $.toast(data.content)
          this.componentDidMount()
        }else{
          target.style.color = 'none'
          $.toast(data.content)
          this.componentDidMount()
        }
      },(err)=>{
        console.log(err)
      })

    }
    wordControl(content){
      if(content.length > 65) {
        content = content.substring(0,65) + '...'
      }
      return content
    }
    starStyle(data){
      let userToken = UserModel.fetchToken()
      for(let i = 0; i<data.length;i++){
        if(data[i] == userToken){
          return {marginRight:'0.5rem',paddingLeft:'0.3rem',color:'red'}
        }
      }
      return{marginRight:'0.5rem',paddingLeft:'0.3rem'}
    }

    indexList(){
      let _this = this
      let list = this.state.list
      return list.map(function(item,index){
        return(
          <li className="" style={StyleMedia.indexList} key={item._id}>
            <Link to={`/indexList/${item._id}`} style={{display:'block'}}>
              <div className="list">
                <div className="" style={{paddingTop:'0.4rem'}}>
                  <div style={{display:'inline-block',verticalAlign:'top',height:'2rem',}}>
                    <img src={item.user.avatar} style={{marginRight:'0.3rem',height:'1.7rem',display:"inline-block"}}/>
                  </div>
                  <div style={{display:'inline-block',verticalAlign:'top',height:'2rem'}}>
                    <div style={{fontSize:'14px',fontWeight:600}}>{item.user.username}</div>
                    <div style={{fontSize:'12px'}}><span className="icon icon-clock"></span>{dateDiff(item.createAt)}</div>
                  </div>
                </div>
                <div className=""><h4 style={StyleMedia.h4style}>{item.title}</h4></div>
                <div className=""><p style={StyleMedia.pstyle}>{_this.wordControl(item.content)}</p></div>
              </div>
            </Link>
            <div style={{display:'block',width:'100%',fontSize:'14px'}}>
              <span className="icon icon-star" style={_this.starStyle(item.star)} onClick={(e)=>{
                _this.giveStar(e)
              }} data-id={item._id} >{item.star.length}</span>
              <span className="icon icon-message"> {item.commentNum}</span>
            </div>
          </li>
        )
      })
    }
    // loadingFinish(outerScroller, preloader, scrollList) {
    //   let _this = this;
    //   scrollList.style ? scrollList.style.overflow = 'auto' : null;
    //   preloader.style ? preloader.style.display = 'none' : null;
    //   //将页面还原
    //   // return;
    //   var LFT = setInterval(function () {
    //     outerScroller.style.top = parseInt(outerScroller.style.top) - 3 + 'px';
    //     if (!outerScroller.style.top) {
    //       clearInterval(LFT);
    //       return;
    //     }
    //     if (parseInt(outerScroller.style.top) <= _this.state.defaultTop) {
    //       clearInterval(LFT);
    //       if (outerScroller.offsetTop < _this.state.defaultTop) {
    //         outerScroller.style.top = _this.state.defaultTop + 'px'
    //       }
    //       //进行新的一轮监听
    //       //
    //       _this.pullToRefresh(_this.refs.outerScroller, _this.refs.pullToRefreshBox, _this.refs.scrollList, _this.refs.preloader, _this.refs.pullToRefreshArrow)
    //       // checkState(outerScroller.offsetTop)
    //       _this.refs.pullToRefreshArrow.style.display = 'block';
    //       _this.removeClass(_this.refs.pullToRefreshBox, 'up')
    //     }
    //   }, 10)
    // }
    checkLogin(){
      if(UserModel.fetchToken()){
        return <Me/>
      }else{
        return <div><p><a onClick={this.goLogin} className="button button-big button-fill button-success">登录</a></p></div>
      }
    }
    goLogin(){
      $.closePanel()
      setTimeout(()=>{
        window.location.hash="login"
      },1000)
    }
    
    render() {
      return ( 
      <div data-log="log" style={{touchAction: 'manipulation'}}>
        <main className="page page-current">
          <div className="outerScroller" id="outerScroll" ref="outerScroll" style={{height:`${document.body.clientHeight}px`,overflow:'scroll'}}>
            {/* <div className="pullToRefreshBox" id="pullToRefreshBox" ref="pullToRefreshBox">
              <div className="preloader" id="" ref="preloader"></div>
              <div className="pullToRefreshArrow" id="" ref="pullToRefreshArrow"></div>
            </div> */}
            <ul style={{background:'#eee',overflow:'auto'}} className="scroll" ref="scrollList">
              {this.indexList()}
            </ul>
          </div>
        </main>
        <div className="panel-overlay"></div>
        <div className="panel panel-left panel-reveal theme-dark" id="panel-left-demo">
          {this.checkLogin()}
        </div>
      </div>
      );
    }
  }

export default IndexList;