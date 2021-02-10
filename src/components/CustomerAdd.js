import * as React from "react";
import post from "axios"
import Customer from "./Customer";

class CustomerAdd extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            file : null,
            userName:'',
            birthday: '',
            gender:'',
            job:'',
            fileName:''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer().then( (response) => {
            console.log(response.data)
            })
        this.setState({
            file: null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:""
        })


        window.location.reload()
    }

    handleFileChange = (e) => {

        this.setState({
            file: e.target.file[0],
            filename: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value()
        this.setState(nextState)
    }

    addCustomer = () => {
        const url = '/api/customers'
        const formDate = new FormData()
        formDate.append('image' , this.state.file)
        formDate.append('userName' , this.state.userName)
        formDate.append('birthday' , this.state.birthday)
        formDate.append('gender' , this.state.gender)
        formDate.append('job"' , this.state.job)
        const config = {
            'content-type' : 'multipart/from-data'
        }

        return post(url, formDate, config)

    }



    render(){
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type={"file"} name={"file"} file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>
                이름: <input type={"text"} name={"userName"} value={this.state.userName} onChange={this.handleValueChange}/>
                생일: <input type={"text"} name={"birthday"} value={this.state.birthday} onChange={this.handleValueChange}/>
                성별: <input type={"text"} name={"gender"} value={this.state.gender} onChange={this.handleValueChange}/>
                직업: <input type={"text"} name={"job"} value={this.state.job} onChange={this.handleValueChange}/>
                <button type={"submit"}>추가하기</button>
            </form>
        )
    }

}

export default CustomerAdd
