import React from 'react'
import { connect } from 'react-redux'

import style from './snack-bar.css'

export class SnackBar extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            timeout: setTimeout(() => {}, 0)
        }               
    }    
    componentWillReceiveProps(props) {
        this.setState({
            state: props.state,
            timeout: setTimeout(() => {                
                this.setState({
                    state: -1
                })                
            }, props.state ? 5000 : 3000)
        });
    }
    render() {
        let className = `${style.snackBar} `;

        if(this.state.state === 0) {
            className += `${style.success} `
        } else
        if(this.state.state === 1) {
            className += `${style.error} `
        }

        return (
            <div className={className}>
                {this.props.msg}     
            </div>       
        )
    }
}

function mapStateToProps(state) {            
    return {        
        msg: state.output.msg, 
        state: state.output.state,
        time: state.output.time // Need to render element even without changes - to fire setTimeout()
    };
}

const mapDispatchToProps = dispatch => {    
    return {}
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SnackBar);