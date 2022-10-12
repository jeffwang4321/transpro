import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';

const RefreshModal = (props) => {
  const [jobQuery, setJobQuery] = useState("10");

  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={props.refreshModal}
      onRequestClose={() => {
        props.setRefreshModal(false);
      }}
    >
      <View style={styles.modalBG}>
        <View style={styles.modalView}>
          <Text style={{fontWeight: 'bold'}}>Load {jobQuery} Job Queries</Text>
          <TextInput style={styles.input} placeholder={'Jobs'} value={jobQuery} keyboardType = 'numeric' maxLength={2} 
            onChangeText={text => setJobQuery(text)} onSubmitEditing={() => {props.setRefreshModal(false); props.getAPI(parseInt(jobQuery), true)}}
          />
          <TouchableOpacity style={[styles.menuButton, {backgroundColor: "powderblue", width: 160}]} onPress={() => {props.setRefreshModal(false); props.getAPI(parseInt(jobQuery), true)}}>
            <Text>Load</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuButton, {backgroundColor: "white", width: 80}]} onPress={() => props.setRefreshModal(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
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
    padding: 30,
    width: 240,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
  },
  input: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 160,
    color: 'black',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#C0C0C0', 
  },
  menuButton: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 30,
    elevation: 5,
  }, 

});

export default RefreshModal;