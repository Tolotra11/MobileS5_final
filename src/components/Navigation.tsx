import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonFooter, IonToolbar, IonTitle } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { call, ellipse, person, settings, square, triangle } from "ionicons/icons";

const Navigation = () => {
    return (

        <IonTabs>
      {/*-- Tab bar --*/}
      <IonTabBar slot="bottom">
        <IonTabButton tab="account">
          <IonIcon icon={person} />
        </IonTabButton>
        <IonTabButton tab="contact">
          <IonIcon icon={call} />
        </IonTabButton>
        <IonTabButton tab="settings">
          <IonIcon icon={settings} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
    )
};
export default Navigation;  