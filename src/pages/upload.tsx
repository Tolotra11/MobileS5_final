import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar, RefresherEventDetail } from "@ionic/react";
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Deconnect from "../components/Deconnect";
import { phonePortraitOutline } from "ionicons/icons";
const Upload = () =>{
    const navigate = useHistory();
        var tok = localStorage.getItem("token");
        if(tok == null){
            window.location.href = "/";
        }
        const uploadPhoto = async() => {
        console.log("ato");
        
        const result = await Camera.getPhoto({
                quality: 50,
                allowEditing :true,
                resultType: CameraResultType.Base64
            })
        setImage([...image,result]);
       
    };
    let json;
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const confirm = async() => {
        setError("");
        setSuccess("");
        await fetch(`http://localhost:8082/encheres`,{
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'description': `${description}`,
                'prixMinimal': `${min}`,
                'categorieId': `${categorie}`,
                'duree': `${duree}`,
                'token': `${tok}`,
                'titre': `${titre}`
              },
            body: JSON.stringify(image)
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
                setSuccess("Ajout effectué avec succès");
                setImage([]);
            }
        })
    }
    const [listCat,setListCat] = useState([]);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<Photo[]>([]);
    const [titre,setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [min, setMin] = useState<any>();
    const [duree , setDuree] = useState<any>();
    const [categorie, setCategorie ] = useState<any>();
    
    useEffect(() => {
        setLoading(true);
         fetch(`http://localhost:8082/categories`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'token': `${tok}`
              }
        }).then(data => data.json())
        .then(res => {
            if(res.data == null){
                window.location.href = "/";
            }
            console.log(res.data);
            setListCat(res.data);
            setLoading(false);
        });
    },[tok]);
    if (loading) {
        return <p>Loading...</p>;
      };
    const ListeCategorie = listCat.map((group:any) =>{
        return  <IonSelectOption value={group.id}>{group.nomCat}</IonSelectOption>
    });
    async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(async () => {
            event.detail.complete();
          }, 2000);
          window.location.reload();
        
      };
    console.log(image);
    return (
        <>
        <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Nouveau Enchere</IonTitle>
            </IonToolbar>
        </IonHeader>
            <IonRow>
            <IonCol>
                <IonItem>
                    <IonLabel position="floating"> Titre</IonLabel>
                    <IonInput
                        type="text"
                        onIonChange={(e:any) => setTitre(e.target.value!)}
                    />
                </IonItem>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
                <IonItem>
                    <IonLabel position="floating"> Description</IonLabel>
                    <IonTextarea  onIonChange={(e:any) => setDescription(e.target.value!)}
                    ></IonTextarea>
                </IonItem>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
                <IonItem>
                    <IonLabel position="floating"> Prix minimal</IonLabel>
                    <IonInput
                        type="number"
                        onIonChange={(e:any) => setMin(e.target.value!)}
                    />
                </IonItem>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
                <IonItem>
                    <IonLabel position="floating"> Duree</IonLabel>
                    <IonInput
                        type="number"
                        onIonChange={(e:any) => setDuree(e.target.value!)}
                    />
                </IonItem>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
            <IonLabel position="floating"> Categorie</IonLabel>
                <IonItem>
                    <IonSelect onIonChange={(e:any) => setCategorie(e.target.value!)}>
                        {ListeCategorie}
                    </IonSelect>
                  
                </IonItem>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonCol>
                <IonItem>
                    <IonLabel> Image</IonLabel>
                        <IonButton onClick={() => uploadPhoto()}>Upload</IonButton>
                </IonItem>
            </IonCol>
            </IonRow>
            <IonRow>
            <IonRow>
                {image.map((photo, index) => (
                    <IonCol size="4" key={index}>
                        <IonImg src={'data:image/'+photo.format+';base64,'+photo.base64String} />
                    </IonCol>
                ))}
                </IonRow>
            <IonCol>
                <IonButton expand="block" onClick={() => confirm()}>
                    Confirmer
                </IonButton> 
                <p style={{textAlign:'center',color:'red'}}>{error}</p>
                <p style={{textAlign:'center',color:'green'}}>{success}</p>
            </IonCol>
            </IonRow>
            </IonList> 
            <Deconnect/>
        </IonContent>
        </>
    );
}
export default Upload;