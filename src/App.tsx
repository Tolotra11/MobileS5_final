import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { airplane, calendar, call, cash, ellipse, list, person, personSharp, settings, square, triangle } from 'ionicons/icons';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './components/Login';
import Inscription from './components/Inscription';

import ListeEnchere from './pages/ListeEnchere';
import { useContext } from 'react';
import Context from './Context';
import { ListeImage } from './model/ListeImage';
import Upload from './pages/upload';
import Rechargement from './pages/Rechargement';
import Fiche from './pages/Fiche';
import Profil from './pages/Profil';
import OneSignal from 'onesignal-cordova-plugin';

// Call this function when your app starts
function OneSignalInit(): void {
  // NOTE: Update the setAppId value below with your OneSignal AppId.
  OneSignal.setAppId("ea582e41-b773-468d-8d24-954425065007");
  OneSignal.setNotificationOpenedHandler(function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  });
}
setupIonicReact();
//OneSignalInit();
const App: React.FC = () => {
  const {showTabs} = useContext(Context);
  let tabBarStyle = showTabs ? undefined : {display: "none"};
  return(
  <IonApp>
    <IonReactRouter>
    <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route exact path="/inscription">
            <Inscription/>
          </Route>
          <Route exact path="/ListeEnchere">
            <ListeEnchere/>
          </Route>
          <Route exact path="/fiche/:id">
            <Fiche/>
          </Route>
          <Route exact path="/nouveauEnchere">
            <Upload/>
          </Route>
          <Route exact path="/rechargement">
            <Rechargement/>
          </Route>
          <Route exact path="/profil">
            <Profil/>
          </Route>
        </IonRouterOutlet>
        
        <IonTabBar slot="bottom" style={tabBarStyle}>
        <IonTabButton tab="listes" href="/ListeEnchere">
          <IonIcon icon={list} />
            <IonLabel>Liste des encheres</IonLabel>
          </IonTabButton>
          <IonTabButton tab="enchere" href="/nouveauEnchere">
          <IonIcon icon={calendar} />
            <IonLabel>nouveau enchere</IonLabel>
          </IonTabButton>
          <IonTabButton tab="rechargement" href="/rechargement">
          <IonIcon icon={cash} />
            <IonLabel>Rechargement</IonLabel>
          </IonTabButton>
      </IonTabBar>
        </IonTabs>
    </IonReactRouter>
     
   
  </IonApp>
  )
  };

export default App;
