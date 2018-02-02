import React from 'react'
import style from './form.module.css'
import { connect } from 'react-redux'

import { setOutput } from './../../actions/output'
import { validateFields, fieldUpdateValue } from './../../actions/fields'
import InfiniteCalendar from 'react-infinite-calendar';

import TextInput from './../TextInput'

class Form extends React.Component {
    constructor(props) {
        super(props)     
        this.state = {
            calendar: {
                show: false,
                key: null
            },
            loading: true
        }
    }    
    componentDidMount() {
        this.setState({
            loading: true
        })            
        this.loadData();
    }       
    renderFields() {        
        if(!this.props.fields || !this.props.fields.length) return;                          
        return this.props.fields.map((field, i) => {         
            let value = this.props.fields.filter(f => f.key === field.key)[0].value;                              
            return (
                <label key={i}>
                    <span>
                        {field.name}
                        {field.required ? 
                            (<span className={style.requiredStar}>*</span>) 
                            : ""
                        }
                    </span>
                    <TextInput
                        id={field.key}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        validate={field.validate}
                        error={field.error}                         
                        onChange={this.change.bind(this)}
                        onBlur={this.blur.bind(this)}
                        onShowCalendar={this.showCalendar.bind(this)}
                        value={value}
                    />
                </label>
            )
        })        
    }
    render() {            
        return (
            <React.Fragment>                            
                <div 
                    className={`${style.datePickerWrapper} ${this.state.calendar.show ? style.datePickerVisible : ""}`}
                    id="calendarWrapper"
                    onClick={this.hideCalendar.bind(this)}                
                >
                    <div className={style.datePicker}>
                        <InfiniteCalendar
                            width={400}
                            height={300}
                            onSelect={this.selectDate.bind(this)}                                                       
                        />
                    </div>
                </div>
                <div className={style.container}>   
                    <div className={`${style.loadingWrapper} ${this.state.loading ? style.loadingWrapperVisible : ``}`}>
                        <div></div>
                    </div>             
                    <form className={style.form}>
                        {this.renderFields()}
                        <div className={style.submitWrapper}>
                            <input 
                                className={style.submit}
                                type="button"
                                value="Submit form"
                                onClick={this.submit.bind(this)}                                
                            />
                        </div>                                
                    </form>                    
                </div>
            </React.Fragment>
        )
    }

    //# Methods    
    loadData(currentTry = 0) { // currentTry - counts how many times tried to load data
        const that = this;
        fetch("/api/get")
        .then(res => res.json())
        .then(data => {
            if(data && data.data && data.data.values) {                
                data.data.values.forEach(item => {
                    this.props.setValue(item.key, item.value)
                })
                this.setState({
                    loading: false
                })
            } else {
                this.props.setOutput("Unexpected error. Cannot load data!", data.error)
            }
        }).catch(e => {
            setTimeout(() => {
                if(currentTry < 5) {
                    that.loadData(currentTry + 1);
                } else {
                    this.props.setOutput("Cannot load data from server!", data.error)
                    this.setState({
                        loading: false
                    })
                }
            }, 200);
        });
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

    //# Events
    change(e) {        
        this.props.setValue(e.target.id, e.target.value);
    }
    showCalendar(e) {        
        e.preventDefault();        
        this.setState({            
            calendar: {
                show: true,
                key: e.target.parentNode.firstChild.id
            }    
        });
        return false;
    }    
    selectDate(date) {                        
        this.props.setValue(this.state.calendar.key, this.parseDate(date.getTime()));        
        this.hideCalendar.bind(this)()
    }
    hideCalendar(e) {
        if(e && e.target.id !== "calendarWrapper") return false;
        this.setState({            
            calendar: {
                show: false,
                key: null
            }
        })
    }    
    blur(e) {
        this.props.validate(e.target.id);
    }    
    submit(e) {        
        this.props.validate();

        fetch("/api/update", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.fields)
        })
        .then((res) => res.json())
        .then(data => {                        
            this.props.setOutput(data.msg, data.error)                        
        });
    }
}


function mapStateToProps(state) {    
    return {        
        fields: state.fields.list
    };
}

const mapDispatchToProps = dispatch => {
    return {
      update: (key, value) => {
        dispatch(formUpdate(key, value))
      },
      setValue: (key, value) => {
        dispatch(fieldUpdateValue(key, value))
      },
      validate: (key) => {
        dispatch(validateFields(key))
      },
      setOutput: (msg, state) => {
        dispatch(setOutput(msg, state))
      }
    }
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form);