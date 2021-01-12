import logo from './image/iconfinder_Education_flat-07_6771576.png';
import './App.css';
import Customer from "./Customer";
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper"
import {withStyles} from "@material-ui/core";
import {Component} from "react";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'

  },
  table: {
    minWidth: 1080
  }
})


class App extends Component{
  state = {
    customer: ""
  }


  componentDidMount() {
    console.log("componentDidMount")
    this.callApi()
      .then(res => this.setState({customer: res}))
      .catch(err => console.log(err))
  }

  callApi = async () => {
    const response = await fetch('http://localhost:5000/api/customers')
    console.log("body " + JSON.stringify(response))

    const body = await response.json()
    return body
  }

  render(){
    const {classes} = this.props
    return(
       <Paper className={classes.root}>

         <Table className={classes.table}>
            <TableHead>
              <TableCell>이름</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>생일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableHead>

            <TableBody>
              { this.state.customer? this.state.customer.map(i => {
                  return(
                    <Customer
                        key={i.id}
                        name={i.name}
                        image={i.image}
                        birthday={i.birthday}
                        gender={i.gender}
                        job={i.job}/>
                  )}) : ""}
            </TableBody>
         </Table>
       </Paper>
      )
  }

}

export default withStyles(styles) (App);
