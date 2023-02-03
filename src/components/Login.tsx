import { IonButton, IonCol, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { useHistory,Link } from "react-router-dom";
import Context from "../Context";

const Login = () =>{
    const tok = localStorage.getItem("token");
    const [identifiant, setIdentifiant] = useState("rakoto@gmail.com");
    const [pwd, setPwd] = useState("1234");
    const [error,setError] = useState("");
    var json;
    const {setShowTabs} = useContext(Context);
    const validateToken = () =>{
        fetch(`http://localhost:8082/token`,{
            method : 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'token':`${tok}`
              },
           
        })
        .then(response => response.json())
        .then(res =>{
           if(res.success){
                window.location.href = "/ListeEnchere";
           }
        });
    }
     useEffect(()=>{
        setShowTabs(false);
        validateToken();
        return () => {
            setShowTabs(true);
        }
    },[]);
    const log = async() => {
        setError('');
        await fetch(`http://localhost:8082/login`,{
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ login: `${identifiant}`,password:`${pwd}`})
        })
        .then(response => response.json())
        .then(res =>{
            json = res.data;
            if(json == null){
                let newJson = res.error;
                setError(newJson.message);
            }
            else{
                console.log('marina');
                localStorage.setItem('token', json.token);
                window.location.href = "/ListeEnchere"
            }
        })
    };
    return (
        <>
           <IonHeader>
            <IonToolbar>
                <IonTitle>Login</IonTitle>
            </IonToolbar>
        </IonHeader>
            <IonRow>
            <IonCol>
                <IonItem>
                <IonLabel position="floating"> Email</IonLabel>
                <IonInput
                    type="email"
                    value={identifiant} onIonChange={(e:any) => setIdentifiant(e.target.value!)}
                   
                />
                </IonItem>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
                <IonItem>
                <IonLabel position="floating"> Mot de passe</IonLabel>
                <IonInput
                    type="password"
                    value={pwd} onIonChange={(e:any) => setPwd(e.target.value!)}
                />
                </IonItem>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
                <IonButton expand="block" onClick={() => log()}>
                Login
                </IonButton> 
                <p style={{textAlign:"center",color:"red"}}>{error}</p> 
            </IonCol>
            </IonRow>
        <p style={{textAlign:"center"}}><a href="/inscription">S'inscrire?</a></p>
            
        </>
    );
};
export default Login;