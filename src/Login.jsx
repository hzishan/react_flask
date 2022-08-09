import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import Oral from "./Oral";
// import { useState } from 'react';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            page_state: true, // login or sign_up
            x_name: null,
            x_account: null,
            x_pwd: null,
            cmm:true,
        };
        this.show_page = this.show_page.bind(this)
        this.accountdata = this.accountdata.bind(this)
    }

    show_page() {
        console.log('this is :', this);
        this.setState(prevState => ({
            page_state: !prevState.page_state
        }));
    }


    accountdata() {
        console.log("this：",this);
        if (this.state.cmm==false){
            window.alert("password confirm type different");
        }
        else
        {
            let formData = new FormData();
            formData.append("account", this.state.x_account);
            formData.append("password", this.state.x_pwd);
            formData.append("page_state",this.state.page_state);
            formData.append("fname",this.state.x_name);
            fetch("http://localhost:6866", {
                method: "POST",
                header: {
                    "Content-Type": "application/json",
                },
                body: formData,
            })
                .then((res) => {
                    if (res.ok){
                        return  res.text();
                    }
                })
                .then((data) => {
                    if (data !== undefined) {
                        // console.log("haha",data);
                        window.alert(data);
                        this.props.history.push(
                            `oral`
                        );
                    }
                    else {
                        window.alert("server error");
                    }              
                })
        }
        // <Link to="/oral"/>
    }

    render() {
        return (
            <div>
                <div className="login_page" style={{ display: this.state.page_state ? 'block' : 'none' }}>
                    <h3>登入 Login</h3>
                    <form action="account.php">
                        <input type=" text"
                        id="account"
                        name="account"
                        placeholder="帳號"
                        onChange={(e)=>{this.setState({x_account: e.target.value})}}
                        required />
                        <div class="tab"></div>
                        <input type="password"
                        id="password"
                        name="password"
                        placeholder="密碼"
                        onChange={(e)=>{this.setState({x_pwd: e.target.value})}}
                        required />
                        <div class="tab"></div>
                        <button type="button" onClick={this.accountdata}>登入</button>
                    </form>
                    <span>忘記密碼？</span>
                    <a onClick={this.show_page}>尚未註冊？</a>
                </div> {/* login_page end*/}

                <div class="signup_page" style={{ display: this.state.page_state ? 'none' : 'block' }} >
                    <h3>註冊 Sign Up</h3>
                    <form action="account.php">
                        <input type="text"
                        id="fullname"
                        name="fullname"
                        placeholder="使用者全名"
                        onChange={(e)=>{this.setState({x_name: e.target.value})}}
                        required />
                        <div class="tab"></div>
                        <input type="text"
                        id="account2"
                        name="account"
                        placeholder="帳號"
                        onChange={(e)=>{this.setState({x_account: e.target.value})}}
                        required />
                        <div class="tab"></div>
                        <input type="password"
                        id="password2"
                        name="password"
                        placeholder="密碼"
                        onChange={(e)=>{this.setState({x_pwd: e.target.value})}}
                        required />
                        <div class="tab"></div>
                        <input type="password"
                        id="comfirm_password"
                        name="comfirm_password"
                        placeholder="確認密碼"
                        onChange={(e)=>this.setState({cmm: (this.state.x_pwd==e.target.value)? true:false})}
                        required />
                        <div class="tab"></div>
                        <button type="button" onClick={this.accountdata}>註冊</button>
                    </form>
                    <a onClick={this.show_page}>已有帳號</a>
                </div> {/*signup_page end */}
            </div >
        );
    }
}

export default hot(module)(Login);
