export class Car {
    
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    id: string;

    // TODO: Populate products from an API
    constructor( 
        name: string, 
        description = '', 
        price = 0, 
        imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDeQ0UC4TH-VQn1gDp7HjwAPQvHiQvYHezg&usqp=CAU',
        id =''
        ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.id = id;
        }
}