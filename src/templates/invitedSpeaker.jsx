import React from "react";
import { graphql } from "gatsby";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Img from "gatsby-image";

import Layout from "@components/Layout";
import Section from "@components/Section";
import Content from "@components/Content";

import SpeakerInfo from "./SpeakerInfo";

export default props => {
  const { invitationsJson, file } = props.data;

  const speaker = {
    ...invitationsJson,
    image: file
  };

  return (
    <Layout>
      <HelmetProvider>
        <Helmet>
          <title>
            revo.js {speaker.firstname} {speaker.lastname}
          </title>
        </Helmet>
      </HelmetProvider>

      <Section light className={`content-speaker`}>
        <Content centered>
          <figure className="speaker-image-wrapper">
            <div className="speaker-image" key={speaker.id}>
              <Img
                fluid={speaker.image.image.fluid}
                alt={`${speaker.firstname} ${speaker.lastname} photo`}
              />
            </div>
          </figure>
          <SpeakerInfo speaker={speaker} />

          <h2>Dear {speaker.firstname},</h2>
          <p>It would be a great honor to have you as a speaker on stage at revo.js 2020.</p>
          <p>The close knit community surrounding revo.js surprised everyone in 2019 with its passion and implication. We want to offer nothing but the best for them on our second edition, and that leads us to you.</p>
          <p>You probably hear this a lot, but we really mean it: Your knowledge, passion and willingness to teach others truly inspire us. </p>
          <p>Looking forward to hearing from you,<br />The revo.js team</p>

          <h2>More about revo.js</h2>
          <ul>
            <li>Two-day, single track, technology focused JavaScript conference</li>
            <li>Happening on <strong>October 8th - 9th</strong>, in Timișoara, Romania</li>
            <li>Community driven, not-for-profit event</li>
            <li>18+ speakers (half invited, half selected through CFP)</li>
            <li>300 attendees</li>
          </ul>
            
          <h2>What we're offering</h2>
          <ul>  
            <li>Full cover of travel expenses</li>
            <li>Full cover of accommodation expenses in a 4* hotel for 4 nights (October 7-11)</li>
            <li>Free access to the conference and all related happenings</li>
            <li>Speakers' meet & greet dinner one day before the event</li>
            <li>Saturday field trip with the core revo.js team, after the event</li>
          </ul>
          

          <h2>revo.js 2019 After Movie</h2>
          <iframe
            title="revo.js 2019 After Movie"
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/KY9ZVsGnTes"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
          ></iframe>
        </Content>
      </Section>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($id: String!, $image: String!) {
    invitationsJson(id: { eq: $id }) {
      id
      firstname
      lastname
      twitter
      title
      company
      image
    }

    file(relativePath: { eq: $image }) {
      base
      image: childImageSharp {
        fluid(maxWidth: 400, maxHeight: 400, grayscale: true) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
