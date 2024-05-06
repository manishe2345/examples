export interface Past {
    title:string,
    excerpt:string,
    postimgpath:string,
    plink:string,
    isfeatured:boolean,
    content:string,
    views:number,
    createdat:{
        seconds:number,
    },
    category:{
        category:string,
        categoryid:string,
    }
}
