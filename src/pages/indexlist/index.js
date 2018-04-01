import React, { Component } from 'react';

import { ArticleModel,UserModel } from '../../dataModel.js'
class IndexList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[]
    };
  }
  componentDidMount() {
    console.log('list mount')
    ArticleModel.fetchList((data)=>{
      console.log(data)
      this.setState({
        list:data
      })
    },(err)=>{
      console.log(err)
    })

  }

  render() {
    return ( 
    <div>

    </div>
    );
  }
}

export default IndexList;