
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const setPageTitle = (WrappedComponent) => {
  class WrapperComponent extends Component {
    componentDidMount(){
      console.log('llllkkk')
      if(this.props.title && typeof this.props.title === 'string') {
        window.document.title = this.props.title
      }
    }
    render() {
      return ( 
        <WrappedComponent {...this.props}/>
      );
    }
  }

}


export default setPageTitle;
