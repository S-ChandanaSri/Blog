import React, { useEffect, useState } from 'react';
import styles from '../styles/Blog.module.css';
import Link from 'next/link';
import * as fs from 'fs';
import InfiniteScroll from 'react-infinite-scroll-component';


const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlogs || []);
  const [count, setCount] = useState(1)
 
  const fetchData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs/?count=${count + 2}`)
    setCount(count + 2)
    let data = await d.json()
    setBlogs(data)
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <InfiniteScroll
                dataLength={blogs.length} //This is important field to render the next data
                next={fetchData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                
            >

{blogs.map((blogitem) => {
          return (
            <div key={blogitem.slug} className={styles.blogitem}>
              <Link href={`/blogpost/${blogitem.slug}`}>
                <h3 className="ff font-semibold">{blogitem.title}</h3>
              </Link>
              <p className={styles.blogitem}>
                {blogitem.content.substr(0, 250)}
              </p>
            </div>
          );
        })}
            </InfiniteScroll>

       
      </main>

      <style jsx>{`
        .gg {
          font-size: 1.875rem;
        }
        .ff {
          font-size: 1.25rem;
        }
        .font-bold {
          font-weight: 700;
        }
        .font-semibold {
          font-weight: 600;
        }
        .blogitem {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

/*export async function getServerSideProps(context) {
  try {
    const res = await fetch("http://localhost:3000/api/blogs");
    const allBlogs = await res.json();

    return {
      props: { allBlogs },
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
   
  }
}*/

export async function getStaticProps(context) {
  let data = await fs.promises.readdir("Blogdata");
  let myfile;
  let allBlogs = [];
  for (let index = 0; index < data.length; index++) {
      const item = data[index];
      console.log(item)
      myfile = await fs.promises.readFile(('Blogdata/' + item), 'utf-8')
      allBlogs.push(JSON.parse(myfile))
  }

  return {
      props: { allBlogs }, // will be passed to the page component as props
  }
}

export default Blog;
