import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import Deconnect from "../components/Deconnect";
import { validate } from "./ListeEnchere";
const Rechargement = () =>{
        var tok = localStorage.getItem("token");
    if(tok == null){
        window.location.href = "/";
    }
    let json;
    useEffect(()=>{
        validate(tok);
    },[]);
    const [credit,setCredit] = useState<any>()
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const confirm = async() => {
        setError("");
        setSuccess("");
        await fetch(`http://localhost:8082/rechargements`,{
            method : 'PUT',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'token':`${tok}`,
                'credit':`${credit}`
              },
            body: JSON.stringify('')
        })
        .then(response => response.json())
        .then(res =>{
            json = res.success;
            if(json == null){
                let newJson = res.error;
                setError(newJson.message);
            }
            else{
                console.log('marina');
                setSuccess("Demande de rechargement effectué avec succès");
            }
        })
    }
    return (
        <>
        <IonContent fullscreen>
        <IonList>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Recharger votre compte</IonTitle>
            </IonToolbar>
        </IonHeader>
            <IonRow>
            <IonCol>
                <IonItem>
                    <IonLabel position="floating"> Montant</IonLabel>
                    <IonInput
                        type="number"
                        onIonChange={(e:any)=>setCredit(e.target.value!)}
                    />
                </IonItem>
            </IonCol>
            </IonRow>
            <IonCol>
                <IonButton expand="block" onClick={() => confirm()}>
                    Confirmer
                </IonButton> 
                <p style={{textAlign:'center',color:'red'}}>{error}</p>
                <p style={{textAlign:'center',color:'green'}}>{success}</p>
            </IonCol>
            </IonList> 
            <Deconnect/>
        </IonContent>
        </>
    );
}
export default Rechargement;