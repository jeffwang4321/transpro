import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Clipboard, Linking } from 'react-native';

import TranslatorModal from './TranslatorModal';

const JobDetailsModal = (props) => {
  const [transDetails, setTransDetails] = useState("");
  const [transReviews, setTransReviews] = useState("");
  const [transModal, setTransModal] = useState(false);
  const [menuScriptExpand, setMenuScriptExpand] = useState(false);


  const getTransInfoAPI = (transID) => {  
    fetch("https://bcause-api.com/translator/getTranslatorProfile", {
      "headers": {
        "accept": "application/json, text/plain, /",
        "accept-language": "en-US,en;q=0.9,ja;q=0.8,zh-CN;q=0.7,zh-TW;q=0.6,zh;q=0.5",
        "content-type": "application/json;charset=UTF-8",
        "sec-ch-ua": "\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"
      },
      "referrer": "https://www.trans-pro.net/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "{\"TranslatorNo\":\""+ transID +"\",\"CultureCode\":\"jp\"}",
      "method": "POST",
      "mode": "cors",
      "credentials": "omit"
    })
    .then((response) => response.json())
    .then((json) => {
      // console.log(json);
      setTransDetails(json);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const getTransReviewAPI = (transID) => {  
    fetch("https://bcause-api.com/TranslatorEvaluation/list/Translator", {
      "headers": {
        "accept": "application/json, text/plain, /",
        "accept-language": "en-US,en;q=0.9,ja;q=0.8,zh-CN;q=0.7,zh-TW;q=0.6,zh;q=0.5",
        "content-type": "application/json;charset=UTF-8",
        "sec-ch-ua": "\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"
      },
      "referrer": "https://www.trans-pro.net/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "{\"TranslatorNo\":\""+ transID +"\",\"CultureCode\":\"jp\",\"ApplicationID\":4,\"PageSize\":20,\"PageNumber\":1}",
      "method": "POST",
      "mode": "cors",
      "credentials": "omit"
    })
    .then((response) => response.json())
    .then((json) => {
      // console.log(json);
      setTransReviews(json);
    })
    .catch((error) => {
      console.error(error);
    });
  }


  const toggleMenuScript = (string) => {  
    if(menuScriptExpand != false && string.length > 200){
      props.setMenuScript(string.slice(0, 200) + " ... "); 
    }else{
      props.setMenuScript(string); 
    }
    setMenuScriptExpand(!menuScriptExpand);
  }

  const displayAppointedStaff = (list) => {  
    if(list == null){
      return;
    }else if(list.length == 0){
      return;
    }
    
    let content = "";
    for(var obj in list){
      content = content + ", " + list[obj].TranslatorNo;
    }
    return content.slice(2);
  }

  const handleURLPress = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("Can not open URL: " + url);
    }
  }

  // const renderJobDetails = () => {
  //   if(jsonDetails != ""){
  //     let content = [];
  //     for (const [key, value] of Object.entries(jsonDetails)) {
  //       if(value != null && value != "" && !key.includes("ID")){
  //         if(key.includes("Date")){
  //           content.push(
  //             <Text style={styles.elementText}><Text style={styles.titleText}>{key}:  </Text>{convertDate(value)}</Text>
  //           );
  //         }else{
  //           content.push(
  //             <Text style={styles.elementText}><Text style={styles.titleText}>{key}:  </Text>{value.toString()}</Text>
  //           );
  //         }
  //       } 
  //     }
  //     return content;
  //   }
  // }

  return (
    <View>
      <Modal
        animationType="fade"
        statusBarTranslucent={false}
        transparent={true}
        visible={props.detailsModal}
        onRequestClose={() => {
          props.setDetailsModal(false);
          props.setJsonDetails("");
          props.setMenuScript(""); 
          setMenuScriptExpand(false);
        }}
      >
        <View style={styles.modalBG}>
          <View style={styles.modalView}>
            <ScrollView 
              contentContainerStyle={{flexGrow: 1}}
              keyboardShouldPersistTaps='handled'
            >
              <Text style={styles.titleText}>Job Details</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>OrderNo:</Text>  {props.jsonDetails.OrderNo}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>ClientNo:</Text>  {props.jsonDetails.ClientNo}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>Source ► Target:</Text>  {props.jsonDetails.SourceLanguage} ► {props.jsonDetails.TargetLanguage}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>WebOrderTitle:</Text>  {props.jsonDetails.WebOrderTitle}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>DeliveryPlan:</Text>  {props.jsonDetails.DeliveryPlan}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>OrderDate:</Text>  {props.convertDate(props.jsonDetails.OrderDate)}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>StartDate:</Text>  {props.convertDate(props.jsonDetails.StartDate)}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>DeliveryDate:</Text>  {props.convertDate(props.jsonDetails.DeliveryDate)}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>EndDate:</Text>  {props.convertDate(props.jsonDetails.EndDate)}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>Status:</Text>  {props.jsonDetails.OrderStatusName}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>WordCount:</Text>  {props.jsonDetails.WordCount}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>TranslatorFee:</Text>  {props.jsonDetails.TranslatorFee}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>UnitPrice:</Text>  {props.jsonDetails.UnitPrice}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>AppointedToStaffList:</Text>  {displayAppointedStaff(props.jsonDetails.AppointedToStaffList)}</Text>

              <TouchableOpacity onPress={() => {getTransInfoAPI(props.jsonDetails.TranslatorNo); getTransReviewAPI(props.jsonDetails.TranslatorNo); setTransModal(true)}}>
                <Text style={styles.selectableElementText}><Text style={{fontWeight: "bold"}}>TranslatorName:</Text>  {props.jsonDetails.TranslatorName}</Text>
                <Text style={styles.selectableElementText}><Text style={{fontWeight: "bold"}}>TranslatorNo:</Text>  {props.jsonDetails.TranslatorNo}</Text>
              </TouchableOpacity>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>TranslationMethod:</Text>  {props.jsonDetails.TranslationMethod}</Text>

              <TouchableOpacity onLongPress={() => toggleMenuScript(props.jsonDetails.MenuScript)} onPress={() => {Clipboard.setString(props.jsonDetails.MenuScript); props.setFlashMessage("MenuScript Copied")}}>
                <Text style={styles.selectableElementText}><Text style={{fontWeight: "bold"}}>MenuScript:</Text>  {props.menuScript}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {Clipboard.setString(props.jsonDetails.DeliveryComment); props.setFlashMessage("DeliveryComment Copied")}}>
                <Text style={styles.selectableElementText}><Text style={{fontWeight: "bold"}}>DeliveryComment:</Text>  {props.jsonDetails.DeliveryComment}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {Clipboard.setString(props.jsonDetails.CommentToTranslator); props.setFlashMessage("CommentToTranslator Copied")}}>
                <Text style={styles.selectableElementText}><Text style={{fontWeight: "bold"}}>CommentToTranslator:</Text>  {props.jsonDetails.CommentToTranslator}</Text>
              </TouchableOpacity>  

              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>ConsumptionTax:</Text>  {props.jsonDetails.ConsumptionTax}</Text>              
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>DeliveryLevelName:</Text>  {props.jsonDetails.DeliveryLevelName}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>EmailRetryTimeInterval:</Text>  {props.jsonDetails.EmailRetryTimeInterval}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>EstimatedPrice:</Text>  {props.jsonDetails.EstimatedPrice}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>EvaluationComment:</Text>  {props.jsonDetails.EvaluationComment}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>EvaluationScore:</Text>  {props.jsonDetails.EvaluationScore}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>IsActive:</Text>  {props.jsonDetails.IsActive}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>IsDeleted:</Text>  {props.jsonDetails.IsDeleted}</Text>           
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>MessageList:</Text>  {props.jsonDetails.MessageList}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>NoOfRequestSent:</Text>  {props.jsonDetails.NoOfRequestSent}</Text>            
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>ParentCheckValue:</Text>  {props.jsonDetails.ParentCheckValue}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>PaymentAmount:</Text>  {props.jsonDetails.PaymentAmount}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>PaymentDate:</Text>  {props.convertDate(props.jsonDetails.PaymentDate)}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>PaymentMethod:</Text>  {props.jsonDetails.PaymentMethod}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>PaymentStatus:</Text>  {props.jsonDetails.PaymentStatus}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>PaymentStatusName:</Text>  {props.jsonDetails.PaymentStatusName}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>PenaltyPoint:</Text>  {props.jsonDetails.PenaltyPoint}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>PostageAmount:</Text>  {props.jsonDetails.PostageAmount}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>PriceAfterDiscount:</Text>  {props.jsonDetails.PriceAfterDiscount}</Text>

              <TouchableOpacity onPress={() => {handleURLPress(props.jsonDetails.ReferenceDownloadURL)}}>
                <Text style={styles.selectableElementText}><Text style={{fontWeight: "bold"}}>ReferenceDownloadURL:</Text>  {props.jsonDetails.ReferenceDownloadURL}</Text>
              </TouchableOpacity>

              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>ReferenceFileName:</Text>  {props.jsonDetails.ReferenceFileName}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>ReferenceOriginalFileName:</Text>  {props.jsonDetails.ReferenceOriginalFileName}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>SentenceStyle:</Text>  {props.jsonDetails.SentenceStyle}</Text>
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>StaffName:</Text>  {props.jsonDetails.StaffName}</Text>          
              <Text style={styles.elementText}><Text style={{fontWeight: "bold"}}>TranslationFieldName:</Text>  {props.jsonDetails.TranslationFieldName}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Translator Details Modal */}
      <TranslatorModal transDetails={transDetails} transReviews={transReviews} transModal={transModal} 
        setTransDetails={setTransDetails} setTransReviews={setTransReviews} setTransModal={setTransModal} 
        convertDate={props.convertDate} getJobDetailsAPI={props.getJobDetailsAPI}  
      />
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

export default JobDetailsModal;