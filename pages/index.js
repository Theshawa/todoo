import Layout from "../components/Layout";
import Link from "next/link";
import axios from "axios";

const url = 'https://todoo-feeds.herokuapp.com'
const Home = ({siteData,homePageData}) => {
  
  return (
    <Layout
      data={{
        title:'ToDOO | Home',
        description:siteData.site_description || '',
        keywords:siteData.site_tags || '',
        author:siteData.site_author || '',
        icon:url + siteData.favicon.url
      }}
      hideHeader
      className="p-0 h-screen flex flex-col "
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url("${homePageData ? url + homePageData.hero_image.url : 'https://images.unsplash.com/photo-1566388989655-c9b7eb3f5096?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'}")`,
      }}
    >

      <div className="w-full h-full p-8 flex flex-col gap-8 items-center justify-center text-center leading-relaxed text-white">
        <span className="text-5xl max-w-3xl ">
          {homePageData.hero_heading}
        </span>
        <div className="flex gap-8">
          <Link href="/todo">
            <button>Add Todos</button>
          </Link>
          <Link href="/check-weather">
            <button>Check Weather</button>
          </Link>
        </div>
      </div>
      <p className="w-full h-full px-8 text-center leading-relaxed text-white">
        By <a
          href="https://www.theshawa.cf/about"
          rel="noreferrer"
          target="_blank"
          className="hover:underline"
        >
          Theshawa Dasun
        </a> 😁
      </p>
    </Layout>
  );
};

export default Home;

export async function getStaticProps(context) {
  
  const siteData = await axios.get(url+'/site')
  const homePageData = await axios.get(url+'/home-page')

  if (!siteData || !homePageData) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  
  return {
    props: { siteData:siteData.data,homePageData:homePageData.data }, // will be passed to the page component as props
  }
}