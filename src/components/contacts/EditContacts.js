import React, {Component} from 'react';
import {Consumer} from '../../context';
import TestInputGroup from '../layout/TestInputGroup';
import axios from 'axios';

class EditContact extends Component{
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {},

    };

    async componentDidMount(){
        const { id } = this.props.match.params;

        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

        const contact = res.data;

        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
        });
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    onSubmit = async (dispatch,e) => {
        e.preventDefault();
        const { name, email, phone } = this.state;

        if(name === ''){
            this.setState({errors: {name: 'Name is Required'}});
            return;
        }
        if(email === ''){
            this.setState({errors: {email: 'Email is Required'}});
            return;
        }
        if(phone === ''){
            this.setState({errors:{phone: 'Phone is Required'}});
            return;
        }

        const updContact = {
            name,
            email,
            phone,
        };

        const { id } = this.props.match.params;

        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,updContact);

        dispatch({type: 'UPDATE_CONTACT', payload: res.data});


        //clear state
        this.setState({
            name:'',
            email:'',
            phone:'',
            errors: {},
        });
        this.props.history.push('/');
    };

    render(){

        const { name, email, phone, errors} = this.state;

        return (
            <Consumer>
                {value =>{
                    const {dispatch} = value;
                    return(
                        <div className='card mb-3 '>
                            <div className='card-header'>
                                Edit Contact
                            </div>
                            <div className='card-body'>
                                <form onSubmit={this.onSubmit.bind(this,dispatch)}>
                                    <TestInputGroup
                                        name="name"
                                        placeholder="Enter Name..."
                                        value={name}
                                        label="name"
                                        onChange={this.onChange}
                                        error={errors.name}

                                    />
                                    <TestInputGroup
                                        name='email'
                                        placeholder='Enter Email..'
                                        value={email}
                                        type='email'
                                        label='email'
                                        onChange={this.onChange}
                                        error={errors.email}
                                    />
                                    <TestInputGroup
                                        name='phone'
                                        placeholder='Enter Phone...'
                                        value={phone}
                                        label='phone'
                                        onChange={this.onChange}
                                        error={errors.phone}
                                    />
                                    <input type='submit'
                                           value='Update Contact'
                                           className='btn btn-light btn-block'
                                    />
                                </form>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        );
    }
}


export default EditContact;
