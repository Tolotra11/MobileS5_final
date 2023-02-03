import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import { Link, NavLink } from "react-router-dom";
import { ListeImage } from "../model/ListeImage";

interface Data{
    donnee : ListeImage;
    link : string;
}
const ElementList: React.FC<Data>  = ({donnee,link}) => {
    let statut;
    let colour;
        if(donnee.statut == "1"){
            statut = "Terminée";
            colour ="red";
        }
        else{
            statut = "En cours...";
            colour="green";
        }
       
    return(
        <>
            <IonCard>
            <img alt="Silhouette of mountains" src={'data:image/jpeg;base64,'+donnee.photo} />
            <IonCardHeader>
              <IonCardTitle>{donnee.nom} {donnee.prenom}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <b>{donnee.titre}</b>
                <p style={{color:colour}}>{statut}</p>
                <p>{donnee.date.split("T")[0]} {donnee.date.split("T")[1]}</p>
                <p>{donnee.description}</p>
                <Link  to={link}><IonButton>Plus de detail</IonButton></Link>
            </IonCardContent>
            </IonCard>
        </>
    );
};
export default ElementList;
