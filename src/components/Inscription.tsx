import { IonButton, IonCol, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import Context from "../Context";

const Inscription = () => {
    const {setShowTabs} = useContext(Context);
    useEffect(()=>{
        setShowTabs(false);
        return () => {
            setShowTabs(true);
        }
    });
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [pwd , setPwd] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    var json;
    const register = async() => {
        
        setError("");
        if(pwd != confirm){
            setError("Veuillez reconfirmez votre mot de passe");
        }
        else{
                await fetch(`http://localhost:8082/inscription`,{
                method : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login: `${email}`,password:`${pwd}`, nom: `${nom}`, prenom: `${prenom}`})
            })
            .then(response => response.json())
            .then(res =>{
                console.log(JSON.stringify({ login: `${email}`,password:`${pwd}`, nom: `${nom}`, prenom: `${prenom}`}));
                json = res.success;
                if(json == null){
                    let newJson = res.error;
                    setError(newJson.message);
                }
                else{
                    console.log('success');
                   // localStorage.setItem('token', json.token);
                    window.location.href = "/";
                }
        })
        }
    };
    return (
        <>
            <IonHeader>
            <IonToolbar>
                <IonTitle>Inscription</IonTitle>
            </IonToolbar>
        </IonHeader>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel  position="floating">
                            Nom
                        </IonLabel >
                        <IonInput value={nom} type="text" onIonChange={(e:any) => setNom(e.target.value!)}/>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel  position="floating">
                            Prenom
                        </IonLabel>
                        <IonInput value={prenom} type="text" onIonChange={(e:any) => setPrenom(e.target.value!)}/>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel  position="floating">
                            Email
                        </IonLabel>
                        <IonInput 
                        type="email"
                        value={email}
                        onIonChange={(e :any) => setEmail(e.target.value!)}
                        />
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel  position="floating">
                            Mot de passe
                        </IonLabel>
                        <IonInput value={pwd} type="password" onIonChange={(e:any) => setPwd(e.target.value!)}/>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonItem>
                        <IonLabel  position="floating">
                            Confirmer mot de passe
                        </IonLabel>
                        <IonInput value={confirm} type="password" onIonChange={(e:any)  => setConfirm(e.target.value!)}/>
                    </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
                <IonButton expand="block" onClick={() => register()}>
                    S'inscrire
                </IonButton>
                <p style={{textAlign:"center",color:"red"}}>{error}</p> 
            </IonCol>
            </IonRow>

        </>
    )
};
export default Inscription;