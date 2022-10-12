import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

const FlashMessage = (props) => {
  return (
    <Modal
      transparent={true}
    >
      <View style={styles.modalBG}>
        <View style={styles.flashMessage}>
          <Text style={{color: "white"}}>{props.flashMessage}</Text>
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
  },
  flashMessage:{
    position:'absolute', 
    justifyContent:'center', 
    alignItems:'center',     
    backgroundColor:'rgba(105,105,105, 0.95)', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 30,
    bottom: 70,
    elevation: 5,
  }

});

export default FlashMessage;