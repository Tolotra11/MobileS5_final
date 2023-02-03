export class ListeImage{
    public id: any;
    public photo: string = "";
    public titre: string ="";
    public description : string = "";
    public date :string = "";
    public nom: string = "";
    public prenom: string = "";
    public statut: string = "";
    constructor(id:any,photo:string,description:string,date:string,nom:string,prenom:string,statut:string,titre:string){
        this.id = id;
        this.photo = photo;
        this.description = description;
        this.date = date;
        this.nom = nom;
        this.prenom = prenom;
        this.statut = statut;
        this.titre = titre;
    }
}