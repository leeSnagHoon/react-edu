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
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'

  },
  table: {
    minWidth: 1080
  }
})



const customer = [{
        'id':'1',
        'image':'https://placeimg.com/64/64/1',
        'name': 'jone',
        'birthday': '20083229',
        'gender': 'male',
        'job': 'student'

    },{
        'id':'2',
        'image':'https://placeimg.com/64/64/2',
        'name': 'tom',
        'birthday': '20083231',
        'gender': 'female',
        'job': 'student'

    },{
        'id':'3',
        'image':'https://placeimg.com/64/64/3',
        'name': 'lee',
        'birthday': '20083230',
        'gender': 'male',
        'job': 'teacher'

    }
    ]

class App extends Component{
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
                {
                  customer.map(i => {
                    return(
                      <Customer
                          key={i.id}
                          name={i.name}
                          image={i.image}
                          birthday={i.birthday}
                          gender={i.gender}
                          job={i.job}/>
                    )})
                }
              </TableBody>
           </Table>
         </Paper>

        )
    }

}

export default withStyles(styles) (App);
