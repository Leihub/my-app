import React, { Component } from 'react';
import {render} from 'react-dom';
import {Link, HashRouter, BrowserRouter, withRouter, Route, NavLink, Switch} from 'react-router-dom';


import  AsyncComponent from './AsyncComponent'
let $ = window.Zepto
function creat() {
  $.closePanel();
  // console.log(window.Zepto,$)
  setTimeout(() => {
    window.location.hash = '/create'
  },800)
}

let nav = () => {
  return (
    <nav className="bar bar-tab">
      <NavLink className = "tab-item" activeClassName="active" to="/indexList"> 
        <span className="icon icon-home"></span>
        <span className="tab-label">主页</span>          
      </NavLink>
      <i className="tab-item" onClick={creat}>
        <span className="icon icon-edit"></span>
        <span className="tab-label">发表</span>
      </i>
      <i className="tab-item open-panel" data-panel="#panel-left-demo">
        <span className="icon icon-me"></span>
        <span className="tab-label">我</span>
      </i>
    </nav>
  )
}
class RouteConfig extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  WrapIndexList(props) {
    return(
      <AsyncComponent moduleId="route.indexlist" load={() => import('../pages/indexlist') }>
      {(Comp) => <Comp {...props} title="首页列表"/>}
    </AsyncComponent>
    )
  }
  WrapArticleDetail(props) {
    return (
      <AsyncComponent moduleId="route.articleDetail" load={() => import('../pages/articleDetail') }>
        {(Comp) => <Comp {...props} title="文章详情"/>}
      </AsyncComponent>
    )
  }
  WrapCreate(props) {
    return (
      <AsyncComponent moduleId="route.createArticle" load={() => import('../pages/create') }>
        {(Comp) => <Comp {...props} title="创建文章"/>}
      </AsyncComponent>
    )
  }
  WrapMe(props) {
    return (
      <AsyncComponent moduleId="route.me" load={() => import('../pages/me') }>
        {(Comp) => <Comp {...props} title="Page Title: me"/>}
      </AsyncComponent>
    )
  }
  WrapLogin(props){
    return(
      <AsyncComponent moduleId="route.login" load={() => import('../pages/login') }>
        {(Comp) => <Comp {...props} title="登录注册"/>}
      </AsyncComponent>
    )
  }
  WrapMyArticle(props){
    return (
      <AsyncComponent moduleId="route.myarticle" load={() => import('../pages/myArticle')}>
        {(Comp) => <Comp {...props} title="我的文章列表"/>}
      </AsyncComponent>
    )
  }
  render() {
    return (
      <HashRouter>
        <div data-log="one">
          <div data-log="two">
            <div>
              <Switch>
                <Route exact path="/" component={this.WrapIndexList}></Route>
                <Route exact path="/login" component={this.WrapLogin}/>
                <Route exact path="/me" component={this.WrapMe}/>
                <Route exact path="/myArticle" component={this.WrapMyArticle}/>
                <Route exact path="/indexList" component={this.WrapIndexList}/>
                <Route exact path="/create" component={this.WrapCreate}/>
                <Route exact name="create" path="/create/:id" component={this.WrapCreate}/>
                <Route exact name="articleDetail" path="/indexList/:id" component={this.WrapArticleDetail}/>
              </Switch>
            </div>
            <div style={{position: "absolute", height: "50px", width: "100%", bottom: "0px", zIndex: '2001'}}>{nav()}</div>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default RouteConfig;