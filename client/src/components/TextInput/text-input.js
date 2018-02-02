import React from 'react'
import { connect } from 'react-redux'
import style from './text-input.css'

export class TextInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {            
            status: 0,
            tooltip: null
        }                  
    }    
    getInputClassName() {
        let className = style.input;
                            
        if(this.props.error)
            className += ` ${style.error}`;
        else if(this.props.error === false)
            className += ` ${style.correct}`;

        return className;
    }
    render() {        
        const placeholder = this.props.placeholder ? this.props.placeholder : null;
        let type = this.props.type && this.props.type !== `date` ? this.props.type : "text";        
        const className = style.input
        const tooltip = this.props.error === false ? null : this.props.error;        

        let value = this.props.fields.filter(field => field.key === this.props.id)[0].value;   
        if(this.props.type === "date") value = this.parseDate(value);         

        let maxLength = this.props.maxLength ? this.props.maxLength : null;
        if(this.props.type === `date`) maxLength = 12;

        let element = null;

        setTimeout(() => {
            if(element && value) {
                element.value = value;
            }
        }, 0);
                    
        return (
            <div 
                className={style.wrapper}
                tooltip={tooltip}
            >
                <input 
                    type={type}
                    id={this.props.id}
                    className={this.getInputClassName.bind(this)()}
                    placeholder={placeholder} 
                    onFocus={this.focus.bind(this)}
                    onBlur={this.blur.bind(this)} 
                    onChange={this.props.onChange}
                    onFocus={this.props.onFocus} 
                    maxLength={maxLength}                                       
                    ref={(el) => element = el}
                />
                <div 
                    className={`${style.calendar} ${this.props.type !== `date` ? style.hidden : ``}`}
                    onClick={this.props.onShowCalendar}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z"/>
                    </svg>
                </div>
            </div>       
        )
    }
    focus(e) {
        this.setState({
            status: "",
            tooltip: null
        })
    }
    blur(e) { 
        let tooltip = null;
        let status = "correct";    
        
        if(this.props.onBlur) {
            this.props.onBlur(e);
        }
    }
    parseDate(value) {
        if(!value) return "";

        // Pad dates with zeros
        const padStart = (number) => number.toString().length === 1 ? `0${number}` : number;

        var date = new Date(value);
        
        const day = padStart(date.getDate());
        const month = padStart(date.getMonth() + 1);
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
    }
}

function mapStateToProps(state) {        
    return {        
        fields: state.fields.list
    };
}

const mapDispatchToProps = dispatch => {    
    return {}
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextInput);