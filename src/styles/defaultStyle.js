import { StyleSheet } from "react-native";
import { pink, darkBlue, background } from "./color";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: "94%",
    alignSelf: "center",
    backgroundColor: background,
  },

  background: {
    flexGrow: 1,
    width: "100%",
    height:'100%',
    backgroundColor: background,
  },

  scrollView: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: background,
  },

  title: {
    fontSize: 45,
    marginVertical: 20,
    color: 'white'
  },

  input: {
    backgroundColor:darkBlue,
    color:'white',
    padding: 10,
    height: 60,
    borderRadius: 10,
    marginBottom: 20,
  },

  inputHorizontal: {
    padding: 10,
    color:'white',
    height: 140,
    backgroundColor:darkBlue,
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
    borderRadius: 10,
    height: 60,
    marginBottom: 15,
  },

  buttonText: {
    color: 'white',
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

  tabIcon: {
    backgroundColor: pink,
    width: '100%',
    height: '90%',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 20,
    opacity: 0.8,
  }
});