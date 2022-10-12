import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import EmailModal from './EmailModal';

const MenuModal = (props) => {
  const [emailModal, setEmailModal] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={props.menuModal}
        onRequestClose={() => {
          props.setMenuModal(false);
        }}
      >
        <View style={styles.modalBG}>
          <View style={styles.modalView}>
            <Text style={{fontWeight: 'bold'}}>Switch Accounts</Text>

            <View style={styles.picker}>
              <Picker selectedValue={props.account} onValueChange={(itemValue) => props.setAccount(itemValue)}>
                <Picker.Item label="newlife" value={"newlife"} />
                <Picker.Item label="jwa127" value={"jwa127"} />
                <Picker.Item label="jasonw1230" value={"jasonw1230"} />
              </Picker>
            </View>

            <TouchableOpacity style={[styles.menuButton, {backgroundColor: "powderblue", width: 160}]} onPress={() => {props.setMenuModal(false); setEmailModal(true);}}>
              <Text>Mailbox</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuButton, {backgroundColor: "white", width: 80}]} onPress={() => {props.setMenuModal(false); }}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Email Modal */}
      <EmailModal emailList={props.emailList} emailModal={emailModal} setEmailModal={setEmailModal} 
      convertDate={props.convertDate} confirmLongPress={props.confirmLongPress} setFlashMessage={props.setFlashMessage}/>
    </View>
    
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
  menuButton: {
    marginTop: 20,
    padding: 13,
    alignItems: 'center',
    borderRadius: 30,
    elevation: 5,
  }, 
  picker: {
    width: 160,
    marginTop: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#C0C0C0', 
  },

});

export default MenuModal;