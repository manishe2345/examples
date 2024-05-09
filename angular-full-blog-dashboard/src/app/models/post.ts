export interface Post {
    title:string,
    plink:string,
    category:{
        categoryid:string,
        category:string
    },
    excerpt:string,
    content:string,
    postimgpath:string, 
    isfeatured:boolean,
    views:number,
    createdat: Date,
    
};