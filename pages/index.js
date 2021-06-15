import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Login from '../components/Login/Index';
import Sidebar from '../components/Home/Sidebar';
import Feed from '../components/Home/Feed/Index';
import Contacts from '../components/Home/Contacts/Index';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { apiGetAllPosts } from '../api';
import axios from 'axios';
export default function Home({ posts }) {
  useEffect(() => {
    console.log(posts);
  }, []);
  const [hasMore, setHasMore] = useState(true);
  const [currentPosts, setCurrentPosts] = useState(posts);
  const [currentPage, setCurrentPage] = useState(2);

  useEffect(() => {
    setCurrentPosts(posts);
  }, [posts]);
  const getMorePosts = async () => {
    try {
      console.log('get');
      const posts = await apiGetAllPosts(currentPage);
      setCurrentPosts((prev) => [...prev, ...posts.data]);
      console.log('new', posts.data);
      if (posts.data.length === 0) setHasMore(false);
      setCurrentPage((currentPage) => currentPage + 1);

      console.log(currentPosts);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Facebook</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full relative flex justify-between p-3">
        <div className="w-1/2 hidden lg:block">
          <Sidebar />
        </div>
        <div className="w-full">
          {currentPosts && (
            <InfiniteScroll
              dataLength={currentPosts.length} //This is important field to render the next data, only when the length is changed then will trigger next function
              next={getMorePosts}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              // below props only if you need pull down functionality
              // refreshFunction={this.refresh}
              // pullDownToRefresh
              // pullDownToRefreshThreshold={50}
              // pullDownToRefreshContent={
              //   <h3 style={{ textAlign: 'center' }}>
              //     &#8595; Pull down to refresh
              //   </h3>
              // }
              // releaseToRefreshContent={
              //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
              // }
            >
              <Feed posts={currentPosts} />
            </InfiniteScroll>
          )}
        </div>
        <div className="w-1/2 hidden md:block ">
          <Contacts />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    // get server side cookies
    const token = req.cookies.token;
    let posts = await axios.get('http://localhost:3000/api/posts?page=1', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!posts.data) {
      return {
        notFound: true
      };
    }
    return {
      props: {
        posts: posts.data
      }
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        ok: false,
        reason:
          'some error description for your own consumption, not for client side'
      }
    };
  }
}
