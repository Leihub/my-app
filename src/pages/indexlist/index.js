import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import setPageTitle from '../../components/HOC/setPageTitle.js'
import { ArticleModel,UserModel } from '../../dataModel.js'
import {dateDiff} from '../../tools/dateDiff.js';
let StyleMedia ={
  indexList:{},
  h4style:{},
  pstyle:{}
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
      console.log('fetch data')
      ArticleModel.fetchList('',(data)=>{
        console.log(data)
        this.setState({
          list:data
        })
      },(err)=>{
        console.log(err)
      })
      console.log(this)
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
      console.log(e)
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
            <Link to={`/indexList${item._id}`} style={{display:'block'}}>
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
              }}></span>
            </div>
          </li>
        )
      })
    }
    
    render() {
      return ( 
      <div>
        <div>
          <ul>
          {this.indexList()}
          </ul>
        </div>
      </div>
      );
    }
  }

export default IndexList;