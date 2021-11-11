import Layout from "../components/Layout";
import axios from "axios";
const url = 'https://todoo-feeds.herokuapp.com'
const About = ({siteData}) => {
  return (
    <Layout data={{
      title:'ToDOO | About',
      description:siteData.site_description || '',
      keywords:siteData.site_tags || '',
      author:siteData.site_author || '',
      icon:url + siteData.favicon.url
    }} className="flex flex-col gap-16">
        <span className="opacity-60 mb-8">/about</span>
      <div className="flex flex-col gap-4">
      <p>
        This is a personal project build for showcase the skills of Developer (<a
          href="https://www.theshawa.cf/about"
          rel="noreferrer"
          target="_blank"
          className="text-primary hover:underline"
        >
          Theshawa Dasun
        </a>) 😁.
      </p>
      <p>
        Feel free to give your feedback.
        
      </p>
      </div>
      <p>© All copyrights reserved . (2021 Nov)</p>
    </Layout>
  );
};

export default About;

export async function getServerSideProps(context) {
  
  const siteData = await axios.get(url+'/site')

  if (!siteData) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  
  return {
    props: { siteData:siteData.data}, // will be passed to the page component as props
  }
}