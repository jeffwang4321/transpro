import React, {useState, useEffect} from 'react';
import { StyleSheet, View, } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HomePage from './components/HomePage';
import FlashMessage from "./components/FlashMessage";

export default function App() {
  const [json, setJson] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  
  const getAPI = (tempItems, manualRefresh) => {  
    setIsLoading(true);
    let items = tempItems
    if(isNaN(items) || items < 3){
      items = 3;  
    }

    fetch("https://bcause-api.com/order/getWebOrders", {
      "headers": {
        "content-type": "application/json;charset=UTF-8",
      },
      "body": "{\"ApplicationId\":4,\"CurrentUserID\":null,\"clientId\":null,\"TranslatorId\":null,\"pageNumber\":1,\"orderMinStatus\":3,\"trgLangId\":\"1484e197-70f8-4f64-98cf-e0f06eff6f49\",\"cultureId\":\"jp\",\"pageSize\":" + items +"}",
      "method": "POST",
    })
    .then((response) => response.json())
    .then((json) => {
      if(manualRefresh){
        setIsLoading(false);
      }
      setJson(json);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  // Load 3 job on app start up
  useEffect(() =>{
    getAPI(3, false);
  }, []);

  // Run query for new jobs every minute 1m * 60s * 1000ms
  useEffect(() =>{
    if(isLoading == true){
      setIsLoading(false);
      setTimeout(() => getAPI(3, false),  1 * 60 * 1000);
    }
  }, [json]);

  // Flash message for 2 seconds, then set to blank
  useEffect(() =>{
    setTimeout(() => setFlashMessage(""),  2 * 1000);
  }, [flashMessage]);


  return (
    <View style={styles.container}>
      <StatusBar hidden = {false} translucent = {false} backgroundColor="powderblue"/>

      <HomePage json={json} setJson={setJson} isLoading={isLoading} setIsLoading={setIsLoading} getAPI={getAPI} 
        setFlashMessage={setFlashMessage}
      />

      {
        flashMessage != "" ? <FlashMessage flashMessage={flashMessage} setFlashMessage={setFlashMessage}/> : null 
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
