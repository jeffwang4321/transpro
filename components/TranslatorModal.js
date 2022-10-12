import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';

const TranslatorModal = (props) => {

  const renderTransDetails = () => {
    if(props.transDetails != ""){
      let content = [];

      for (const [key, value] of Object.entries(props.transDetails)) {
        if(value != null && value != "" && !key.includes("ID")){
          if(key.includes("Date")){
            content.push(
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>{key}:</Text>  {props.convertDate(value)}</Text>
            );
          }else{
            content.push(
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>{key}:</Text>  {value.toString()}</Text>
            );
          }
        } 
      }
      return content;
    }
  }

  const renderTransReviews = () => {
    if(props.transReviews.length != 0){
      let content = [];

      for(var obj in props.transReviews){
        for (const [key, value] of Object.entries(props.transReviews[obj])) {
          if(key == "OrderNo"){
            content.push(
              <TouchableOpacity onPress={() => {props.setTransModal(false); props.setTransDetails(""); props.setTransReviews(""); props.getJobDetailsAPI(value);}}>
                <Text style={styles.selectableElementText}><Text style={{fontWeight: "bold"}}>{key}:</Text>  {value.toString()}</Text>
              </TouchableOpacity>
            )
          }else if(value != null && value != "" && value != "00000000-0000-0000-0000-000000000000"){
            if(key.includes("Date")){
              content.push(
                <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>{key}:</Text>  {props.convertDate(value)}</Text>
              );
            }else{
              content.push(
                <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>{key}:</Text>  {value.toString()}</Text>
              );
            }
          } 
        }
        content.push(<Text/>);
      }
      return content;
    }
  }

  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={false}
      transparent={true}
      visible={props.transModal}
      onRequestClose={() => {
        props.setTransModal(false);
        props.setTransDetails("");
        props.setTransReviews("");
      }}
    >
      <View style={styles.modalBG}>
        <View style={styles.modalView}>
          <ScrollView 
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps='handled'
          >
            <Text style={styles.titleText}>Translator Details</Text>
            {
              renderTransDetails()
            }
            <Text/> 
            <Text style={styles.titleText}>Evaluations</Text>
            {
              renderTransReviews()
            }
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBG: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 5,
    padding: 5,
    backgroundColor: "#FFF",
  },
  titleText: {
    fontWeight: 'bold',
    backgroundColor: "powderblue",
    padding: 5,
  },
  elementText: {
    fontSize: 10,
    backgroundColor: "whitesmoke",
    padding: 5,
    marginTop: 5,
  },
  selectableElementText: {
    fontSize: 10,
    backgroundColor: "aliceblue",
    padding: 5,
    marginTop: 5,
  },
  

});

export default TranslatorModal;