import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Project1 from './Project1';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Project2 from './Project2';
import Project3 from './Project3';
import Project4 from './Project4';
import Project5 from './Project5';
import Excersise2 from '../Excersise2/Excersise2';
import Project6 from './Project6';
import Project7 from './Project7';
import Project8 from './Project8';



const Main = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
     { key: 'project1', title: 'project1', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
     { key: 'project2', title: 'project2', focusedIcon: 'album' },
     { key: 'project3', title: 'project3', focusedIcon: 'history' },
     { key: 'project4', title: 'project4', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
     {key : 'project5', title : 'project5', focusedIcon: 'account-music'},
     {key : 'project6', title: 'peoject6', focusedIcon : 'access-point'},
     {key : 'project7', title: 'peoject7', focusedIcon : 'airplane'},
     {key : 'project8', title: 'peoject8', focusedIcon : 'alarm-light'},
     //{key : 'Excersise2', title :'Excersise2', focusedIcon: 'account-music'},

  ]);

  const renderScene = BottomNavigation.SceneMap({
    project1: Project1,
    project2: Project2,
    project3: Project3,
    project4: Project4,
    project5: Project5,
    project6: Project6,
    project7: Project7,
    project8: Project8,
    //Excersise2 :Excersise2,
  });

  return (
    <SafeAreaProvider>
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
    </SafeAreaProvider>
  );
};

export default Main;