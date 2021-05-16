const { makeStyles } = require("@material-ui/core");

const cardStyle = makeStyles((theme)=>({
  w100:{
    minWidth:"100%"
  },
  outerDiv : {
    width:"96%",
    margin:"auto"
  },
  productImg : {
    width:"100%",
    height:"350px",
    objectFit:"contain",
    [theme.breakpoints.down("sm")]:{
      height:"250px"
    }
  },
  content : {
    margin:"1%",
    marginLeft:"3%"
  }
}))

export default cardStyle;