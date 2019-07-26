import React from "react";
import { StaticQuery, graphql } from "gatsby";
// import { OutboundLink } from "gatsby-plugin-google-analytics";

import Layout from "@components/Layout";
import Header from "@components/layout/Header";
import Content from "@components/Content";
import Section from "@components/Section";
import SpeakersListIndex from "@components/SpeakersListIndex";
import { PurchaseTicket } from "@components/CTA";

import "./speakers.scss";

const Speakers = ({ data }) => {
  const { allSpeakersJson, speakerImages, allTalksJson } = data;

  function getTalk(id) {
    return allTalksJson.edges.find(t => t.node.id === id);
  }

  function getImage(image) {
    return speakerImages.edges.find(e => image.includes(e.node.base));
  }

  const speakers = allSpeakersJson.edges
    .map(e => e.node)
    .map(speaker => {
      const { talk, abstract } = getTalk(speaker.talkId);
      const speakerImage = getImage(speaker.image);

      return {
        ...speaker,
        talk,
        abstract,
        speakerImage
      };
    });

  return (
    <Layout title="revo.js Speakers">
      <Header type="main" image="speakers-image">
        <h1>Speakers</h1>
        <br />
      </Header>

      {/* <Section light>
        <Content centered style={{ textAlign: "center" }}>
          <h1>Meet the speakers</h1>
          <br />
          <br />
          <br />
        </Content>
      </Section> */}

      <SpeakersListIndex speakers={speakers} />

      {/* <ul className="speakers-list">
        {speakers.map((speaker, index) => {
          const speakerImageFluid = speakerImages.edges.find(e =>
            speaker.image.includes(e.node.base)
          );

          const type = (index + offset) % 2 === 0 ? "odd" : "even";

          return (
            <li key={speaker.id}>
              <Link to={`/speakers/${speaker.id}`} className="speakers-link">
                <Speaker
                  data={speaker}
                  image={speakerImageFluid}
                  type={type}
                  first={index === 0}
                />
              </Link>
            </li>
          );
        })}
      </ul> */}

      <Section light>
        <Content centered style={{ textAlign: "center" }}>
          <p>Don't miss your chance to meet these wonderful speakers.</p>
          <br />
          <PurchaseTicket white />
        </Content>
      </Section>
    </Layout>
  );
};

export default props => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allSpeakersJson {
            edges {
              node {
                id
                firstname
                lastname
                image
                title
                company
                talkId
              }
            }
          }
          allTalksJson {
            edges {
              node {
                id
                talk
                abstract
                speakers {
                  id
                  firstname
                  lastname
                  bio
                  image
                  twitter
                  title
                  company
                }
              }
            }
          }
          speakerImages: allFile(
            filter: { relativePath: { glob: "speakers/*" } }
          ) {
            edges {
              node {
                base
                image: childImageSharp {
                  fluid(maxWidth: 400, maxHeight: 400, grayscale: true) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      `}
      render={data => <Speakers data={data} {...props} />}
    />
  );
};
