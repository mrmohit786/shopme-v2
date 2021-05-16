const { makeStyles } = require("@material-ui/core");

const footerStyle = makeStyles((theme)=>({
  // overriding tab css

  '@global': {
    ".Mui-selected":{
      background:'black !important',
      color:"white !important",
    },
    ".MuiTab-root" : {
      padding : "0px !important",
      minHeight : "30px !important"
    }
  },

  bgColor:{
    background: '#2c4152'
  },
  grdContainer : {
    width:"80%",
    margin:"auto",
    padding:"5%",
    [theme.breakpoints.down('md')]:{
      width:"90%"
    }
  },
  text : {
    color:"white"
  },
  whiteColor : {
    color:"#FFFFFF",
    textDecoration : "none",
    lineHeight:2.0,
  },
  divider : {
    height:"1px",
    backgroundColor:"gray",
    width:"100%",
    marginTop:"5%",
    marginBottom:"2%"
  },
  dFlex : {
    display: 'flex'
  },
  flex1 : {
    flex : 1
  },
  iconBox : {
    display: 'flex', 
    width: '100%'
  },
  w10 : {
    width: '10%'
  },
  smFooterDiv:{
    padding:"20px 24px",
    background:"#f0f4f7"
  },
  blackColor:{
    color:"#202020",
    textDecoration:"none",
    lineHeight:"1.7",
    fontSize:"12px",
    fontWeight:"450"
  },
  logoBtn:{
    borderBottomLeftRadius : "4px",
    borderTopLeftRadius : "4px",
    borderRight:"unset !important"
  },
  helpBtn : {
    borderRight:"unset !important"
  },
  followBtn : {
    borderBottomRightRadius : "4px",
    borderTopRightRadius : "4px",
    borderLeft:"unset !important"
  },
  btn : {
    background:"#FFFFFF", 
    border:"1px solid black",
    textAlign: "center",
    color:"#6d6d6d",
    margin:"auto",
    width:"25%",
    fontSize: "0.7rem",
  },
}))

export default footerStyle;