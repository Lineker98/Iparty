import { StyleSheet } from "react-native";
import { pink } from "./color";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "white",
  },

  scrollView: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "white",
  },

  title: {
    fontSize: 35,
    marginVertical: 20,
  },

  input: {
    padding: 10,
    height: 50,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },

  inputHorizontal: {
    padding: 10,
    height: 140,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },

  button: {
    backgroundColor: pink,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 60,
    marginBottom:15,
  },

  shadow: {
    elevation: 2,
    borderWidth: 0.1,
    shadowColor: "grey",
    shadowOpacity: 0.4,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },

  tabIcon:{
    backgroundColor:pink, 
    width:'100%', 
    height:'90%',
    textAlign:'center',
    textAlignVertical:'center',
    borderRadius:20,
    opacity:0.8,
  }
});