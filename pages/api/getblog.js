import * as fs from 'fs';


export async function getStaticProps(context) {
  const { slug } = context.params;
  let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, 'utf-8')
  return {
      props: { myBlog: JSON.parse(myBlog) }, // will be passed to the page component as props
  }
}

/*export default function handler(req, res) {
  fs.readFile(`Blogdata/${req.query.slug}.json`,'utf-8',(err,data)=>{
    if(err){
      res.status(500).json({error:"Internal Server Error"})
    }
    console.log(req.query.slug);
    res.status(200).json(JSON.parse(data));
  })
 
}
*/