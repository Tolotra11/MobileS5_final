import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonImg, IonItem, IonList, IonRefresher, IonRefresherContent, RefresherEventDetail } from "@ionic/react";
import { image } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Deconnect from "../components/Deconnect";
import { validate } from "./ListeEnchere";




const Fiche = () =>{
    var tok = localStorage.getItem("token");
    if(tok == null){
        window.location.href = "/";
    }
    const    id   = useParams<{id: string}>();
   const url = "http://localhost:8082/fiches/"+id.id;
    const [group, setGroup] = useState<any[]>([]);
    const [loading,setLoading] = useState(false);
    const [donnee,setDonnee] = useState([]);
    const fetchData =   () => {
        validate(tok);
        setLoading(true);
           fetch(`${url}`,{
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                            
                          }
                    }).then(response => response.json())
                    .then(json => {
                       setGroup(JSON.parse(json.data));
                       setDonnee(json.photo);
                       setLoading(false);
                    }
                ).catch(err => {
                    window.location.href = "/";
                })
    };
    useEffect(() =>{
         fetchData();
    },[]);
    if (loading) {
        return <p>Loading...</p>;
      };
   console.log(group);
   console.log(donnee);
   const photos = donnee.map((image:any, index) => {
    return  <IonCol size="7" key={index}>
                <IonImg src={'data:image/jpeg;base64,'+image.photo} />
    </IonCol>
    });
   const data  = group.map( (data:any) => {
        return  <IonCard>
        <IonCardHeader>
          <IonCardTitle style={{textAlign: 'center'}}><b>{data.titre}</b></IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
            <b style={{textAlign: 'center'}}>{data.dateenchere}</b>
            <br/>
            <b>Durée: {data.duree} heures</b>
            <br/>
            <b>Prix de départ: {data.prixdepart} Ariary</b>
            <p style={{marginTop:'35px'}}>
                {data.description}
            </p>
        </IonCardContent>
        </IonCard>
   });
   
    return (<>
    <IonContent fullscreen> 
        {data}
        <h4 style={{textAlign:'center'}}>Images</h4>
        {photos}
        <Deconnect/>
    </IonContent>
     
    </>)
};
export default Fiche;