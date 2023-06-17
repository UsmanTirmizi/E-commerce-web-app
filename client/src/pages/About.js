import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Its my first website. it toook me days to make this website.
            its for my webb app course. i am going to submit it as a project
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;