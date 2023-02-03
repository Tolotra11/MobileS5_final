import { IonFab, IonFabButton, IonFabList, IonIcon, useIonAlert } from "@ionic/react";
import { add, chevronUpCircle, colorPalette, globe, logOut } from "ionicons/icons";
import { disconnect } from "process";

const Deconnect = () =>{
    const disconnect = async () => {
        await caches.open('api_cache').then(cache => {
            // Clear the existing cache
            cache.keys().then(requests => {
              requests.forEach(request => cache.delete(request));
            });
          });
        localStorage.removeItem("token");
        window.location.href ="/";

    };
    const [presentAlert] = useIonAlert();

    
    return <IonFab slot="fixed" vertical="bottom" horizontal="end">
    <IonFabButton>
      <IonIcon icon={add}></IonIcon>
    </IonFabButton>
    <IonFabList side="top">
      <IonFabButton onClick={() =>
          presentAlert({
            header: 'Etes vous sûr de vouloir vous deconnecter?',
            buttons: [
              {
                text: 'Annuler',
                role: 'cancel',
                
              },
              {
                text: 'Confirmer',
                role: 'confirm',
                handler: () => {
                 disconnect();
                },
              },
            ],
           
          })
        }>
        <IonIcon icon={logOut} ></IonIcon>
      </IonFabButton>
    </IonFabList>
  </IonFab>
};
export default Deconnect;