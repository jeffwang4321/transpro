import React, {useState} from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, TouchableOpacity, Linking, Alert } from 'react-native';

import JobDetailsModal from './JobDetailsModal';
import RefreshModal from './RefreshModal';

import Icon from 'react-native-vector-icons/FontAwesome'; // https://github.com/oblador/react-native-vector-icons  npm install --save react-native-vector-icons

const HomePage = (props) => {
  const [detailsModal, setDetailsModal] = useState(false);
  const [jsonDetails, setJsonDetails] = useState("");
  const [menuScript, setMenuScript] = useState("");

  const [refreshModal, setRefreshModal] = useState(false);

  const getJobDetailsAPI = (jobID) => {  
    fetch("https://bcause-api.com/order/getOrderDetailsById", {
      "headers": {
        "content-type": "application/json;charset=UTF-8",
      },
      "body": "{\"cultureId\":\"jp\",\"orderNo\":\"" + jobID + "\",\"ApplicationId\":4}",
      "method": "POST",
    })
    .then((response) => response.json())
    .then((json) => {
      setJsonDetails(json);
      if(json.MenuScript.length > 200){
        setMenuScript(json.MenuScript.slice(0, 200) + " ..."); 
      }else{
        setMenuScript(json.MenuScript); 
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const handleURLPress = async (ID) => {
    let url = "https://trans-pro.net/01trans/detail/" + ID;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("Can not open URL: " + url);
    }
  }

  const confirmLongPress = (ID) => {  
    Alert.alert(
      "Job: " + ID,
      "Do you want go to job details?",
      [
        { text: "Site", onPress: () => handleURLPress(ID)},
        { text: "Cancel"},
        { text: "Details", onPress: () => {getJobDetailsAPI(ID); setDetailsModal(true)}},
      ]
    );
  }

  //Convert date string to wanted format
  const convertDate = (date) => {  
    if(date != null){
      let newDate = new Date(date);
      return newDate.toLocaleString().slice(4, 16);
    }
  }

  const renderHeaders = () => {
    if(props.json != ""){
      return(
        <View>
          <View style={styles.elementWrapper}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => props.getAPI(3, true)}>
              <Text><Icon name="refresh" size={14}/>  Refresh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => setRefreshModal(true)}>
              <Text><Icon name="refresh" size={14}/>  Custom</Text>
            </TouchableOpacity>
            {
              props.isLoading == true ? <ActivityIndicator size={35} color="#1976d2" paddingLeft={50}/> : null 
            }
          </View>
          <View style={styles.elementWrapper}>
            <Text style={[styles.titleText, {width: 48}]}>Date</Text>
            <Text style={[styles.titleText, {width: 48}]}>Status</Text>
            <Text style={[styles.titleText, {width: 40}]}>Time</Text>
            <Text style={[styles.titleText, {width: 46}]}>Paid</Text>
            <Text style={[styles.titleText, {width: 46}]}>Earn</Text>
            <Text style={[styles.titleText, {width: 60}]}>Type</Text>
            <Text style={[styles.titleText, {width: 49}]}>Ord #</Text>
            <Text style={[styles.titleText, {width: 48}]}>From</Text>
            <Text style={[styles.titleText, {width: 49}]}>Trn #</Text>
          </View>
        </View>
      );
    }
  }

  const renderJobs = () => {
    let content = [];
    if(props.json != ""){
      props.json.forEach((element, index) => 
        content.push(
          <TouchableOpacity key={index} style={styles.elementWrapper} onPress={() => confirmLongPress(element.OrderNo)}>
            <Text style={[styles.elementText, {width: 48}]}>{convertDate(element.OrderDate)}</Text>
            <Text style={[styles.elementText, {width: 48}]}>{element.OrderStatusName}</Text>
            <Text style={[styles.elementText, {width: 40}]}>{element.DeliveryPlan}</Text>
            <Text style={[styles.elementText, {width: 46}]}>{element.CurrencySymbol}{element.PaymentAmount}</Text>
            <Text style={[styles.elementText, {width: 46}]}>{element.CurrencySymbol}{element.TranslatorFee}</Text>
            <Text style={[styles.elementText, {width: 60}]}>{element.TranslationFieldName.slice(0, 8)}</Text>
            <Text style={[styles.elementText, {width: 49}]}>{element.OrderNo}</Text>
            <Text style={[styles.elementText, {width: 48}]}>{element.WebOrderTitle}</Text>
            <Text style={[styles.elementText, {width: 49}]}>{element.TranslatorNo}</Text>
          </TouchableOpacity>
        )
      );
    }
    return content;
  }


  return (
    <View>
      <ScrollView 
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps='handled'
      >
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps='handled'
          horizontal={true}
        >
          <View>
          {
            props.json == "" ? 
            <View style={styles.loadingWrapper}>
              <ActivityIndicator size={100} color="#1976d2"/>
            </View> : null 
          }
          {
            renderHeaders()
          }
          {
            renderJobs()
          }
            <View style={styles.footerWrapper}>
              <Text>Version 5.0</Text>
            </View>
          </View>
        </ScrollView>
      </ScrollView>


      {/* Job Details Modal */} 
      <JobDetailsModal detailsModal={detailsModal} setDetailsModal={setDetailsModal} jsonDetails={jsonDetails} setJsonDetails={setJsonDetails} menuScript={menuScript} setMenuScript={setMenuScript} 
        convertDate={convertDate} getJobDetailsAPI={getJobDetailsAPI} setFlashMessage={props.setFlashMessage}
      />

      {/* Refresh Modal */} 
      <RefreshModal refreshModal={refreshModal} setRefreshModal={setRefreshModal} getAPI={props.getAPI}/>

    </View>
  )
}

const styles = StyleSheet.create({
  loadingWrapper:{
    paddingTop: 110,
  },
  elementWrapper: {
    flexDirection: 'row',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: "#FFF",
    margin: 10,
    padding: 10,
    borderRadius: 30,
    elevation: 5,
  },
  titleText: {
    fontSize: 10,
    fontWeight: 'bold',
    padding: 5,
    backgroundColor: "powderblue",
  },
  elementText: {
    fontSize: 10,
    backgroundColor: "aliceblue",
    padding: 5,
    marginTop: 5,
  },
  footerWrapper: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 40,
  },
  menuButton: {
    paddingTop: 18, 
    paddingLeft: 20, 
    paddingRight: 10
  },
});

export default HomePage;