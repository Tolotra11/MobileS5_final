import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem, IonList, IonRefresher, IonRefresherContent, RefresherEventDetail } from "@ionic/react";
import { useEffect, useState } from "react";
import Deconnect from "../components/Deconnect";
import ElementList from "../components/ElementList";
import { ListeImage } from "../model/ListeImage";
export function validate(token:any){
    fetch(`http://localhost:8082/token`,{
        method : 'GET',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'token':`${token}`
          },
       
    })
    .then(response => response.json())
    .then(res =>{
       if(res.success == null){
            window.location.href = "/";
       }
    });
}
const ListeEnchere = () =>{
    const tok = localStorage.getItem("token");
        if(tok == null){
            window.location.href = "/";
        }

   const url = "http://localhost:8082/encheres";
    const [group, setGroup] = useState([]);
    const [loading,setLoading] = useState(false);
    const [donnee,setDonnee] = useState<ListeImage[]>([]);
    var request = new Request(`${url}`,{
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'token': `${tok}`
          })
    })
    const fetchData =  () => {
        validate(tok);
        setLoading(true);
        console.log("fetch");
        caches.match(request)
            .then( response => {
                if(response ){
                    console.log('dispo');
                    return response.json();
                }else{
                    console.log('dispo1');
                    return   fetch(`${url}`,{
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                            'token': `${tok}`
                          }
                    }).then(response => response.json())
                    .then(json => {
                        caches.open('api_cache').then(
                            cache => {
                                cache.put(`${url}`, new Response(JSON.stringify(json),options));
                            }
                        );
                        return json;
                     });
                }
            }
            ).then(
                res =>{
                   
                    setGroup(res.data);
                    setLoading(false);
                    const arr:ListeImage[] = [];
                    if(res.data.length == 0){
                        setDonnee([]);
                    }
                    res.data.map( (d:any) => {
                        const obj = new ListeImage(d.id,d.apercuImage,d.description,d.dateEnchere,d.nom,d.prenom,d.statut,d.titre);
                        arr.push(obj);
                        setDonnee(arr);
                    }   
                    );
                }
            )
    };
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'token': `${tok}`
          }
    }
    useEffect(() =>{
        fetchData();
    },[tok]);
    if (loading) {
        return <p>Loading...</p>;
      };
    const container = donnee.map((data: ListeImage) => {
    return <ElementList donnee={data} link={"fiche/"+data.id}/>
    });
    async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        await deleteCacheData(url);
        setTimeout(async () => {
            await fetchData();
            event.detail.complete();
          }, 2000);
        
      };
      const deleteCacheData = async (url1:any) => {
        caches.open('api_cache').then(cache => {
          cache.delete(url1);
        });
      };
    return (<>
    <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList>
            {container}
        </IonList>
        <Deconnect/>
    </IonContent>
     
    </>)
};
export default ListeEnchere;