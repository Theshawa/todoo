import Head from "next/head";
import Header from "./Header";

const Layout = ({ data = {}, children, className,style,hideHeader }) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather&family=Mohave:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" type="image/x-icon" href={data.icon || ''}/>
        <title>{data.title || "Loading"}</title>
        <meta
          name="description"
          content={data.description || "Sample Description"}
        />
        <meta name="keywords" content={data.keywords || "Sevn Studios"} />
        <meta name="author" content={data.author || "Theshawa Dasun"} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="h-screen flex flex-col" style={style}>
        <Header hide={hideHeader}/>
        <main className={className + " p-8 font-mohave"}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
